import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { seller_register, messageClear } from '../../store/Reducers/authReducer';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loader, successMessage, errorMessage } = useSelector(state => state.auth);

    const [state, setState] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submit = (e) => {
        e.preventDefault();
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
    }, [successMessage, errorMessage,dispatch,navigate]);

    return (
        <div className='min-w-screen min-h-screen flex items-center justify-center bg-cover bg-center'
            style={{ backgroundImage: 'url(https://www.alll.com/wp-content/uploads/2019/01/signup-background2-768x432.jpg)' }}>
            <div className='bg-white bg-opacity-90 rounded-lg shadow-lg flex flex-col md:flex-row md:max-w-4xl w-full'>
                <div className='md:w-1/2 p-6 flex flex-col justify-center'>
                    <h2 className='text-2xl font-bold mb-2 text-[#333]'>Welcome to BizCart4All</h2>
                    <p className='text-sm mb-4 text-[#666]'>Please register your account</p>
                    <form onSubmit={submit} className='space-y-4'>
                        <div className='flex flex-col'>
                            <label htmlFor="name" className='mb-1 text-[#555]'>Name</label>
                            <input onChange={inputHandle} value={state.name} className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' type="text" name='name' placeholder='Name' id='name' required />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="email" className='mb-1 text-[#555]'>Email</label>
                            <input onChange={inputHandle} value={state.email} className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' type="email" name='email' placeholder='Email' id='email' required />
                        </div>
                        <div className='flex flex-col relative'>
                            <label htmlFor="password" className='mb-1 text-[#555]'>Password</label>
                            <input onChange={inputHandle} value={state.password} className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' id='password' required />
                            <button type="button" onClick={togglePasswordVisibility} className='absolute right-3 top-9 text-black'>
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                        <div className='flex items-center'>
                            <input className='w-4 h-4 text-indigo-600 bg-gray-100 rounded border-gray-300 focus:ring-indigo-500' type="checkbox" name="checkbox" id="checkbox" />
                            <label htmlFor="checkbox" className='ml-2 text-[#555]'>I agree to privacy policy & terms</label>
                        </div>
                        <button disabled={loader} className='bg-indigo-600 text-white w-full py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                            {loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Sign Up'}
                        </button>
                    </form>
                    <div className='mt-4 text-center'>
                        <p>Already have an account? <Link className='font-bold text-indigo-600' to="/login">Sign In</Link></p>
                    </div>
                </div>
                <div className='hidden md:block md:w-1/2'>
                    <img src='https://static.vecteezy.com/system/resources/previews/010/925/538/non_2x/enter-login-and-password-registration-page-on-screen-sign-in-to-your-account-creative-metaphor-login-page-mobile-app-with-user-page-identification-in-internet-vector.jpg' alt='Register' className='w-full h-full object-cover rounded-r-lg' />
                </div>
            </div>
        </div>
    );
};

export default Register;
