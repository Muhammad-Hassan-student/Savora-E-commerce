import React from 'react'
import { assets } from '../assets/frontend assets/assets'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
            <div>
                <img src={assets.logo} alt="" className='w-32 mb-5' />
                <p className='w-full sm:w-2/3 text-gray-600'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum quod, odit dolorum dolores officia aperiam itaque corrupti eos esse voluptates ipsam corporis rem laboriosam, quas possimus porro tempora aut! Deserunt!</p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col  gap-1 text-gray-600'> 
                    <Link to={'/'}>Home</Link>
                    <Link to={'/about'}>About us</Link>
                    <Link to={'/delivery'}>Delivery</Link>
                    <Link to={'/privacy'}>Privacy Policy</Link>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1'>
                    <li>+92 3112546589</li>
                    <li>contact@forever.com</li>
                  
                </ul>
            </div>

           
        </div>
        <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2024@ forever.com - All Right Reserved</p>
            </div>
    </div>
  )
}

export default Footer