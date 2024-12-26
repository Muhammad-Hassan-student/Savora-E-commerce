import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const RelatedProduct = ({category,subCategory}) => {
    const {products} = useContext(ShopContext);
    const [relatedProduct,setRelatedProduct] = useState([]);

    useEffect(() => {
        if(products.length > 0){
            let productCopy = products.slice();
            productCopy = productCopy.filter((item) => category === item.category);
            productCopy = productCopy.filter((item) => subCategory === item.subCategory);
            setRelatedProduct(productCopy.slice(0,5));
            
        }
        
    } ,[products]);
    // console.log(relatedProduct);

  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2' >
            <Title text1={'RELATED'} text2={'PRODUCT'} />
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6'>
            {relatedProduct.map((item,index) => (
                <ProductItem  key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))}
        </div>
    </div>
  )
}

export default RelatedProduct