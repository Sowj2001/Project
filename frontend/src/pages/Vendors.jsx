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
        <div className="container mx-auto px-4 py-8">
            <Header/>
            <h1 className="text-3xl font-bold mb-8">Vendors</h1>
            {loading && <p>Loading vendors...</p>}
            {error && <p>Error fetching vendors: {error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {vendors.map((vendor) => (
                    <div
                        key={vendor.sellerId}
                        className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
                        onClick={() => handleVendorClick(vendor.sellerId)}
                    >
                        <h2 className="text-xl font-semibold mb-2">{vendor.shopName}</h2>
                        {/* Add more vendor details if needed */}
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
};

export default Vendors;
