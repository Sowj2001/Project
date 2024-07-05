import React, { useEffect } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Categorys from '../components/Categorys';
import FeatureProducts from '../components/products/FeatureProducts';
import Products from '../components/products/Products';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { get_products } from '../store/reducers/homeReducer';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';


const Home = () => {
    const dispatch = useDispatch();
    const { products, latest_product, topRated_product, discount_product } = useSelector(state => state.home);

    useEffect(() => {
        dispatch(get_products());
    }, [dispatch]);

    return (
        <div className='w-full'>
            <Header />
            <div className='relative'>
                <Banner className="h-[150px] md:h-[200px] sm:h-[150px] object-cover" />
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                    <h1 className='text-4xl sm:text-3xl text-white font-bold mb-4'>Welcome to BizCart4All</h1>
                    <p className='text-lg text-white'>Discover a world of amazing products</p>
                </div>
            </div>
            <div className='bg-white py-8'>
                <div className='max-w-6xl mx-auto'>
                    <Categorys />
                </div>
            </div>
            <div className='bg-gray-50 py-8'>
                <div className='max-w-6xl mx-auto'>
                    <FeatureProducts products={products} />
                </div>
            </div>
            <div className='bg-white py-12'>
                <div className='max-w-6xl mx-auto'>
                    <div className='grid  md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        <Card>
                            <CardHeader title='Latest Products' />
                            <CardContent>
                                <Products products={latest_product} />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader title='Top Rated Products' />
                            <CardContent>
                                <Products products={topRated_product} />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader title='Discounted Products' />
                            <CardContent >
                                <Products products={discount_product} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;

