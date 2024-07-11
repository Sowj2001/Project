import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { overrideStyle } from '../../utils/utils';
import { seller_login, messageClear } from '../../store/Reducers/authReducer';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loader, errorMessage, successMessage } = useSelector(state => state.auth);

    const [state, setState] = useState({
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
        dispatch(seller_login(state));
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
    }, [successMessage, errorMessage]);

    return (
        <div className='min-w-screen min-h-screen flex justify-center items-center' style={{ backgroundImage: `url('https://wallpapercave.com/wp/wp4390828.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='bg-opacity-50 w-full h-full absolute'></div>
            <div className='flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden w-[90%] max-w-[900px] z-10'>
                <div>
                    <video src='https://cdnl.iconscout.com/lottie/premium/thumb/login-6599082-5455225.mp4' autoPlay muted loop></video>
                </div>
                <div className='bg-white w-full md:w-1/2 p-8'>
                    <div className='p-4 rounded-md'>
                        <h2 className='text-xl mb-3 font-bold text-black'>Welcome to BizCart4All</h2>
                        <p className='text-sm mb-3 font-medium text-black'>Please Sign In to your account</p>
                        <form onSubmit={submit}>
                            <div className='flex flex-col w-full gap-1 mb-3'>
                                <label htmlFor="email" className='text-black'>Email</label>
                                <input onChange={inputHandle} value={state.email} className='px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md' type="email" name='email' placeholder='Email' id='email' required />
                            </div>
                            <div className='flex flex-col w-full gap-1 mb-3 relative'>
                                <label htmlFor="password" className='text-black'>Password</label>
                                <input onChange={inputHandle} value={state.password} className='px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md' type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' id='password' required />
                                <button type="button" onClick={togglePasswordVisibility} className='absolute right-3 top-9 text-black'>
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                            <button disabled={loader ? true : false} className='bg-slate-700 w-full hover:shadow-black-800/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
                                {loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Sign In'}
                            </button>
                            <div className='flex items-center mb-3 gap-3 justify-center'>
                                <p>Don't Have an account? <Link className='font-bold' to="/register">Sign Up</Link> </p>
                            </div>
                            <div className='text-center'>
                                <Link to="/forgot-password" className='text-sm text-black underline'>Forgot Password?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
