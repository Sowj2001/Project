import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaUser } from 'react-icons/fa';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('customer');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email) {
            setMessage('Email is required');
            setLoading(false);
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setMessage('Please enter a valid email address');
            setLoading(false);
            return;
        }

        axios.post('http://localhost:5000/forgot-password', { email, userType })
            .then(res => {
                setLoading(false);
                if (res.data.Status === 'Success') {
                    setMessage('Email sent successfully');
                    setTimeout(() => {
                        setMessage('');
                        navigate('/login');
                    }, 3000);
                } else {
                    setMessage('Failed to send email');
                }
            }).catch(err => {
                setLoading(false);
                if (err.response) {
                    setMessage(`Error: ${err.response.data.message || 'An error occurred'}`);
                } else if (err.request) {
                    setMessage('No response received from server');
                } else {
                    setMessage('Error setting up request');
                }
            });
    };

    return (
        <div className="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-indigo-400 shadow-lg sm:rounded-3xl sm:p-20 text-white">
                    <div className="max-w-md mx-auto">
                        <h4 className="text-3xl font-semibold mb-6 text-center">Forgot Password</h4>
                        {message && (
                            <div className={`mb-4 text-center ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                                {message}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="userType" className="text-white font-medium mb-2 flex items-center">
                                    <FaUser className="mr-2 text-gray-300" />
                                    User Type
                                </label>
                                <select
                                    id="userType"
                                    name="userType"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-indigo-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    value={userType}
                                    onChange={handleUserTypeChange}
                                >
                                    <option value="customer">Customer</option>
                                    <option value="seller">Seller</option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className=" text-white font-medium mb-2 flex items-center">
                                    <FaEnvelope className="mr-2 text-gray-300" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    autoComplete="off"
                                    name="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-indigo-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className={`w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Send'}
                                </button>
                                <button
                                    type="reset"
                                    className="w-full ml-4 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
