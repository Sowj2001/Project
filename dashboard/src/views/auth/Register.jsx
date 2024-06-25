import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { seller_register, messageClear } from '../../store/Reducers/authReducer';

const Register = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { loader, successMessage, errorMessage } = useSelector(state => state.auth);

    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [passwordVisible, setPasswordVisible] = useState(false);

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(password);
    };

    const submit = (e) => {
        e.preventDefault();
        if (!validatePassword(state.password)) {
            toast.error(
                'Password must contain at least one uppercase letter, one lowercase letter, one special character, one number, and be at least 6 characters long.',
                {
                    position: 'top-center',
                    
                }
            );
            return;
        }
        dispatch(seller_register(state));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            navigate('/');
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch, navigate]);

    return (
        <div
            className='min-w-screen min-h-screen bg-cover bg-center flex items-center justify-center'
            style={{ backgroundImage: "url('https://woorise.com/wp-content/uploads/2021/03/Online-event-registration.png')" }}
        >
            <div className='bg-black bg-opacity-50 p-10 rounded-md w-full max-w-md lg:max-w-lg'>
                <div className='text-white'>
                    <div className=''>
                        <div className='flex justify-center mb-4'>
                            <img
                                src='https://cdn.dribbble.com/users/1096806/screenshots/5490079/illo_1-02_dribbble.jpg'
                                alt='Register'
                                className='w-32 h-32 object-cover rounded-full border-2 border-white'
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        'https://via.placeholder.com/150';
                                }}
                            />
                        </div>
                        <h2 className='text-2xl mb-3 font-bold text-white text-center'>
                            Welcome to BizCart4all
                        </h2>
                        <p className='text-sm mb-3 font-medium text-white'>
                            Please register your account
                        </p>
                        <form onSubmit={submit}>
                            <div className='mb-3'>
                                <label
                                    htmlFor='name'
                                    className='block text-sm font-medium text-white'
                                >
                                    Name
                                </label>
                                <input
                                    onChange={inputHandle}
                                    value={state.name}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md outline-none text-black'
                                    type='text'
                                    name='name'
                                    placeholder='Name'
                                    id='name'
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label
                                    htmlFor='email'
                                    className='block text-sm font-medium text-white'
                                >
                                    Email
                                </label>
                                <input
                                    onChange={inputHandle}
                                    value={state.email}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md outline-none text-black'
                                    type='email'
                                    name='email'
                                    placeholder='Email'
                                    id='email'
                                    required
                                />
                            </div>
                            <div className='mb-3 relative'>
                                <label
                                    htmlFor='password'
                                    className='block text-sm font-medium text-white'
                                >
                                    Password
                                </label>
                                <div className='flex border border-gray-300 rounded-md'>
                                    <input
                                        onChange={inputHandle}
                                        value={state.password}
                                        className='w-full px-3 py-2 outline-none text-black'
                                        type={passwordVisible ? 'text' : 'password'}
                                        name='password'
                                        placeholder='Password'
                                        id='password'
                                        required
                                    />
                                    <span
                                        onClick={togglePasswordVisibility}
                                        className='flex items-center px-3 cursor-pointer text-gray-500'
                                    >
                                        {passwordVisible ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <input
                                    className='mr-2 leading-tight'
                                    type='checkbox'
                                    id='checkbox'
                                    name='checkbox'
                                    required
                                />
                                <label
                                    htmlFor='checkbox'
                                    className='text-sm text-white'
                                >
                                    I agree to privacy policy & terms
                                </label>
                            </div>
                            <button
                                disabled={loader}
                                className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline'
                            >
                                {loader ? (
                                    <PropagateLoader
                                        color='#fff'
                                        cssOverride={overrideStyle}
                                    />
                                ) : (
                                    'Sign Up'
                                )}
                            </button>
                        </form>
                        <div className='mt-4 text-center'>
                            <p className='text-sm text-white'>
                                Already have an account?{' '}
                                <Link
                                    to='/login'
                                    className='font-bold text-blue-500'
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                        <div className='flex justify-center items-center mt-6'>
                            <div className='w-1/3 h-px bg-gray-300'></div>
                            <div className='mx-3 text-sm text-gray-500'>
                                Or 
                            </div>
                            <div className='w-1/3 h-px bg-gray-300'></div>
                        </div>
                        <div className='flex justify-center items-center mt-6'>
                            <a
                                href='http://your-backend-url/auth/google'
                                className='flex justify-center items-center w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 mr-3'
                            >
                                <FaGoogle className='text-blue-600' />
                            </a>
                            <button className='flex justify-center items-center w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300'>
                                <FaFacebook className='text-blue-700' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
