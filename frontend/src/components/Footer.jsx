import React from 'react';
import { Link } from 'react-router-dom';
import { FaInfoCircle, FaShieldAlt, FaPhone } from "react-icons/fa";
import { Typography, Button, Input } from '@material-tailwind/react';

const Footer = () => {
    return (
        <footer 
            className='bg-cover bg-center py-12 text-white bg-blue-gray-500' 
           >
            <div className='container mx-auto px-4'>
                {/* Logo and Contact Section */}
                <div className='flex flex-wrap justify-around md:justify-between mb-8'>
                    <div className='flex flex-col items-center md:items-start mb-4 md:mb-0'>
                        <img className='w-48 h-16 mb-4' src="http://localhost:3000/images/logo.png" alt="logo" />
                        <ul className='text-sm text-gray-200'>
                            <li className='mb-1'>Address: Udupi, Karnataka 574116</li>
                            <li className='mb-1'>Phone: 7019115360</li>
                            <li>Email: bizcart4all@gmail.com</li>
                        </ul>
                    </div>

                    {/* Useful Links Section */}
                    <div className='flex flex-col items-center md:items-start mb-4 md:mb-0'>
                        <Typography variant="h6" className='mb-4'>Useful Links</Typography>
                        <ul className='text-sm text-gray-200'>
                            <li className='mb-2'><Link to='/about' className='flex items-center hover:text-gray-100'><FaInfoCircle className='mr-2' /> About Us</Link></li>
                            <li className='mb-2'><Link to='/contact' className='flex items-center hover:text-gray-100'><FaPhone className='mr-2' /> Contact Us</Link></li>
                            <li><Link to='/privacy-policy' className='flex items-center hover:text-gray-100'><FaShieldAlt className='mr-2' /> Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Join Our Shop Section */}
                    <div className='flex flex-col items-center md:items-start mb-4 md:mb-0'>
                        <Typography variant="h6" className='mb-4'>Join Our Shop</Typography>
                        <Typography variant="body2" className='text-gray-200 mb-2'>Subscribe for updates and special offers</Typography>
                        <div className='flex gap-2 mb-4'>
                            <Input variant="outlined" label="Enter Your Email" className="bg-white text-black rounded-l-md" />
                            <Button variant="gradient" color="green" className="rounded-r-md">Subscribe</Button>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className='text-center text-sm text-gray-200'>
                    <Typography variant="body2">© 2024 All Rights Reserved</Typography>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
