// src/pages/VendorProducts.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendorProducts } from '../store/reducers/vendorProductsReducer'; // Update import path as needed
import Footer from '../components/Footer';
import Header from '../components/Header';

const VendorProducts = () => {
    const { sellerId } = useParams();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.vendorProducts);

    useEffect(() => {
        dispatch(fetchVendorProducts(sellerId));
    }, [dispatch, sellerId]);

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error loading products: {error.message}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <Header />
            <h1 className="text-3xl font-bold mb-8">Products from Vendor</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-lg shadow-lg p-6"
                    >
                        <img
                            src={product.images[0] || i1}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600">Price: ${product.price}</p>
                        <p className="text-gray-600">Category: {product.category}</p>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default VendorProducts;
