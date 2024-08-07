
// import React, { useEffect } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { Link, useNavigate } from 'react-router-dom';
// import { IoIosArrowForward } from "react-icons/io";
// import { FaEye, FaRegHeart } from "react-icons/fa";
// import { RiShoppingCartLine } from "react-icons/ri";
// import { useDispatch, useSelector } from 'react-redux';
// import { get_card_products, delete_card_product, messageClear, quantity_inc, quantity_dec } from '../store/reducers/cardReducer';
// import Rating from '../components/Rating';
// import toast from 'react-hot-toast';

// const Card = () => {
//     const dispatch = useDispatch();
//     const { userInfo } = useSelector(state => state.auth);
//     const { card_products, successMessage, price, buy_product_item, shipping_fee, outofstock_products } = useSelector(state => state.card);
//     const navigate = useNavigate();

//     useEffect(() => {
//         dispatch(get_card_products(userInfo.id));
//     }, [dispatch, userInfo.id]);

//     const redirect = () => {
//         navigate('/shipping', {
//             state: {
//                 products: card_products,
//                 price: price,
//                 shipping_fee: shipping_fee,
//                 items: buy_product_item
//             }
//         });
//     };

//     useEffect(() => {
//         if (successMessage) {
//             toast.success(successMessage);
//             dispatch(messageClear());
//             dispatch(get_card_products(userInfo.id));
//         }
//     }, [successMessage, dispatch, userInfo.id]);

//     const inc = (quantity, stock, card_id) => {
//         const temp = quantity + 1;
//         if (temp <= stock) {
//             dispatch(quantity_inc(card_id));
//         }
//     };

//     const dec = (quantity, card_id) => {
//         const temp = quantity - 1;
//         if (temp !== 0) {
//             dispatch(quantity_dec(card_id));
//         }
//     };

//     return (
//         <div>
//             <Header />
//             <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
//                 <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
//                     <div className='w-[85%] md:w-[90%] lg:w-[80%] mx-auto h-full'>
//                         <div className='flex flex-col justify-center gap-1 items-center h-full text-white'>
//                             <h2 className='text-3xl font-bold'>Card Page</h2>
//                             <div className='flex justify-center items-center gap-2 text-2xl'>
//                                 <Link to='/'>Home</Link>
//                                 <span className='pt-1'>
//                                     <IoIosArrowForward />
//                                 </span>
//                                 <span>Card</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <section className='bg-[#eeeeee]'>
//                 <div className='w-[90%] mx-auto py-16'>
//                     {card_products.length > 0 || outofstock_products.length > 0 ? (
//                         <div className='flex flex-wrap'>
//                             <div className='w-full lg:w-2/3'>
//                                 <div className='pr-3'>
//                                     <div className='flex flex-col gap-3'>
//                                         <div className='bg-white p-4'>
//                                             <h2 className='text-md text-green-500 font-semibold'>Stock Products ({card_products.length})</h2>
//                                         </div>
//                                         {card_products.map((p, i) => (
//                                             <div key={i} className='bg-white p-4 flex flex-col gap-2'>
//                                                 <div className='flex justify-start items-center'>
//                                                     <h2 className='text-md text-slate-600 font-bold'>{p.shopName}</h2>
//                                                 </div>
//                                                 {p.products.map((pt, i) => (
//                                                     <div key={i} className='w-full flex flex-wrap border group transition-all duration-500 hover:shadow-md hover:-mt-3 bg-white'>
//                                                         <div className='relative overflow-hidden'>
//                                                             {
//                                                                 pt.productInfo.discount !== 0 && 
//                                                                 <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
//                                                                     {pt.productInfo.discount}% 
//                                                                 </div>
//                                                             }
//                                                             <img className='sm:w-full w-full h-[240px]' src={pt.productInfo.images[0]} alt="" />
//                                                             <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
//                                                                 <li onClick={() => dispatch(delete_card_product(pt._id))} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
//                                                                     <FaRegHeart />
//                                                                 </li>
//                                                                 <Link to={`/product/details/${pt.productInfo.slug}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
//                                                                     <FaEye />
//                                                                 </Link>
//                                                                 {/* <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
//                                                                     <RiShoppingCartLine />
//                                                                 </li> */}
//                                                             </ul>
//                                                         </div>
//                                                         <div className='py-3 text-slate-600 px-2'>
//                                                             <h2 className='font-bold'>{pt.productInfo.name} </h2>
//                                                             <div className='flex justify-start items-center gap-3'>
//                                                                 <span className='text-md font-semibold'>₹{pt.productInfo.price - Math.floor((pt.productInfo.price * pt.productInfo.discount) / 100)}</span>
//                                                                 <div className='flex'>
//                                                                     <Rating ratings={pt.productInfo.rating} />
//                                                                 </div>
//                                                             </div>
//                                                             <div className='flex gap-2 flex-col'>
//                                                                 <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
//                                                                     <div onClick={() => dec(pt.quantity, pt._id)} className='px-3 cursor-pointer'>-</div>
//                                                                     <div className='px-3'>{pt.quantity}</div>
//                                                                     <div onClick={() => inc(pt.quantity, pt.productInfo.stock, pt._id)} className='px-3 cursor-pointer'>+</div>
//                                                                 </div>
//                                                                 <button onClick={() => dispatch(delete_card_product(pt._id))} className='px-5 py-[3px] bg-red-500 text-white'>Delete</button>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className='w-full lg:w-1/3'>
//                                 <div className='pl-3 lg:pl-0 mt-5'>
//                                     {card_products.length > 0 && (
//                                         <div className='bg-white p-3 text-slate-600 flex flex-col gap-3'>
//                                             <h2 className='text-xl font-bold'>Order Summary</h2>
//                                             <div className='flex justify-between items-center'>
//                                                 <span>{buy_product_item} Items</span>
//                                                 <span>₹{price}</span>
//                                             </div>
//                                             <div className='flex justify-between items-center'>
//                                                 <span>Shipping Fee</span>
//                                                 <span>₹{shipping_fee}</span>
//                                             </div>
//                                             <div className='flex justify-between items-center'>
//                                                 <span>Total</span>
//                                                 <span className='text-lg text-[#059473]'>₹{price + shipping_fee}</span>
//                                             </div>
//                                             <button onClick={redirect} className='px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-red-500 text-sm text-white uppercase'>
//                                                 Process to Checkout ({buy_product_item})
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className='flex justify-center items-center'>
//                             <Link className='px-4 py-2 bg-indigo-500 text-white rounded' to='/shops'>Shop Now</Link>
//                         </div>
//                     )}
//                 </div>
//             </section>
//             <Footer />
//         </div>
//     );
// };

// export default Card;
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { get_card_products, delete_card_product, messageClear, quantity_inc, quantity_dec } from '../store/reducers/cardReducer';
import Rating from '../components/Rating';
import toast from 'react-hot-toast';

const Card = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const { card_products, successMessage, price, buy_product_item, shipping_fee, outofstock_products } = useSelector(state => state.card);
    const test = useSelector(state => state.card)
    // console.log('test =======>',test)
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo?.id) {
            // console.log('Fetching card products for user ID:', userInfo.id);
            dispatch(get_card_products(userInfo.id));
        }
    }, [dispatch, userInfo?.id]);

    const redirect = () => {
        navigate('/shipping', {
            state: {
                products: card_products,
                price: price,
                shipping_fee: shipping_fee,
                items: buy_product_item
            }
        });
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            if (userInfo?.id) {
                dispatch(get_card_products(userInfo.id));
            }
        }
    }, [successMessage, dispatch, userInfo?.id]);

    const inc = (quantity, stock, card_id) => {
        if (quantity < stock) {
            dispatch(quantity_inc(card_id));
        }
    };

    const dec = (quantity, card_id) => {
        if (quantity > 1) {
            dispatch(quantity_dec(card_id));
        }
    };

    return (
        <div>
            <Header />
            <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
                <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                    <div className='w-[85%] md:w-[90%] lg:w-[80%] mx-auto h-full'>
                        <div className='flex flex-col justify-center gap-1 items-center h-full text-white'>
                            <h2 className='text-3xl font-bold'>Card Page</h2>
                            <div className='flex justify-center items-center gap-2 text-2xl'>
                                <Link to='/'>Home</Link>
                                <span className='pt-1'>
                                    <IoIosArrowForward />
                                </span>
                                <span>Card</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-[#eeeeee]'>
                <div className='w-[90%] mx-auto py-16'>
                    { console.log("cart products===>",{card_products }) }
                    {card_products.length > 0 || outofstock_products.length > 0 ? (
                        <div className='flex flex-wrap'>
                            <div className='w-full lg:w-2/3'>
                                <div className='pr-3'>
                                    <div className='flex flex-col gap-3'>
                                        
                                        {card_products.map((p, i) => (
                                            <div key={i} className='bg-white p-4 flex flex-col gap-2'>
                                                <div className='flex justify-start items-center'>
                                                    <h2 className='text-md text-slate-600 font-bold'>{p.shopName}</h2>
                                                </div>
                                                {p.products.map((pt, j) => (
                                                    <div key={j} className='w-full flex flex-wrap border group transition-all duration-500 hover:shadow-md hover:-mt-3 bg-white'>
                                                        <div className='relative overflow-hidden'>
                                                            {
                                                                pt.productInfo.discount !== 0 && 
                                                                <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                                                                    {pt.productInfo.discount}% 
                                                                </div>
                                                            }
                                                            <img className='sm:w-full w-full h-[240px]' src={pt.productInfo.images[0]} alt="" />
                                                            <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                                                                <li onClick={() => dispatch(delete_card_product(pt._id))} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                                                    <FaRegHeart />
                                                                </li>
                                                                <Link to={`/product/details/${pt.productInfo.slug}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                                                    <FaEye />
                                                                </Link>
                                                            </ul>
                                                        </div>
                                                        <div className='py-3 text-slate-600 px-2'>
                                                            <h2 className='font-bold'>{pt.productInfo.name} </h2>
                                                            <div className='flex justify-start items-center gap-3'>
                                                                <span className='text-md font-semibold'>₹{pt.productInfo.price - Math.floor((pt.productInfo.price * pt.productInfo.discount) / 100)}</span>
                                                                <div className='flex'>
                                                                    <Rating ratings={pt.productInfo.rating} />
                                                                </div>
                                                            </div>
                                                            <div className='flex gap-2 flex-col'>
                                                                <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
                                                                    <div onClick={() => dec(pt.quantity, pt._id)} className='px-3 cursor-pointer'>-</div>
                                                                    <div className='px-3'>{pt.quantity}</div>
                                                                    <div onClick={() => inc(pt.quantity, pt.productInfo.stock, pt._id)} className='px-3 cursor-pointer'>+</div>
                                                                </div>
                                                                <button onClick={() => dispatch(delete_card_product(pt._id))} className='px-5 py-[3px] bg-red-500 text-white'>Delete</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='w-full lg:w-1/3'>
                                <div className='pl-3 lg:pl-0 mt-5'>
                                    {card_products.length > 0 && (
                                        <div className='bg-white p-3 text-slate-600 flex flex-col gap-3'>
                                            <h2 className='text-xl font-bold'>Order Summary</h2>
                                            <div className='flex justify-between items-center'>
                                                <span>{buy_product_item} Items</span>
                                                <span>₹{price}</span>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <span>Shipping Fee</span>
                                                <span>₹{shipping_fee}</span>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <span>Total</span>
                                                <span className='text-lg text-[#059473]'>₹{price + shipping_fee}</span>
                                            </div>
                                            <button onClick={redirect} className='px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-red-500 text-sm text-white uppercase'>
                                                Process to Checkout ({buy_product_item})
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='flex justify-center items-center'>
                            <Link className='px-4 py-2 bg-indigo-500 text-white rounded' to='/shops'>Shop Now</Link>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Card;
