import React, { useContext } from 'react'
import Banner from '../../components/herosection/HeroSection'
import Filter from '../../components/filter/Filter'
import myContext from '../../context/data/MyContext'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import CategoryCard from '../../components/categoryCard/CategoryCard'
import Carousel from '../../components/carousel/Carousel'

function Home() {

  return (
     <>
      <Banner/>
       <CategoryCard/>
      <Filter/>
      <ProductCard/>
      <Track/>
      <Testimonial/>
     </>
  )
}

export default Home