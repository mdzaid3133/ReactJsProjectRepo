import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/MyContext';
import Modal from '../../components/modal/Modal';
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart } from '../../redux/cartSlice'
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import EmptyCartImage from "../../assets/EmptyCart.png"
function Cart() {

  const context = useContext(myContext)
  const { mode } = context;

  const getCartItem = useSelector((state) => state.cart);
  console.log(getCartItem);
  const dispatch = useDispatch();
  //product Quantity logig here
  const [quantity, setQuantity] = useState(1);
   console.log(typeof(quantity))
  const quantityHandler = (e) => {
    if (e.target.value === "+") {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (e.target.value === "-") {
      setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // Ensure quantity doesn't go below 1
    }
  };

  // calculate subTotal here
  const [subTotalAmount, setSubTotalAmount] = useState(0);

  useEffect(() => {
    let subTotal = 0;
    getCartItem.map((cartItem) => {
      subTotal = subTotal + parseInt(cartItem.price) ;
    })
    setSubTotalAmount(subTotal);
  }, [getCartItem])

  const shipping = parseInt(100);


  const grandTotal = (subTotalAmount > 300 ? subTotalAmount : (subTotalAmount + shipping)) * quantity;
  

  const deleteToCart = (product) => {
    dispatch(deleteFromCart(product))
  }
  useEffect(() => {

    localStorage.setItem("cart", JSON.stringify(getCartItem));
  }, [getCartItem]);





  // product buy function here
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const buyNow = async () => {
    // validation 
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    }
    console.log(addressInfo)

    var options = {
      key: "rzp_test_7MGGr9P8h5JaEH",
      key_secret: "12tN9Jas8A92hS5I4w7H0Usr",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "Indian-Fashion",
      description: "for testing purpose",
      handler: function (response) {

        // console.log(response)
        toast.success('Payment Successful')

        const paymentId = response.razorpay_payment_id
        // store in firebase 
        const orderInfo = {
          getCartItem,
          addressInfo,
          date: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          ),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId
        }

        try {
          const result = addDoc(collection(fireDB, "orders"), orderInfo)
        } catch (error) {
          console.log(error)
        }
      },

      theme: {
        color: "#3399cc"
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay)
  }



  return (

    <div className=" h-screen bg-gray-100 pt-5 " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
      <h1 className="mb-10 text-center text-2xl font-bold">{getCartItem.length > 0 ? ("Cart Items") : ("Cart Empty")}</h1>
      {getCartItem.length > 0 ? (
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">

          <div className="rounded-lg md:w-2/3 overflow-y-scroll  h-[550px] px-3c" >
            {
              getCartItem.map((item, index) => {
                return (<div
                  key={index + 1}
                  className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                  <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                      <h2 className="text-sm  text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</h2>
                      <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{item.price}</p>
                      <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Size  : {item.size ? item.size : item.defaultSize}</p>
                      <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Quantity  : {quantity}</p>
                      <div className='mt-5 flex items-center justify-between'>
                        <span className='md:text-xl text-sm'
                          style={{ color: mode === 'dark' ? 'white' : '' }}> Quantity : </span>

                        <div className='flex items-center'>
                          <button
                            value={"-"}
                            onClick={(e) => quantityHandler(e)}
                            className='py-1  px-3 text-xl  text-gray-900 border rounded-l-md hover:bg-gray-400 transition-all ease-linear 0.2s w-10'
                            style={{ color: mode === 'dark' ? 'white' : '' }}>-</button>
                          <span className='py-1  px-3 text-xl  text-gray-900 border'
                            style={{ color: mode === 'dark' ? 'white' : '' }}>{quantity}</span>
                          <button
                            value={"+"}
                            onClick={(e) => quantityHandler(e)}
                            className='py-1  px-3 text-xl  text-gray-900 border rounded-r-md hover:bg-gray-400 transition-all ease-linear 0.2s w-10'
                            style={{ color: mode === 'dark' ? 'white' : '' }}>+</button>
                        </div>

                      </div>
                    </div>
                    <div
                      onClick={() => deleteToCart(item)}
                      className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </div>
                  </div>
                </div>)
              })
            }

          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{subTotalAmount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{subTotalAmount > 300 ? "FREE" : shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
              <div className>
                <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{getCartItem.length <= 0 ? 0 : grandTotal}</p>
              </div>
            </div>
            <Modal
              name={name}
              setName={setName}
              address={address}
              setAddress={setAddress}
              pincode={pincode}
              setPincode={setPincode}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}
            />

          </div>
        </div>
      ) : (
        <div className='grid place-items-center  overflow-x-hidden'>
          <img
            className=' object-cover '
            src={EmptyCartImage} />
        </div>
      )}

    </div>
  )
}

export default Cart


{/* <button
              onC
              type="button"
              className="w-full  bg-violet-600 py-2 text-center rounded-lg text-white font-bold "
            >
              Buy Now
            </button> */}

// https://easy.razorpay.com/onboarding/l2/identity-proof/digilocker