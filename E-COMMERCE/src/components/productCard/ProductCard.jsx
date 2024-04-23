import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/MyContext'
import { useDispatch, useSelector } from "react-redux"
import { addToWishlist } from '../../redux/wishListSlice'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

function ProductCard() {
    const navigate = useNavigate();
    const context = useContext(myContext)
    const {
        mode,
        product,
        searchKey,
        filterType,
        filterPrice,
        orderBY,
        isFloat
    } = context
         console.log( orderBY)
    const wishListItem = useSelector((state) => state.wishList)
    const dispatch = useDispatch();

    const sendToWishlist = (e,item) => {
        e.preventDefault();
        e.stopPropagation();
      // Your button click logic goes here
      dispatch(addToWishlist(item));
      toast.success("add to wishlist");
    };
  
      useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishListItem));
    }, [wishListItem])

      

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Our Latest Collection</h1>
                    <div class="h-1 w-20 bg-pink-600 rounded"></div>
                </div>

                {product.length > 0 ? (
                    <div className="flex flex-wrap -m-4">

                        {product.filter((item) => item.title.toLowerCase().includes(searchKey))
                            .filter((item) => item.category.toLowerCase().includes(filterType.toLowerCase()))
                            .filter((item) => item.price.includes(filterPrice))
                            .sort((a,b)=> {
                                if(orderBY === 'ascending'){
                                    return a.reating - b.reating
                                }else{
                                    return b.reating - a.reating
                                }
                            }).map((item, index) => {

                                //const {title,price,description,imageUrl} = item
                                return (
                                    <div
                                        className="p-4 md:w-1/4 w-full drop-shadow-lg relative" key={item.id}>
                                        <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-md transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                            <Link to={`/productinfo/${item.id}`}>
                                                <div 
                                                    className="flex justify-center cursor-pointer relative" >
                                                    <img className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out" src={item.imageUrl} alt="{item.imageUrl}" />
                                                    <button
                                                        onClick={(e) => { sendToWishlist(e,item) }}
                                                        className=" absolute right-5 top-5 rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                                        <svg
                                                            fill="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            className="w-5 h-5"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </Link>
                                            <div className="p-5 border-t-2 ">
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>Indian-Fashion</h2>
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>{item.brand}</h2>
                                                <h1 className="leading title-font text-sm font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>{item.title}</h1>
                                                <div className="w-[59px] rounded-md bg-green-700">
                                                    <div className="text-white flex items-center justify-between px-1  text-xl "
                                                        style={{ color: mode === 'dark' ? 'white' : '' }}>{isFloat(item.reating) ? item.reating : item.reating + ".0"} < svg
                                                            fill="currentColor"
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            className="w-4 h-4 text-white ml-1"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                        </svg ></div>
                                                </div>
                                                <p className="leading-relaxed mt-1" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{item.price}</p>
                                                {/* <div className=" flex justify-center">
                                                    <button onClick={() => sendToCart(item)}
                                                        type="button" className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm  w-full  py-2 ">Add To Cart</button>

                                                </div> */}
                                            </div>

                                        </div>
                                    </div>
                                );
                            })}

                    </div>
                ) : (
                    <div>
                        <h1 className='mt-5 text-2xl text-gray-900 '
                            style={{ color: mode === 'dark' ? 'white' : '', }}>Product's unavailable</h1>
                    </div>
                )}

            </div>
        </section >

    )
}

export default ProductCard

//item.price > 100 && item.price < 299 || item.price > 299 && item.price < 499 || item.price > 499 && item.price < 599 || item.price > 600
//"https://dummyimage.com/720x400"
{/* <div className="p-4 md:w-1/4  drop-shadow-lg " >
                            <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                <div className="flex justify-center cursor-pointer" >
                                    <img className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out" src="https://dummyimage.com/720x400" alt="blog" />
                                </div>
                                <div className="p-5 border-t-2">
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>E-Bharat</h2>
                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>title</h1>
                                    <p className="leading-relaxed mb-3">description</p>
                                    <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>₹price</p>
                                    <div className=" flex justify-center">
                                        <button type="button" className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2">Add To Cart</button>

                                    </div>
                                </div>

                            </div>
                        </div> */}