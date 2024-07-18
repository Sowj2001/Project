import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/forgot-password', { email })
        .then(res => {
            if (res.data.Status === "Success") {
                setMessage('Email sent successfully');
                setTimeout(() => {
                    setMessage('');
                    navigate('/login');
                }, 3000); // Redirect after 3 seconds
            } else {
                setMessage('Failed to send email');
            }
        }).catch(err => {
            console.log(err);
            setMessage('An error occurred');
        });
    };

    return (
        <div 
            className="flex justify-center items-center min-h-screen bg-gray-100 bg-cover bg-center" >
            
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md bg-opacity-75 backdrop-blur-sm">
                <h4 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h4>
                {message && (
                    <div className="mb-4 text-center text-green-500">
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
