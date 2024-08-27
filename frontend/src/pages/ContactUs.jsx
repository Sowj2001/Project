import React from 'react';
import Footer from './../components/Footer';
import Header from '../components/Header';

const ContactUs = () => {
    return (
        <div>
            <Header />
            
            {/* Hero Section */}
            <div className='p-5'></div>
            <div className="relative overflow-hidden bg-gradient-to-r h-80 from-blue-900 via-blue-700 to-blue-500">
                <img 
                    className="w-10 h-10 object-cover opacity-60" 
                    src="https://cdn-icons-png.flaticon.com/256/3095/3095583.png" 
                    alt="Contact Us" 
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative max-w-6xl mx-auto py-32 px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 animate-slideUp">
                        Get in Touch
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 animate-slideUp delay-200">
                        We’re here to assist you. Reach out with any questions or feedback you might have.
                    </p>
                </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-gray-100 py-20 px-6 lg:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-12 animate-slideUp">Contact Information</h2>
                    <div className="grid grid-cols-3 md:grid-cols-1 gap-8">
                        {/* Address */}
                        <div className="flex flex-col items-center animate-slideUp delay-200">
                            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xs transform transition-transform hover:scale-105 hover:shadow-xl">
                                <div className="flex items-center justify-center mb-4">
                                    <svg className="w-10 h-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Address</h3>
                                <p className="text-lg text-gray-600">
                                    Udupi, Karnataka 574102
                                </p>
                            </div>
                        </div>
                        {/* Phone */}
                        <div className="flex flex-col items-center animate-slideUp delay-300">
                            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xs transform transition-transform hover:scale-105 hover:shadow-xl">
                                <div className="flex items-center justify-center mb-4">
                                    <svg className="w-10 h-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3V3zM1 3v18a2 2 0 002 2h18a2 2 0 002-2V3a2 2 0 00-2-2H3a2 2 0 00-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone Number</h3>
                                <p className="text-lg text-gray-600">
                                +91 897546123
                                </p>
                            </div>
                        </div>
                        {/* Email */}
                        <div className="flex flex-col items-center animate-slideUp delay-400">
                            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xs transform transition-transform hover:scale-105 hover:shadow-xl">
                                <div className="flex items-center justify-center mb-4">
                                    <svg className="w-10 h-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m0 0H5a2 2 0 00-2 2v1a2 2 0 002 2h3m11-2h-3m-5-6h5a2 2 0 002-2v-1a2 2 0 00-2-2h-5m-4 4h5" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Address</h3>
                                <p className="text-lg text-gray-600">
                                    bizcart4all@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="bg-gradient-to-br from-indigo-100 py-16 px-6 lg:px-8">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-8 animate-slideUp">Send Us a Message</h2>
                    <form className="space-y-8">
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-8">
                            {/* Name and Email */}
                            <div className="flex flex-col">
                                <label htmlFor="name" className="text-lg font-semibold text-gray-800 mb-2">Name</label>
                                <input 
                                    id="name" 
                                    type="text" 
                                    className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 hover:border-indigo-500" 
                                    placeholder="Your Name" 
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-lg font-semibold text-gray-800 mb-2">Email</label>
                                <input 
                                    id="email" 
                                    type="email" 
                                    className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 hover:border-indigo-500" 
                                    placeholder="Your Email" 
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="message" className="text-lg font-semibold text-gray-800 mb-2">Message</label>
                            <textarea 
                                id="message" 
                                rows="1" 
                                className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 hover:border-indigo-500" 
                                placeholder="Your Message" 
                                required
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            className="inline-block px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-indigo-700"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            {/* Map Section */}
            <div className="relative bg-gray-200 py-16 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-12 animate-slideUp">Find Us</h2>
                    <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14880.956371672807!2d74.74975124248504!3d13.329196491356038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf43da92e9f009%3A0x715f1c146549ad77!2sUdupi%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1692592796161!5m2!1sen!2sus"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default ContactUs;
