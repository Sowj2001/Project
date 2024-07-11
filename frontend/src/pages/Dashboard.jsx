import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaList } from 'react-icons/fa';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { FaBorderAll } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import api from '../api/api';
import { useDispatch } from 'react-redux';
import { user_reset } from '../store/reducers/authReducer';
import { reset_count } from '../store/reducers/cardReducer';

const Dashboard = () => {
    const [filterShow, setFilterShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            const { data } = await api.get('/customer/logout');
            localStorage.removeItem('customerToken');
            dispatch(user_reset());
            dispatch(reset_count());
            navigate('/login');
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className='bg-slate-200 mt-5 flex-grow'>
                <div className='w-[90%] mx-auto md:block hidden'>
                    <div>
                        <button onClick={() => setFilterShow(!filterShow)} className='text-center py-3 px-3 bg-green-500 text-white rounded-full shadow-md'>
                            <FaList />
                        </button>
                    </div>
                </div>

                <div className='flex h-full mx-auto'>
                    <div className={`rounded-md z-50 md:absolute top-0 left-0 transition-all duration-300 ease-in-out ${filterShow ? 'md:left-0' : 'md:left-[360px]'} w-[270px] bg-white shadow-lg`}>
                        <ul className='py-4 text-slate-600 px-6 space-y-4'>
                            <li className='flex items-center gap-3 py-2 hover:bg-gray-100 rounded-lg transition duration-200'>
                                <span className='text-xl text-green-500'><IoIosHome /></span>
                                <Link to='/dashboard' className='block text-lg'>Dashboard</Link>
                            </li>
                            <li className='flex items-center gap-3 py-2 hover:bg-gray-100 rounded-lg transition duration-200'>
                                <span className='text-xl text-green-500'><FaBorderAll /></span>
                                <Link to='/dashboard/my-orders' className='block text-lg'>My Orders</Link>
                            </li>
                            <li className='flex items-center gap-3 py-2 hover:bg-gray-100 rounded-lg transition duration-200'>
                                <span className='text-xl text-green-500'><FaHeart /></span>
                                <Link to='/dashboard/my-wishlist' className='block text-lg'>Wishlist</Link>
                            </li>
                            <li className='flex items-center gap-3 py-2 hover:bg-gray-100 rounded-lg transition duration-200'>
                                <span className='text-xl text-green-500'><IoChatbubbleEllipsesSharp /></span>
                                <Link to='/dashboard/chat' className='block text-lg'>Chat</Link>
                            </li>
                            <li onClick={logout} className='flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-100 rounded-lg transition duration-200'>
                                <span className='text-xl text-red-500'><IoMdLogOut /></span>
                                <div className='block text-lg'>Logout</div>
                            </li>
                        </ul>
                    </div>

                    <div className='flex-grow'>
                        <div className='mx-4 md:mx-0'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
