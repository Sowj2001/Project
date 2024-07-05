import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { customer_register, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import eye icons

const Register = () => {
    const navigate = useNavigate();
    const { loader, errorMessage, successMessage, userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        showPassword: false, // State to toggle password visibility
        passwordErrorShown: false // State to track if password error message has been shown
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const register = (e) => {
        e.preventDefault();
        // Check password constraints before dispatching
        if (!/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(state.password)) {
            toast.error("Password must contain at least one uppercase letter, one special character, one number, and be at least 6 characters long");
            setState({
                ...state,
                passwordErrorShown: true // Set the error flag to true
            });
            return;
        }
        // Check email format before dispatching
        if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(state.email)) {
            toast.error("Enter valid email");
            return;
        }
        dispatch(customer_register(state));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (userInfo) {
            navigate('/');
        }
    }, [successMessage, errorMessage, userInfo, dispatch, navigate]);

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setState({
            ...state,
            password: password,
            passwordErrorShown: false // Reset password error flag on change
        });
    };

    const togglePasswordVisibility = () => {
        setState({
            ...state,
            showPassword: !state.showPassword
        });
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setState({
            ...state,
            email: email.toLowerCase() // Ensure email is stored in lowercase
        });
    };

    return (
        <div className='min-h-screen flex flex-col'>
            {loader && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-50'>
                    <FadeLoader />
                </div>
            )}
            <Header />
            <div className='bg-gray-100 m-3 flex justify-center items-center'>
                <div className='w-full max-w-6xl mx-auto p-10'>
                    <div className='flex flex-row md:flex-row gap-12 bg-white rounded-md shadow-md'>
                        <div className='md:w-2/3 mr-5 ml-5 p-9 flex flex-col justify-center'>
                            <h1 className='text-xl text-gray-800 font-bold mb-4'>WELCOME TO BIZCART4ALL🤩</h1>
                            <h2 className='text-xl text-gray-700 font-bold mb-4'>Register📝</h2>
                            <form onSubmit={register} className='text-gray-700'>
                                <div className='mb-4'>
                                    <label htmlFor='name' className='block mb-1'>Name</label>
                                    <input
                                        type='text'
                                        id='name'
                                        name='name'
                                        value={state.name}
                                        onChange={inputHandle}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500'
                                        placeholder='Enter your name'
                                        required
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='email' className='block mb-1'>Email</label>
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={state.email}
                                        onChange={handleEmailChange}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500'
                                        placeholder='Enter your email'
                                        required
                                    />
                                </div>
                                <div className='mb-4 relative'>
                                    <label htmlFor='password' className='block mb-1'>Password</label>
                                    <div className='relative'>
                                        <input
                                            type={state.showPassword ? 'text' : 'password'}
                                            id='password'
                                            name='password'
                                            value={state.password}
                                            onChange={handlePasswordChange}
                                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 pr-10'
                                            placeholder='Enter your password'
                                            required
                                        />
                                        <span
                                            className='absolute right-3 top-3 cursor-pointer'
                                            onClick={togglePasswordVisibility}
                                        >
                                            {state.showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                        </span>
                                    </div>
                                </div>
                                {state.passwordErrorShown && (
                                    <p className='text-red-500 text-sm mb-4'>Password must contain at least one uppercase letter, one special character, one number, and be at least 6 characters long</p>
                                )}
                                <button
                                    type='submit'
                                    className='w-full py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300'
                                >
                                    Register
                                </button>
                            </form>
                            <div className='flex justify-center items-center my-4'>
                                <div className='h-[1px] bg-gray-300 w-[95%]'></div>
                                <span className='px-3 text-gray-600'>Or</span>
                                <div className='h-[1px] bg-gray-300 w-[95%]'></div>
                            </div>
                            <div className='text-center text-gray-700'>
                                <p>Already have an account? <Link to='/login' className='text-blue-500'>Login</Link></p>
                            </div>
                        </div>
                        <div className='md:w-1/3 flex justify-center items-center'>
                            <img
                                src='https://static.vecteezy.com/system/resources/previews/003/689/230/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg'
                                alt='Registrationimage'
                                className='w-full max-h-[400px] object-cover rounded-r-md'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
