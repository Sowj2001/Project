import React from 'react';

import Footer from './../components/Footer';
import Header from '../components/Header';

const AboutUs = () => {
    return (
        
    <div>
               <Header/>
        

            {/* Hero Section */}
            <div className="m-4 relative bg-white overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        className="w-full h-full object-cover" 
                        src="https://cdn.pixabay.com/photo/2014/08/15/06/16/imprint-418596_1280.jpg" 
                        alt="BizCart4All" 
                    />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold text-white animate-fadeIn">Welcome to BizCart4All</h1>
                    <p className="mt-4 text-xl text-white animate-fadeIn delay-2s">
                        Your go-to platform for a seamless multi-vendor shopping experience.
                    </p>
                </div>
            </div>

            {/* About Us Section */}
            <div className="max-w-7xl mx-auto py-16 px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">About Us</h2>
                <p className="text-lg text-gray-600 text-center">
                    BizCart4All is a leading multi-vendor e-commerce platform that connects buyers and sellers from all around the world. Our mission is to provide a seamless and efficient shopping experience while supporting vendors to reach a global audience.
                </p>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto py-16 px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform hover:scale-105">
                    <img 
                        className="mx-auto mb-4 w-16 h-16" 
                        src="https://via.placeholder.com/64" 
                        alt="Feature 1" 
                    />
                    <h3 className="text-xl font-bold text-gray-800">Wide Range of Products</h3>
                    <p className="mt-2 text-gray-600">
                        Discover a variety of products from multiple vendors across different categories.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform hover:scale-105">
                    <img 
                        className="mx-auto mb-4 w-16 h-16" 
                        src="https://via.placeholder.com/64" 
                        alt="Feature 2" 
                    />
                    <h3 className="text-xl font-bold text-gray-800">Secure Payments</h3>
                    <p className="mt-2 text-gray-600">
                        We ensure secure and reliable payment options for a safe shopping experience.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform hover:scale-105">
                    <img 
                        className="mx-auto mb-4 w-16 h-16" 
                        src="https://via.placeholder.com/64" 
                        alt="Feature 3" 
                    />
                    <h3 className="text-xl font-bold text-gray-800">24/7 Customer Support</h3>
                    <p className="mt-2 text-gray-600">
                        Our dedicated support team is here to help you anytime, anywhere.
                    </p>
                </div>
            </div>
            <Footer/>
            </div>
    
    );
}

export default AboutUs;
