import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchVendors } from '../store/reducers/homeReducer';
import Footer from '../components/Footer';
import Header from '../components/Header';
import i1 from '../assets/placeholderimg.jpg';
import { FaEye } from 'react-icons/fa';
import { IoIosArrowForward } from "react-icons/io";

const Vendors = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { vendors } = useSelector((state) => state.home);

    useEffect(() => {
        dispatch(fetchVendors());
    }, [dispatch]);

    const handleVendorClick = (sellerId, shopName) => {
        navigate(`/vendor/${sellerId}/products?shopName=${encodeURIComponent(shopName)}`);
    };

    return (
        <div>
            <Header />
            <section className='bg-[url("https://img.freepik.com/free-vector/people-buying-online_24908-55866.jpg?w=1060&t=st=1722523758~exp=1722524358~hmac=a5e4b542e85ee87040d69aa0e2ec8952279c133b1ee2a8ee1cd038236b500820")] h-56 mt-6 bg-cover bg-no-repeat relative bg-left'>
                <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                            <h2 className='text-3xl font-bold'>Vendors Page</h2>
                            <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                <Link to='/'>Home</Link>
                                <span className='pt-1'><IoIosArrowForward /></span>
                                <span>Vendors</span>
                            </div>
                        </div> 
                    </div> 
                </div> 
            </section>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-gray-800">Our Vendors</h1>
                <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
                    {vendors.map((vendor) => (
                        <div
                            key={vendor._id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden flex flex-row gap-10"
                            onClick={() => handleVendorClick(vendor._id, vendor.shopInfo?.shopName)}
                        >
                            <div className="relative w-48 h-48 overflow-hidden rounded-t-lg">
                                <img
                                    src={vendor.image ? vendor.image : i1}
                                    alt={vendor.shopInfo?.shopName || 'Vendor Image'}
                                    className="w-full h-full object-cover "
                                />
                                <FaEye
                                    className="absolute top-2 right-2 text-white bg-black bg-opacity-75 p-2 rounded-full cursor-pointer hover:bg-opacity-90 transition duration-300"
                                    size={24}
                                />
                            </div>
                            <div className="p-4">
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            {vendor.shopInfo?.shopName || 'Shop Name'}
                                        </h2>
                                        <p className="text-gray-600 text-sm mt-2">
                                            Shop Address: {vendor.shopInfo?.division}
                                            <br />
                                            {vendor.shopInfo?.district}
                                            <br />
                                            {vendor.shopInfo?.sub_district}
                                        </p>
                                </div>

                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Vendors;
