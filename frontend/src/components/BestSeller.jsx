import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);
  

    useEffect(() => {
        try {
            const bestSellerProduct =   products.filter((item) => (item.bestSeller ))
            // console.log(bestSellerProduct.slice(0,5))
          setBestSeller(bestSellerProduct.slice(0,5));
        } catch (error) {
            console.log(error);
        }
      
         
      
    } ,[products])
    // console.log(bestSeller);

    

    return (
    <div className='my-10 '>
        <div className='text-center text-3xl py-6' >
            <Title text1={"BEST"} text2={"SELLER"} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis null.</p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5  gap-4 gap-y-6 '>
            {bestSeller.map((item,index) => (
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))}
        </div>
    </div>
  )
}

export default BestSeller