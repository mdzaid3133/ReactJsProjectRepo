import React, { useContext, useState } from 'react'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/loader/Loader'
import myContext from '../../context/data/MyContext'

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid
  const context = useContext(myContext)
  const { mode, loading, order } = context;
  

    
  let MyOrder = order?.filter(obj => obj.userid === userid);
  console.log("orderHere",MyOrder);
  
 
  return (

    <>
      {loading && <Loader />}
      {MyOrder.length > 0 ? (
        <div className=" h-full pt-10">
        {MyOrder.map((order) => (
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            {order.getCartItem.map((item) => (
              <div className="rounded-lg md:w-2/3">
                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
                  <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                      <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</p>
                      <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{item.price}</p>
                      <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Size : {item.size}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

      </div>
      ) : (
         <div className='p-8'>
         <h3
         className='text-xl text-center text-gray-900'
         style={{ color: mode === 'dark' ? 'white' : '' }}
         >Oops! It looks like you haven't placed any orders yet. Browse our products and find something you love to start your shopping journey</h3>
     
         </div>
         )}
     
     
    </>



  )
}

export default Order