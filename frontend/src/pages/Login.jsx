import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { customer_login, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Input,
  Typography
} from "@material-tailwind/react";

const Login = () => {
    const navigate = useNavigate();
    const { loader, errorMessage, successMessage, userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [state, setState] = useState({ 
        email: '',
        password: '',
        showPassword: false // State to toggle password visibility
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const togglePasswordVisibility = () => {
        setState({
            ...state,
            showPassword: !state.showPassword
        });
    };

    const login = (e) => {
        e.preventDefault();
        dispatch(customer_login(state));
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
    }, [successMessage, errorMessage, userInfo, navigate, dispatch]);

    return (
        <div className='min-h-screen flex flex-col'>
            {loader && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-50'>
                    <FadeLoader />
                </div>
            )}
            <Header />
            <div className='flex-1 flex justify-center items-center m-3 bg-gray-100 py-8'>
                <div className='flex w-full max-w-6xl mx-4'>
                    <div className='w-full md:w-1/2 bg-cover bg-center rounded-l-lg'
                     style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/001/991/652/non_2x/sign-in-page-flat-design-concept-illustration-icon-account-login-user-login-abstract-metaphor-can-use-for-landing-page-mobile-app-ui-posters-banners-free-vector.jpg')" }}>
                    </div>
                    <div className='w-full md:w-1/2 bg-white rounded-r-lg  flex flex-col justify-center p-6 md:p-8'>
                    
                        <Card className='w-full max-w-sm mx-auto'>
                            <CardBody>
                                <h2 className='text-xl text-gray-700 font-bold mb-4'>Login📝</h2>
                                <form onSubmit={login} className='text-slate-600'>
                                    <div className='mb-4'>
                                        <Input 
                                            onChange={inputHandle}
                                            value={state.email}
                                            type='email'
                                            name='email'
                                            label='Email'
                                            placeholder='Email'
                                            size='md'
                                            required
                                            color='lightBlue'
                                            outline={false}
                                        />
                                    </div>
                                    <div className='mb-4 relative'>
                                        <Input 
                                            onChange={inputHandle}
                                            value={state.password}
                                            type={state.showPassword ? 'text' : 'password'} // Toggle password visibility
                                            name='password'
                                            label='Password'
                                            placeholder='Password'
                                            size='md'
                                            required
                                            color='lightBlue'
                                            outline={false}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className='absolute right-3 top-2 text-gray-400 focus:outline-none'
                                        >
                                           {state.showPassword ? '🙈' : '👁️'}
                                        </button>
                                    </div>
                                    <Button
                                        type='submit'
                                        fullWidth
                                        color='green'
                                        className='mb-4'
                                    >
                                        Login
                                    </Button>
                                </form>
                                <div className='text-center mb-4'>
                                    <Link to='/forgot-password' className='text-blue-500'>Forgot Password?</Link>
                                </div>
                                <div className='text-center'>
                                    <Typography variant="small" className="text-gray-600">
                                        Don't Have An Account? <Link className='text-blue-500' to='/register'>Register</Link>
                                    </Typography>
                                </div>
                            </CardBody>
                            <CardFooter className='flex flex-col items-center gap-2'>
                                <a target='_blank' rel='noopener noreferrer' href="http://localhost:3001/login">
                                    <Button color='teal' className='w-full'>Login As a Seller</Button>
                                </a>
                                <a target='_blank' rel='noopener noreferrer' href="http://localhost:3001/register">
                                    <Button color='purple' className='w-full'>Register As a Seller</Button>
                                </a>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
