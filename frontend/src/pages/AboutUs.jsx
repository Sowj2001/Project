import React from 'react';
import Footer from './../components/Footer';
import Header from '../components/Header';

const AboutUs = () => {
    return (
        <div>
            <Header />

            {/* Hero Section */}
            <div className='p-5'></div>
            <div className='relative bg-gray-900 overflow-hidden'>
                <div className="absolute inset-0">
                    <img 
                        className="w-full h-full object-cover" 
                        src="https://cdn.pixabay.com/photo/2014/08/15/06/16/imprint-418596_1280.jpg" 
                        alt="BizCart4All" 
                    />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-extrabold text-white leading-tight mb-4 animate-fadeIn">
                        Welcome to BizCart4All
                    </h1>
                    <p className="text-lg text-white mb-6 animate-slideUp">
                        Your go-to platform for a seamless multi-vendor shopping experience.
                    </p>
                    <a 
                        href="#features" 
                        className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    >
                        Learn More
                    </a>
                </div>
            </div>

            {/* About Us Section */}
            <div className="bg-gray-100 py-16 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-8 animate-slideUp">About Us</h2>
                    <p className="text-lg text-gray-700 leading-relaxed animate-slideUp delay-200">
                        At "BizCart4All", we are passionate about connecting buyers and sellers . Our multi-vendor e-commerce platform is designed to provide a seamless and enjoyable shopping experience while empowering vendors to reach the audience with ease.
                    </p>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="bg-white py-16 px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-12 animate-slideUp">Our Features</h2>
                <div className="max-w-7xl mx-auto grid grid-cols-3 md:grid-cols-1  gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-xl animate-slideUp">
                        <img 
                            className="mx-auto mb-6 w-20 h-20 object-cover rounded-full bg-gray-100" 
                            src="https://cdn-icons-png.flaticon.com/256/891/891462.png" 
                            alt="Feature 1" 
                        />
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Wide Range of Products</h3>
                        <p className="text-gray-600">
                            Explore a diverse range of products across various categories from trusted vendors.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-xl animate-slideUp delay-200">
                        <img 
                            className="mx-auto mb-6 w-20 h-20 object-cover rounded-full bg-gray-100" 
                            src="https://cdn-icons-png.flaticon.com/256/7210/7210830.png" 
                            alt="Feature 2" 
                        />
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Secure Payments</h3>
                        <p className="text-gray-600">
                            Enjoy a safe shopping experience with our secure and reliable payment options.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-xl animate-slideUp delay-400">
                        <img 
                            className="mx-auto mb-6 w-20 h-20 object-cover rounded-full bg-gray-100" 
                            src="https://cdn-icons-png.flaticon.com/256/3871/3871021.png" 
                            alt="Feature 3" 
                        />
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">24/7 Customer Support</h3>
                        <p className="text-gray-600">
                            Our dedicated support team is available around the clock to assist you with any inquiries or issues.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default AboutUs;
