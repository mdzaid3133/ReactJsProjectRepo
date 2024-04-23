import React, { useContext } from 'react'
import myContext from '../../../../context/data/MyContext';


function AddProduct() {
    const context = useContext(myContext);
    const { products, setProducts, addproduct,selctedSize,
        handleSizeChange } = context
    return (
        <div>
            <div className=' flex justify-center items-center  p-4'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Add Product</h1>
                    </div>
                    <div>
                        <input type="text"
                            onChange={(e) => setProducts({ ...products, brand: e.target.value })}
                            name='brand'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product brand'
                        />
                    </div>
                    <div>
                        <input type="text"
                            onChange={(e) => setProducts({ ...products, title: e.target.value })}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product title'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='price'
                            onChange={(e) => setProducts({ ...products, price: e.target.value })}
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
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='review'
                            onChange={(e) => setProducts({ ...products, review: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product review'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='defaultSize'
                            onChange={(e) => setProducts({ ...products, defaultSize: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product default size'
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
                            name='imageurl'
                            onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product imageUrl'
                        />
                    </div>

                    <div>
                        <input type="text"
                            name='category'
                            onChange={(e) => setProducts({ ...products, category: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product category'
                        />
                    </div>
                    <div>
                        <textarea cols="30" rows="10"
                            name='description' onChange={(e) => setProducts({ ...products, description: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product description'>

                        </textarea>
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                            onClick={addproduct}
                            className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Add Product
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddProduct