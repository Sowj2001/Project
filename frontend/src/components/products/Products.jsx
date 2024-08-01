import React from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css' 
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Products = ({title, products}) => {

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

    const ButtonGroup = ({next, previous}) => {
        return (
            <div className='flex justify-between items-center px-4'>
                <div className='text-lg md:text-xl font-bold text-slate-600'> {title} </div>
                <div className='flex justify-center items-center gap-2 md:gap-3 text-slate-600'>
                    <button onClick={previous} className='w-[25px] md:w-[30px] h-[25px] md:h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200'>
                        <IoIosArrowBack />
                    </button>
                    <button onClick={next} className='w-[25px] md:w-[30px] h-[25px] md:h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200'>
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className='flex flex-col gap-4 md:gap-8'>
            <Carousel
                autoPlay={false}
                infinite={false}
                arrows={false} 
                responsive={responsive}
                transitionDuration={500}
                renderButtonGroupOutside={true}
                customButtonGroup={<ButtonGroup />}
            >
                {
                    products.map((p, i) => (
                        <div key={i} className='flex flex-col justify-start gap-2'>
                            {
                                p.map((pl, j) => (
                                    <Link key={j} className='flex flex-row justify-start items-start' to='#'>
                                        <img className='w-[80px] h-[80px] md:w-[110px] md:h-[110px]' src={pl.images[0]} alt="" />
                                        <div className='px-3 flex flex-col justify-start items-start gap-1 text-slate-600'>
                                            <h2 className='text-sm md:text-base'>{pl.name}</h2>
                                            <span className='text-base md:text-lg font-bold'>₹{pl.price}</span> 
                                        </div>  
                                    </Link>
                                ))
                            }
                        </div>   
                    ))
                }         
            </Carousel>   
        </div>
    );
};

export default Products;
