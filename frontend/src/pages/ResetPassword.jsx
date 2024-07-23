import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [animationData, setAnimationData] = useState(null);
    const navigate = useNavigate();
    const { id, token } = useParams();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        // Fetch the animation JSON
        fetch('https://assets10.lottiefiles.com/packages/lf20_lxna8w5d.json')
            .then(response => response.json())
            .then(data => setAnimationData(data))
            .catch(error => console.error('Error fetching the animation:', error));
    }, []);

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
        <div className="flex flex-col items-center min-h-screen bg-gray-100 relative">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg mt-12 z-10">
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
            {animationData && (
                <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
                    <Lottie animationData={animationData} loop={true} className="w-48 h-48" />
                </div>
            )}
        </div>
    );
}

export default ResetPassword;
