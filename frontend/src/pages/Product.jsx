import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {
  const { productId } = useParams();
  const { products,currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
 
 
  const fetchProductData = () => {
 try {
  products.map((item) => {
    if( item._id == productId) {
      setProductData(item);
      console.log(item.image)
      setImage(item.image[0]);
      
      return null;
    }
  })

 } catch (error) {
   
   console.log(error) }}
   
  
  useEffect(() => {
    fetchProductData();
    // console.log(productData); 
   
  }, [productId,products])
 

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*Product image*/}
        <div className='flex-1 flex flex-col-reverse sm:flex-row gap-2'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
            {productData.image.map((item, index) => (
              <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>

        {/*Product Info*/}
        <div className='flex-1'>
          <h1 className='font-medium  text-2xl mt-2'>{productData.name}</h1>
          <div className='flex item-center gap-2 mt-2'>
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_dull_icon} className='w-3.5' alt="" />
            <p className='pl-1'>(122)</p>
          </div>
          <p className='mt-5 text-2xl font-medium'>{currency}{productData.price}</p>
          {/* <p className='mt-5 text-gray-500 text-sm md:w-4/5'>{productData.description}</p> */}
          <div className='flex flex-col gap-4 my-6'>
            <p>Select size</p>
            <div className='flex gap-2'>
            {productData.sizes.map((item, index) => (
        <button
        key={index}
        onClick={() => setSize(item)}
          className={`border px-4 py-2 bg-gray-100 ${   
            item === size ? 'border-orange-500' : ''
          }`}
        >
          {item}
        </button> 
      ))}
            </div>
          </div>

          <button onClick={() => addToCart(productData._id,size)}className='bg-black text-white px-8 py-3 active:bg-gray-700 text-sm'  >ADD TO CART</button>
          <pre>{productData.shortDescription}</pre>
          <hr className='mt-8sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1' >
            <p>100% Orohonal porduct.</p>
            <p>Cash on deliver is available on this product.</p>
            <p>Easy return and exchange policy in 7 days.</p>
          </div>

        </div>
      </div>
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3'>Description</b>
          <p className='border px-5 py-3'>Reviews
            (122)
          </p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
         {productData ?( <p>{productData.description}</p>) : (<>
          <p>Elevate Your Wardrobe with Timeless Style

            Discover a collection that blends comfort, quality, and trendsetting design. Our versatile clothing pieces are crafted to fit seamlessly into every part of your life, whether you’re dressing up for a special occasion or keeping it casual on a weekend outing.

            Made from premium materials, each item is designed with attention to detail, ensuring durability and a perfect fit. From effortlessly stylish dresses and sharp suits to cozy knits and everyday essentials, our collection is perfect for those who appreciate fashion that moves with them.

            Features:

            Premium Materials: Soft, breathable fabrics that keep you comfortable all day.
            Versatile Styles: From laid-back casual looks to sleek, professional attire.
            Perfect Fit: Designed to flatter every body type with sizes that offer the ideal fit.
            Timeless Design: Pieces that never go out of style and can be mixed and matched with ease.
            Why Choose Us:

            Trend-forward designs that don't sacrifice comfort.
            Affordable luxury—high-quality fashion without the premium price tag.
            Designed for both workdays and weekends, making it easy to transition from one to the other.</p>
          <p>Where Comfort Meets Contemporary Style

            Step into a world of effortless fashion with our latest collection. Crafted for the modern individual, these wardrobe essentials are made to complement your busy lifestyle while keeping you stylish every step of the way. Whether you’re heading to the office, catching up with friends, or relaxing at home, these pieces are designed to move with you.

            Key Features:

            Soft, Breathable Fabrics: Made from high-quality materials that provide lasting comfort and durability.
            Fashion-Forward Designs: Timeless yet modern styles that are easy to wear and easy to love.
            Everyday Versatility: Perfect for layering, mixing, and matching, making it easy to create looks for any occasion.
            Flattering Fit: Available in a range of sizes, designed to suit all body types with a flattering silhouette.
            Why You’ll Love It:

            Sustainably Made: We care about the planet as much as we care about your wardrobe. Our products are made with eco-friendly materials and responsible production methods.
            Affordable Luxury: Style doesn’t have to break the bank. Get premium quality at prices you’ll love.
            Easy Care: Designed for busy lives, our clothing is easy to care for and will maintain its look and feel after every wash.</p></>) }
        </div>
      </div>
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
      {/*---------------- -------------------- -------------*/}
    </div>
  ) : <div className='opacity-0'>

  </div>
}

export default Product