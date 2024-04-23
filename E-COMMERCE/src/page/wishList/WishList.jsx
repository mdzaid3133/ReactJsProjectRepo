import React, { useContext, useEffect, } from 'react';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { deletFromWishlist } from '../../redux/wishListSlice';
import myContext from '../../context/data/MyContext';
import { Link } from 'react-router-dom';

const WishList = () => {
 
     const context = useContext(myContext)
     const {isFloat, mode} = context;
    const wishlistItem = useSelector((state) => state.wishList)
    const dispatch = useDispatch();

    const removeFromWishlist = (productId) => {
        dispatch(deletFromWishlist(productId));
    };

    useEffect(()=>{
     localStorage.setItem("wishlist", JSON.stringify(wishlistItem));
    },[wishlistItem])

    return (
        <div className="container mx-auto mt-8 md:w-2/4 w-full py-6 px-6 " >
            <h1 className="text-xl  mb-6 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>My Wishlist ({wishlistItem.length})</h1>
            <div className="grid  grid-flow-row gap-4 border py-2 px-2" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                {wishlistItem?.map((product) => (
                   <Link to={`/productInfo/${product.id}`}>
                   <div 
                    key={product.id} className=" flex gap-10 p-4  shadow-md border">
                        <div className="w-36 h-36">
                            <img
                                src={product.imageUrl}
                                alt={product.imageUrl}
                                className="object-contain rounded-md w-full h-full"
                            />
                        </div>
                        <div className="mt-4 w-full" >
                            <div className="text-sm text-gray-900 flex justify-between items-center w-full" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                <span>{product.brand}</span>
                                <span onClick={()=>{removeFromWishlist(product.id)}}
                                className=' text-3xl cursor-pointer hover:text-red-800'style={{ color: mode === 'dark' ? 'white' : '' }}><MdDelete/></span>
                            </div>
                            <div className="text-lg font-semibold text-gray-900 hover:text-blue-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{product.title}</div>
                            <div className="flex items-center mt-1">
                                <div className="w-[59px] rounded-md bg-green-700 mr-2">
                                    <div className="text-white flex items-center justify-between px-1  text-xl "
                                        style={{ color: mode === 'dark' ? 'white' : '' }}>{isFloat(product.reating) ? product.reating : product.reating + ".0"} < svg
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
                                <span className="text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>({product.review} reviews)</span>
                            </div>
                            <div className="mt-2 text-gray-900 "style={{ color: mode === 'dark' ? 'white' : '' }}>₹{product.price}</div>
                           
                        </div>
                    </div>
                   </Link>
                ))}
            </div>
        </div>
    );


};

export default WishList;
