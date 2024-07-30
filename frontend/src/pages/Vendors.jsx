// src/pages/Vendors.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchVendors } from '../store/reducers/vendorsReducer'; // Ensure the import path is correct
import Footer from '../components/Footer';
import Header from '../components/Header';

const Vendors = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { vendors, loading, error } = useSelector(state => state.vendors);

    useEffect(() => {
        dispatch(fetchVendors());
    }, [dispatch]);

    const handleVendorClick = (sellerId) => {
        navigate(`/seller/${sellerId}/products`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-12 text-center">Vendors</h1>
                {loading && <p className="text-center text-gray-600">Loading vendors...</p>}
                {error && <p className="text-center text-red-600">Error fetching vendors: {error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {vendors.map((vendor) => (
                        <div
                            key={vendor.sellerId}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl cursor-pointer"
                            onClick={() => handleVendorClick(vendor.sellerId)}
                        >
                            <div className="relative h-40 bg-gray-200">
                                {/* Add vendor logo or image if available */}
                            </div>
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{vendor.shopName}</h2>
                                {/* Add more vendor details if needed */}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Vendors;
