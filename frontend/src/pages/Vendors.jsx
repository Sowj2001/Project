import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors } from '../store/reducers/homeReducer';
import Footer from '../components/Footer';
import Header from '../components/Header';
import i1 from '../assets/placeholderimg.jpg';
import { FaEye } from 'react-icons/fa';

const Vendors = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { vendors} = useSelector((state) => state.home);

    useEffect(() => {
        dispatch(fetchVendors());
    }, [dispatch]);

    const handleVendorClick = (sellerId) => {
        navigate(`/vendor/${sellerId}/products`);
    };

    
    

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-gray-800">Our Vendors</h1>
                <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
                    {vendors.map((vendor) => (
                        <div
                            key={vendor._id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden"
                            onClick={() => handleVendorClick(vendor._id)}
                        >
                            <div className="flex items-center p-4">
                                <div className="relative w-32 h-32 overflow-hidden rounded-lg">
                                    <img
                                        src={vendor.image ? vendor.image : i1}
                                        alt={vendor.shopInfo?.shopName || 'Vendor Image'}
                                        className="w-full h-full object-cover"
                                    />
                                    <FaEye
                                        className="absolute top-2 right-2 text-white bg-black bg-opacity-75 p-2 rounded-full cursor-pointer hover:bg-opacity-90 transition duration-300"
                                        size={24}
                                    />
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {vendor.shopInfo?.shopName || 'Shop Name'}
                                    </h2>
                                    <p className="text-gray-600 text-sm">Seller ID: {vendor._id}</p>
                                   
                                </div>
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
