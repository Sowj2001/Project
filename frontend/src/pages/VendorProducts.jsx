// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchVendorProducts } from '../store/reducers/homeReducer';
// import Footer from '../components/Footer';
// import Header from '../components/Header';
// import i1 from '../assets/placeholderimg.jpg';

// const VendorProducts = () => {
//     const { sellerId } = useParams(); // Extract sellerId from URL
//     const dispatch = useDispatch();
//     const { vendorproducts, loading, error } = useSelector((state) => state.home);

//     useEffect(() => {
//         dispatch(fetchVendorProducts(sellerId));
//     }, [dispatch, sellerId]);

//     if (loading) return <div>Loading products...</div>;
//     if (error) return <div>Error loading products: {error.message}</div>;

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <Header />
//             <h1 className="text-3xl font-bold mb-8">Products for Vendor {sellerId}</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                 {vendorproducts.length > 0 ? (
//                     vendorproducts.map((product) => (
//                         <div key={product._id} className="bg-white rounded-lg shadow-lg p-6">
//                             <img
//                                 src={product.image || i1}
//                                 alt={product.name}
//                                 className="w-full h-40 object-cover rounded-lg mb-4"
//                             />
//                             <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
//                             <p className="text-gray-600">Price: ${product.price}</p>
//                             {/* Add more product details if needed */}
//                         </div>
//                     ))
//                 ) : (
//                     <p>No products available for this vendor.</p>
//                 )}
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default VendorProducts;




import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchVendorProducts } from '../store/reducers/homeReducer';
import Footer from '../components/Footer';
import Header from '../components/Header';
import i1 from '../assets/placeholderimg.jpg';

const VendorProducts = () => {
    const { sellerId } = useParams();
    const dispatch = useDispatch();
    const { vendorproducts, error } = useSelector((state) => state.home);

    useEffect(() => {
        dispatch(fetchVendorProducts(sellerId))
            .unwrap()
            .catch(error => console.error('Fetch Vendor Products Error:', error));
    }, [dispatch, sellerId]);

    // if (loading) return <div>Loading products...</div>;
    // if (error) return <div>Error loading products: {error.message}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <Header />
            <h1 className="text-3xl font-bold mb-8">Products for Vendor {sellerId}</h1>
            <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                {vendorproducts.length > 0 ? (
                    vendorproducts.map((product) => (
                        <div key={product._id} className="bg-white flex flex-col rounded-lg shadow-lg p-6">
                            <div className="mb-4 flex flex-wrap gap-3 ">
                                {product.images.length > 0 ? (
                                    product.images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={product.name}
                                            className="w-40 h-40 object-cover rounded-lg mb-4"
                                        />
                                    ))
                                ) : (
                                    <img
                                        src={i1}
                                        alt="Placeholder"
                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                    />
                                )}
                            </div>
                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-600">Price: ₹{product.price}</p> {/* Updated to use ₹ */}
                        </div>
                    ))
                ) : (
                    <p>No products available for this vendor.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default VendorProducts;
