import React, { useContext, useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/data/MyContext";
import { Link } from "react-router-dom";



function Carousel(props){
    
  
    const context = useContext(myContext)
    const { loading, product, mode ,isFloat} = context;
    const carouselContainer = useRef();

    const navigate = useNavigate();

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) :
            container.scrollLeft + (container.offsetWidth + 20)

        container.scrollTo({
            left: scollAmount,
            behavior: "smooth",
        })
    }

  


    return (

        <div className="relative md:px-24 px-8 mt-20 ">
            <div className="mb-[50px]">
            <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Recommended Product</h1>
                    <div class="h-1 w-20 bg-pink-600 rounded"></div>
                </div>
                <BsFillArrowLeftCircleFill
                    className=" text-3xl text-gray-900 absolute top-[44%] transform translate-y-[-50%] cursor-pointer  z-10 md:left-[30px] left-[5px]"
                    style={{ color: mode === 'dark' ? 'white' : '' }}
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className=" text-3xl text-gray-900 absolute top-[44%] transform translate-y-[-50%] cursor-pointer  z-10 md:right-[30px] right-[5px]"
                    style={{ color: mode === 'dark' ? 'white' : '' }}
                    onClick={() => navigation("right")}
                />
                {!loading ? (<div className="flex gap-3  md:gap-8 overflow-y-hidden -mr-5 -ml-5 px-8  md:overflow-hidden m-0 p-0"
                    ref={carouselContainer}>
                    {product?.filter((item)=> (item.category === props.product.category)).map((item) => {

                        return (
                            <div
                                className="w-[225px] cursor-pointer flex-shrink-0"
                                key={item.id}>
                                <Link to={`/recommendedProductInfo/${item.id}`}>
                                    <div
                                        className="flex justify-center cursor-pointer" >
                                        <img className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out" src={item.imageUrl} alt="{item.imageUrl}" />
                                    </div>
                                </Link>
                                <div className="text-gray-900 mb-3 mt-5">
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>Indian-Fashion</h2>
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>{item.brand}</h2>
                                    <h1 className="leading title-font text-sm font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>{item.title}</h1>
                                    <div className="w-[50px] rounded-md bg-green-700">
                                        <div className="text-white flex items-center justify-between px-1  text-xl "
                                        style={{ color: mode === 'dark' ? 'white' : '' }}>{isFloat(item.reating) ? item.reating : item.reating + ".0"}  < svg
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
                                    <p className="leading-relaxed " style={{ color: mode === 'dark' ? 'white' : '' }}>₹{item.price}</p>

                                </div>
                            </div>
                        )
                    })}
                </div>) : ("")
                }

            </div>
        </div>
    )
}

export default Carousel