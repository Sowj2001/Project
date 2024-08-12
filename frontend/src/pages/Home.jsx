import React, { useEffect } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Categorys from '../components/Categorys';
import FeatureProducts from '../components/products/FeatureProducts';
import Products from '../components/products/Products';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { get_products } from '../store/reducers/homeReducer';
import { Link } from 'react-router-dom';


const Home = () => {
    const dispatch = useDispatch();
    const { products, latest_product, topRated_product, discount_product } = useSelector(state => state.home);

    useEffect(() => { 
        dispatch(get_products());
    }, [dispatch]);

    const backgroundImageStyle = {
        backgroundImage: 'url("https://styledme.com/wp-content/uploads/2021/01/blue-sky-plain-zoom-background-simple-minimalist-virtual-calls-backdrop.jpg")',
    };

    return (
        <div>
            <Header />
            <div className="relative m-4 w-full bg-cover bg-center" style={backgroundImageStyle}>
                <div className="absolute inset-0"></div> {/* Add overlay */}
                <div className="relative z-10">
                    <Banner />
                    <Categorys  />
                    <div className='py-[45px]'>
                        <FeatureProducts products={products.slice(0, 8)} />
                        <div className='text-center mt-4'>
                        <Link to='/shops' className="flex justify-center mt-4">
                             <button className="px-6 py-2 text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1">
                              View More Products
                                </button>
                        </Link>

                        </div>
                    </div>
                    <div className='py-10'>
    <div className='w-[85%] flex flex-wrap mx-auto'>
        <div className='grid w-full grid-cols-3 md-lg:grid-cols-1 md:grid-cols-1 gap-7'>
            <div className='overflow-hidden bg-white p-4 rounded-lg shadow-lg'>
                <h2 className="text-xl font-semibold mb-4 text-center">Latest Product</h2> {/* Title for Latest Product */}
                <Products products={latest_product} />
            </div>
            <div className='overflow-hidden bg-white p-4 rounded-lg shadow-lg'>
                <h2 className="text-xl font-semibold mb-4 text-center">Top Rated Product</h2> {/* Title for Top Rated Product */}
                <Products products={topRated_product} />
            </div>
            <div className='overflow-hidden bg-white p-4 rounded-lg shadow-lg'>
                <h2 className="text-xl font-semibold mb-4 text-center">Discount Product</h2> {/* Title for Discount Product */}
                <Products products={discount_product} />
            </div>
        </div> 
    </div> 
</div>



                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
