import React from 'react';
import { Link } from 'react-router-dom';
import { FaInfoCircle, FaShieldAlt, FaPhone } from "react-icons/fa";

const Footer = () => {

    return (
        <footer className='bg-slate-200 py-12'> {/* Changed bg-gray-100 to bg-green-500 */}
            <div className='container mx-auto'>
                <div className='flex flex-row justify-around'>

                    {/* Logo and Contact Section */}
                    <div className='flex flex-col items-center lg:items-start mb-8 lg:mb-0'>
                        <img className='w-48 h-16 mb-4' src="http://localhost:3000/images/logo.png" alt="logo" />
                        <ul className='text-sm text-gray-600'>
                            <li>Address: Udupi, Karnataka 574116</li>
                            <li>Phone: 7019115360</li>
                            <li>Email: bizcart4all@gmail.com</li>
                        </ul>
                    </div>

                    {/* Useful Links Section */}
                    <div className='flex flex-col items-center lg:items-start'>
                        <h2 className='font-bold text-lg mb-4'>Useful Links</h2>
                        <ul className='text-sm text-gray-600'>
                            <li><Link to='/about' className='flex items-center hover:text-gray-800'><FaInfoCircle className='mr-2' /> About Us</Link></li>
                            <li><Link to='/contact' className='flex items-center hover:text-gray-800'><FaPhone className='mr-2' /> Contact Us</Link></li>
                            <li><Link to='/privacy-policy' className='flex items-center hover:text-gray-800'><FaShieldAlt className='mr-2' /> Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Join Our Shop Section */}
                    <div className='flex flex-col items-center lg:items-start'>
                        <h2 className='font-bold text-lg mb-4'>Join Our Shop</h2>
                        <p className='text-sm text-gray-600'>Subscribe for updates and special offers</p>
                        <div className='flex gap-2 mt-2'>
                            <input className='h-10 px-3 outline-none rounded-l-md bg-white' type="text" placeholder='Enter Your Email' />
                            <button className='h-10 bg-green-500 text-white px-4 font-bold uppercase rounded-r-md hover:bg-green-600 transition duration-300'>Subscribe</button>
                        </div>
                        <div className='flex gap-3 mt-4'>
                            {/* Add your social media icons here */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Icons Section */}
            <div className='fixed bottom-3 right-2 hidden lg:flex gap-3'>


            </div>

            {/* Copyright Section */}
            <div className='text-center mt-8 text-sm text-gray-600'>
                <p>© 2024 All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
