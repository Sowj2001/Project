import React, { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { get_banners } from '../store/reducers/homeReducer';
import { Link } from 'react-router-dom';

const Banner = () => {
    const dispatch = useDispatch();
    const { banners } = useSelector(state => state.home);

    useEffect(() => {
        dispatch(get_banners());
    }, [dispatch]);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        },
    };

    return (
        <div className='w-full'>
            <div className='w-11/12 md:w-full mx-auto'>
                <div className='w-full'>
                    <Carousel
                        autoPlay={true}
                        infinite={true}
                        arrows={true}
                        showDots={true}
                        responsive={responsive}
                        containerClass="carousel-container"
                        itemClass="carousel-item"
                    >
                        {banners.length > 0 && banners.map((banner, index) => (
                            <Link key={index} to={`product/details/${banner.link}`}>
                                <div className="mt-5 h-72 md:h-96 lg:h-150 relative overflow-hidden">
                                    <img
                                        src={banner.banner}
                                        alt=""
                                        className="object-cover h-full w-full transition duration-500 transform hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center">
                                            {banner.title}
                                        </h2>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default Banner;
