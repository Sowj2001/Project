import React, { useEffect, useState } from 'react';
import { FaImages } from "react-icons/fa6";
import { FadeLoader } from 'react-spinners';
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { profile_image_upload, messageClear, profile_info_add } from '../../store/Reducers/authReducer';
import toast from 'react-hot-toast';
import { create_stripe_connect_account } from '../../store/Reducers/sellerReducer';

const Profile = () => {
    const [state, setState] = useState({
        division: '',
        district: '',
        shopName: '',
        sub_district: '',
        phoneNumber: '',
        gstn: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();
    const { userInfo, loader, successMessage, errorMessage } = useSelector(state => state.auth);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear()); 
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear()); 
        }
    }, [successMessage, errorMessage, dispatch]);

    const add_image = (e) => {
        if (e.target.files.length > 0) {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            dispatch(profile_image_upload(formData));
        }
    };

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!state.shopName) errors.shopName = "Shop Name is required";
        if (!state.phoneNumber) errors.phoneNumber = "Phone Number is required";
        if (!state.gstn) errors.gstn = "GST Number is required";
        if (!state.division) errors.division = "State is required";
        if (!state.district) errors.district = "District is required";
        if (!state.sub_district) errors.sub_district = "Sub District is required";

        // Validate GST number
        const gst = "GST";
        const phoneNumberLast3Digits = state.phoneNumber.slice(-3);
        const shopNameFirst3Letters = state.shopName.slice(0, 3).toUpperCase();
        const expectedGstn = `${gst}${phoneNumberLast3Digits}${shopNameFirst3Letters}`;

        if (state.gstn !== expectedGstn) {
            toast.error('Enter a valid GST Number');
            errors.gstn = "Invalid GST Number";
        }

        return errors;
    };

    const add = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            dispatch(profile_info_add(state));
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div className='px-2 lg:px-7 py-5'>
            <div className='w-full flex flex-wrap'>
                <div className='w-full md:w-6/12'>
                    <div className='w-full p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]'>
                        <div className='flex justify-center items-center py-3'>
                            {userInfo?.image ? (
                                <label htmlFor="img" className='h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden'>
                                    <img src={userInfo.image} alt="Profile" />
                                    {loader && (
                                        <div className='bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20'>
                                            <span>
                                                <FadeLoader />
                                            </span>
                                        </div>
                                    )}
                                </label>
                            ) : (
                                <label className='flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 border-[#d0d2d6] relative' htmlFor="img">
                                    <span><FaImages /> </span>
                                    <span>Select Image</span>
                                    {loader && (
                                        <div className='bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20'>
                                            <span>
                                                <FadeLoader />
                                            </span>
                                        </div>
                                    )}
                                </label>
                            )}
                            <input onChange={add_image} type="file" className='hidden' id='img' />
                        </div>

                        <div className='px-0 md:px-5 py-2'>
                            <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative'>
                                <span className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer'><FaRegEdit /> </span>
                                <div className='flex gap-2'>
                                    <span>Name : </span>
                                    <span>{userInfo.name}</span> 
                                </div>
                                <div className='flex gap-2'>
                                    <span>Email : </span>
                                    <span>{userInfo.email}</span> 
                                </div>
                                <div className='flex gap-2'>
                                    <span>Role : </span>
                                    <span>{userInfo.role}</span> 
                                </div>
                                <div className='flex gap-2'>
                                    <span>Status : </span>
                                    <span>{userInfo.status}</span> 
                                </div>
                                <div className='flex gap-2'>
                                    <span>Payment Account : </span>
                                    <p>
                                        {userInfo.payment === 'active' ? (
                                            <span className='bg-red-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded'>{userInfo.payment}</span>
                                        ) : (
                                            <span onClick={() => dispatch(create_stripe_connect_account())} className='bg-blue-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded'>Click Active</span>
                                        )}
                                    </p>
                                </div> 
                            </div> 
                        </div>

                        <div className='px-0 md:px-5 py-2'>
                            {!userInfo?.shopInfo ? (
                                <form onSubmit={add}>
                                    <div className='flex flex-col w-full gap-1 mb-2'>
                                        <label htmlFor="Shop">Shop Name</label>
                                        <input value={state.shopName} onChange={inputHandle} className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" name='shopName' id='Shop' placeholder='Shop Name' />
                                        {formErrors.shopName && <p className='text-red-500 text-sm'>{formErrors.shopName}</p>}
                                    </div>  

                                    <div className='flex flex-col w-full gap-1 mb-2'>
                                        <label htmlFor="Phone">Phone Number</label>
                                        <input value={state.phoneNumber} onChange={inputHandle} className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" name='phoneNumber' id='Phone' placeholder='Phone Number' />
                                        {formErrors.phoneNumber && <p className='text-red-500 text-sm'>{formErrors.phoneNumber}</p>}
                                    </div>

                                    <div className='flex flex-col w-full gap-1 mb-2'>
                                        <label htmlFor="gstn">GST Number</label>
                                        <input value={state.gstn} onChange={inputHandle} className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" name='gstn' id='gstn' placeholder='GST Number' />
                                        {formErrors.gstn && <p className='text-red-500 text-sm'>{formErrors.gstn}</p>}
                                    </div>

                                    <div className='flex flex-col w-full gap-1 mb-2'>
                                        <label htmlFor="sub_district">Shop Address</label>
                                        <input value={state.sub_district} onChange={inputHandle} className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" name='sub_district' id='sub_district' placeholder='Address' />
                                        {formErrors.sub_district && <p className='text-red-500 text-sm'>{formErrors.sub_district}</p>}
                                    </div>

                                    <div className='flex flex-col w-full gap-1 mb-2'>
                                        <label htmlFor="division">State</label>
                                        <input value={state.division} onChange={inputHandle} className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" name='division' id='division' placeholder='State Name' />
                                        {formErrors.division && <p className='text-red-500 text-sm'>{formErrors.division}</p>}
                                    </div>  

                                    <div className='flex flex-col w-full gap-1 mb-2'>
                                        <label htmlFor="district">District </label>
                                        <input value={state.district} onChange={inputHandle} className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" name='district' id='district' placeholder='District ' />
                                        {formErrors.district && <p className='text-red-500 text-sm'>{formErrors.district}</p>}
                                    </div>  

                                    

                                    <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors'>Submit</button>
                                </form>
                            ) : (
                                <div className='flex flex-col gap-2'>
                                    <div className='flex gap-2'>
                                        <span>Shop Name:</span>
                                        <span>{userInfo.shopInfo.shopName}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span>Phone Number:</span>
                                        <span>{userInfo.shopInfo.phoneNumber}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span>GST Number:</span>
                                        <span>{userInfo.shopInfo.gstn}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span>State:</span>
                                        <span>{userInfo.shopInfo.division}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span>District:</span>
                                        <span>{userInfo.shopInfo.district}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span>Sub District:</span>
                                        <span>{userInfo.shopInfo.sub_district}</span>
                                    </div>
                                </div>
                            )}
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
