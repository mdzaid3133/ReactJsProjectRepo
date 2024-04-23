import React, { useContext } from 'react'
import myContext from '../../context/data/MyContext'
import { Link } from 'react-router-dom';
import "./style.css"
function CategoryCard() {
    const context = useContext(myContext);
    const { mode, product, } = context;
    const uniqueCategories = Array.from(new Set(product.map(item => item.category)));
    return (
        <div className='container px-5 mx-auto'>
            <div class="lg:w-1/2 w-full mt-6 lg:mt-10">
                <h1 class="sm:text-3xl text-2xl font-medium title-font pb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Explore Category</h1>
                <div class="h-1 w-20 bg-pink-600 rounded"></div>
            </div>
           { product.length > 0 ? (
            <div className=' overflow-x-auto' >
                <div className="flex  py-8 md:py-10 mx-auto gap-5 overflow-x-auto">
                    {uniqueCategories.map((category, index) => {
                        const categoryProduct = product.filter(item => item.category === category)[0];

                        return (
                            <Link to={`/category/${category}`}>
                                <div
                                    key={index + 1}
                                    className="flex flex-col flex-shrink-0 items-center gap-5 md:p-4 p-2 md:max- default:w-[300px]   drop-shadow-lg relative bg-gray-100 rounded-md text-center hover:shadow-gray-100 hover:shadow-md transition-shadow duration-300 ease-in-out "
                                    style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}
                                >
                                    <img className='  h-52  w-full rounded-md  mb-2' 
                                    style={{ filter: mode === 'dark' ? 'brightness(80%)' : 'brightness(100%)',}} src={categoryProduct.imageUrl} alt={category} />
                                    <div>
                                        <h4 className='md:text-xl text-sm font-semibold text-gray-900'
                                        style={{ color: mode === 'dark' ? 'white' : '', }}>{category}</h4>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
           ) :(
            <div>
                <h1 className='mt-5 text-2xl text-gray-900 '
                 style={{ color: mode === 'dark' ? 'white' : '', }}>category's unavailable</h1>
            </div>
           )}
        </div>



    )
}

export default CategoryCard


