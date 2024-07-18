import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { id, token } = useParams();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/reset-password/${id}/${token}`, { password })
        .then(res => {
            if (res.data.Status === "Success") {
                setMessage('Password updated successfully');
                setTimeout(() => {
                    setMessage('');
                    navigate('/login');
                }, 3000); // Redirect after 3 seconds
            } else {
                setMessage('Failed to update password');
                console.log(res.data.Status);
            }
        }).catch(err => {
            console.log(err);
            setMessage('An error occurred');
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h4 className="text-2xl font-semibold mb-4 text-center">Reset Password</h4>
                {message && (
                    <div className="mb-4 text-center text-green-500">
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
