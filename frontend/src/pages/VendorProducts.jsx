import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useLocation } from 'react-router-dom';
import { fetchVendorProducts } from '../store/reducers/homeReducer';
import Footer from '../components/Footer';
import Header from '../components/Header';
import i1 from '../assets/placeholderimg.jpg';

const VendorProducts = () => {
    const { sellerId } = useParams();
    const location = useLocation();
    const shopName = new URLSearchParams(location.search).get('shopName');
    const dispatch = useDispatch();
    const { vendorproducts } = useSelector((state) => state.home);

    useEffect(() => {
        if (sellerId) {
            dispatch(fetchVendorProducts(sellerId))
                .unwrap()
                .catch(error => console.error('Fetch Vendor Products Error:', error));
        }
    }, [dispatch, sellerId]);

    return (
        <div>
            <Header />
            <section className='relative bg-cover bg-no-repeat bg-left h-56 mt-6' style={{ backgroundImage: "url('https://img.freepik.com/free-vector/people-buying-online_24908-55866.jpg?w=1060&t=st=1722523758~exp=1722524358~hmac=a5e4b542e85ee87040d69aa0e2ec8952279c133b1ee2a8ee1cd038236b500820')" }}>
                <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a] flex items-center justify-center'>
                    <div className='text-center text-white'>
                        <Link to='/vendors' className='text-3xl md:text-4xl font-bold'>{shopName || 'Vendor'}</Link>
                    </div>
                </div>
            </section>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">{shopName ? `${shopName}'s Products` : 'Vendor Products'}</h2>
                <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-1 gap-8">
                    {Array.isArray(vendorproducts) && vendorproducts.length > 0 ? (
                        vendorproducts.map((product) => (
                            product ? (
                                <div key={product._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                                    <div className="p-4">
                                        <img
                                            src={product.images?.[0] || i1}
                                            alt={product.name || "Product Image"}
                                            className="w-56 h-56 object-cover rounded-t-lg mb-4"
                                        />
                                        <h3 className="text-lg font-semibold text-gray-800">{product.name || "Product Name"}</h3>
                                        <p className="text-gray-600 mb-4">Price: ₹{product.price}</p>
                                        <Link to={`/product/details/${product.slug}`} className="text-blue-500 hover:underline">View Details</Link>
                                    </div>
                                </div>
                            ) : null
                        ))
                    ) : (
                        <p className="text-gray-600 text-center col-span-full">No products available for this vendor.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default VendorProducts;
