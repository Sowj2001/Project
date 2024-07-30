
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchVendors } from '../store/reducers/homeReducer';
// import Footer from '../components/Footer';
// import Header from '../components/Header';
// import placeholderImage from '../assets/placeholderimg.jpg'; // Import the placeholder image

// const Vendors = () => {
//     const dispatch = useDispatch();
//     const { vendors, loadingVendors, errorVendors } = useSelector((state) => state.home);

//     useEffect(() => {
//         dispatch(fetchVendors());
//     }, [dispatch]);

//     const handleVendorClick = (sellerId) => {
//         // Handle vendor click, e.g., redirect to vendor's page
//         console.log(`Vendor with ID ${sellerId} clicked`);
//     };

//     if (loadingVendors) return <div>Loading vendors...</div>;
//     if (errorVendors) return <div>Error loading vendors: {errorVendors.message}</div>;

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <Header />
//             <h1 className="text-3xl font-bold mb-8">Vendors</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                 {vendors && vendors.length > 0 ? (
//                     vendors.map((vendor) => (
//                         <div
//                             key={vendor._id} // Use `_id` as the key for better uniqueness
//                             className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
//                             onClick={() => handleVendorClick(vendor._id)}
//                         >
//                             <div className="mb-4">
//                                 <img
//                                     src={vendor.image || placeholderImage} // Use `image` field or fallback to placeholder
//                                     alt={vendor.shopInfo && vendor.shopInfo.shopName ? vendor.shopInfo.shopName : 'Vendor Image'}
//                                     className="w-full h-40 object-cover rounded-lg"
//                                 />
//                             </div>
//                             <h2 className="text-xl font-semibold mb-2">
//                                 {vendor.shopInfo && vendor.shopInfo.shopName ? vendor.shopInfo.shopName : 'No Shop Name Available'}
//                             </h2>
//                             {/* Add more vendor details if needed */}
//                             <p className="text-gray-600">Seller ID: {vendor._id}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No vendors available.</p>
//                 )}
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default Vendors;


// src/pages/Vendors.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors } from '../store/reducers/homeReducer';
import Footer from '../components/Footer';
import Header from '../components/Header';
import i1 from '../assets/placeholderimg.jpg';
import { FaEye } from 'react-icons/fa'; // Import eye icon from react-icons

const Vendors = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { vendors, loadingVendors, errorVendors } = useSelector((state) => state.home);

    useEffect(() => {
        dispatch(fetchVendors());
    }, [dispatch]);

    const handleVendorClick = (sellerId) => {
        navigate(`/vendor/${sellerId}/products`); // Navigate to vendor's products page
    };

    if (loadingVendors) return <div>Loading vendors...</div>;
    if (errorVendors) return <div>Error loading vendors: {errorVendors.message}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <Header />
            <h1 className="text-3xl font-bold mb-8">Vendors</h1>
            {loadingVendors && <p>Loading vendors...</p>}
            {errorVendors && <p className="text-red-500">Error fetching vendors: {errorVendors.message}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {vendors.map((vendor) => (
                    <div
                        key={vendor._id}
                        className="bg-white rounded-lg shadow-lg p-6 relative cursor-pointer hover:shadow-xl transition-shadow"
                    >
                        <div className="mb-4 relative">
                            <img
                                src={vendor.image ? vendor.image : i1}
                                alt={vendor.shopInfo?.shopName || 'Vendor Image'}
                                className="w-full h-40 object-cover rounded-lg"
                            />
                            <FaEye
                                onClick={() => handleVendorClick(vendor._id)}
                                className="absolute top-2 right-2 text-white bg-black p-2 rounded-full cursor-pointer hover:bg-gray-700"
                                size={24}
                            />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">
                            {vendor.shopInfo?.shopName || 'No Shop Name Available'}
                        </h2>
                        <p className="text-gray-600">Seller ID: {vendor._id}</p>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Vendors;
