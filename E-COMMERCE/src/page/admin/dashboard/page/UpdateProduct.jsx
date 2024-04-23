import React, { useContext } from 'react'
import myContext from '../../../../context/data/MyContext'

function UpdateProduct() {
    const context = useContext(myContext);
    const {products,updateProduct,setProducts,selctedSize,handleSizeChange} = context
    //console.log("upadate:",products)
    return (
        <div>
            <div className=' flex justify-center items-center p-4'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Update Product</h1>
                    </div>
                    <div>
                        <input type="text"
                             onChange={(e) => setProducts({ ...products, title: e.target.value })} value={products.title}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product title'
                        />
                    </div>
                    <div>
                        <input type="text"
                           onChange={(e) => setProducts({ ...products, price: e.target.value })} value={products.price}
                            name='price'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product price'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='reating'
                            onChange={(e) => setProducts({ ...products, reating: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product reating'
                            value={products.reating}
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='review'
                            onChange={(e) => setProducts({ ...products, review: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product review'
                            value={products.descriptionreview}
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='defaultSize'
                            onChange={(e) => setProducts({ ...products, defaultSize: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product default size'
                            value={products.defaultSize}
                        />
                    </div>
                    {/* size */}
                    <div className='flex items-center justify-around w-full lg:w-[20em] rounded-lg bg-gray-600 mb-4'>
                        <div className=' mb-4 px-2 py-2'>

                            <input type="checkbox"
                                value={"S"}
                                name='small'
                                onChange={(e) => handleSizeChange(e)}
                                checked={selctedSize.includes("S")}
                                className=' '

                            /><br/>
                            <label className='text-white ml-2'>S</label>
                        </div>
                        <div className=' mb-4 px-2 py-2'>

                            <input type="checkbox"
                                value={"M"}
                                name='medium'
                                onChange={(e) => handleSizeChange(e)}
                                checked={selctedSize.includes("M")}

                            /><br/>
                            <label className='text-white ml-2'>M</label>
                        </div>
                        <div className=' mb-4 px-2 py-2   '>

                            <input type="checkbox"
                                value={"L"}
                                name='larg'
                                onChange={(e) => handleSizeChange(e)}
                                checked={selctedSize.includes("L")}

                            /><br/>
                            <label className='text-white ml-2'>L</label>
                        </div>
                        <div className=' mb-4 px-2 py-2'>

                            <input type="checkbox"
                                value={"XL"}
                                name='xl'
                                onChange={(e) => handleSizeChange(e)}
                                checked={selctedSize.includes("XL")}

                            /><br/>
                            <label className='text-white ml-2'>Xl</label>
                        </div>
                        <div className=' mb-4 px-2 py-2'>

                            <input type="checkbox"
                                value={"XXL"}
                                name='xxl'
                                onChange={(e) => handleSizeChange(e)}
                                checked={selctedSize.includes("XXL")}

                            /><br/>
                            <label className='text-white ml-2'>XXl</label>
                        </div>
                        <div className=' mb-4 px-2 py-2'>

                            <input type="checkbox"
                                value={"XXXL"}
                                name='xxxl'
                                onChange={(e) => handleSizeChange(e)}
                                checked={selctedSize.includes("XXXL")}

                            /><br/>
                            <label className='text-white ml-2'>XXXl</label>
                        </div>
                        
                    </div>
                    <div>
                        <input type="text"
                            onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })} value={products.imageUrl}
                            name='imageurl'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product imageUrl'
                        />
                    </div>
                    <div>
                        <input type="text"
                          onChange={(e) => setProducts({ ...products, category: e.target.value })} value={products.category}
                            name='category'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product category'
                        />
                    </div>
                    <div>
                       <textarea cols="30" rows="10" name='title'
                            onChange={(e) => setProducts({ ...products, description: e.target.value })} value={products.description}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product title'>

                       </textarea>
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                            onClick={()=>updateProduct()}
                            className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Update Product
                        </button>
                    </div>
                 
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct