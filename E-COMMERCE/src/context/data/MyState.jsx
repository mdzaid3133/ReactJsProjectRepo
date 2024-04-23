import React, { useEffect, useState } from 'react'
import myContext from "./MyContext";
import { fireDB } from '../../firebase/FirebaseConfig';
import { QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, getDocs, limit, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
//import { useNavigate } from 'react-router-dom';
// import { Portal } from '@headlessui/react';
// import { FaPodcast } from 'react-icons/fa';
// import { BsCheckLg } from 'react-icons/bs';
function MyState(props) {

  //light and dark mode state declaration
  const [mode, setMode] = useState("light")

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark")
      document.body.style.backgroundColor = "rgb(17,24,39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  }
  //end----------------------------------------------

  //loading state declaration

  const [loading, setLoading] = useState(false);
  //end

   //product size state here
   const [selctedSize,setSelectedSize] = useState([]);
   //handle when size change 
   const handleSizeChange = (e)=>{
        const size = e.target.value;
        setSelectedSize((prevSize)=>{
          if(prevSize.includes(size)){
            return prevSize.filter((s)=> s!== size)
          }else{
            return[...prevSize,size]
          }
        })
   }

  //Product state
  const [products, setProducts] = useState({
    brand:null,
    title: null,
    reating:null,
    review:null,
    price: null,
    size:null,
    defaultSize:null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    Date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  });
  useEffect(() => {
    // Update the products state when selectedSizes changes
    setProducts((prevProducts) => ({
      ...prevProducts,
      size: selctedSize,
    }));
  }, [selctedSize]);
 

  //-------------Add Product section----------------//

  //const navigate = useNavigate();
  const addproduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null ||
      products.category == null || products.description == null) {
      return toast.error("Please fill all fields");
    }

    const productRef = collection(fireDB, "products")
    setLoading(true);

    try {
      await addDoc(productRef, products)
      toast.success("Product Add successfully")
      setTimeout(() => {
        window.location.href = "/dashboard"
        //navigate("/dashboard")

      }, 5000)
      getProductData();
      setLoading(false)
      setProducts("");
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const [product, setProduct] = useState([])
  //-------------get Product section----------------//

  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time"),
        //limit(5)
      );

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
          setProduct(productsArray)
          setLoading(false);
        });
        return () => data;
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }



  const editHandler = (item) => {
    
   setProducts(item);

  }

  //-----------------update product lodgic--------------------//
  const updateProduct = async (item) => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", products.id), products)
      toast.success("Product Updated Successfully");
      setProducts("");
      getProductData();
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/dashboard";
       // navigate("/dashboard")
      }, 2000);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  //------------DeleteProduct------------------
  const deleteProduct = async (item) => {
    try {
      setLoading(true)
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success('Product Deleted successfully')
      setLoading(false)
      getProductData()
    } catch (error) {
      toast.success('Product Deleted Falied')
      setLoading(false)
    }
  }
  //filter related code here
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [orderBY, setOrderBY] = useState("");
 


  //filter uniqueCategory here
  const uniqueCategory = [...new Set(product.map((item) => item.category))];

  //----------------Order related code here-------------

  const [order, setOrder] = useState([]);
  const getOrderData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];

      querySnapshot.forEach((doc) => {
        ordersArray.push(doc.data());
      });

      setOrder(ordersArray);
      console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };


  //-----------------getUserData here-------------

  const [users,setUsers]= useState([]);
  const getUserData = async()=>{
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB,"user"))
      const usersArray = [];
       result.forEach((doc)=>{
        usersArray.push(doc.data());
       })
       setUsers(usersArray);
        console.log(usersArray)
       setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function isFloat(number) {
    return number % 1 !== 0;
  }
  //--------initialCalling here ----------------
  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, [])
  return (

    <myContext.Provider value={{
      mode,
      toggleMode,
      loading,
      setLoading,
      products,
      setProducts,
      addproduct,
      product,
      editHandler,
      updateProduct,
      deleteProduct,
      getProductData,
      searchKey,
      setSearchKey,
      filterType,
      setFilterType,
      filterPrice,
      setFilterPrice,
      setOrderBY,
      orderBY,
      uniqueCategory,
      order,
      users,
      selctedSize,
      handleSizeChange,isFloat
    }}>
      {props.children}
    </myContext.Provider>
  )
}

export default MyState