import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { overrideStyle } from "../../utils/utils";
import { seller_login, messageClear } from "../../store/Reducers/authReducer";

const Login = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const { loader, errorMessage, successMessage } = useSelector(
		(state) => state.auth
	);

	const [state, setState] = useState({
		email: "",
		password: "",
		showPassword: false,
	});

	const inputHandle = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const togglePasswordVisibility = () => {
		setState({
			...state,
			showPassword: !state.showPassword,
		});
	};

	const submit = (e) => {
		e.preventDefault();
		dispatch(seller_login(state));
	};

	useEffect(() => {
		if (successMessage) {
			toast.success(successMessage);
			dispatch(messageClear());
			navigate("/");
		}
		if (errorMessage) {
			toast.error(errorMessage);
			dispatch(messageClear());
		}
	}, [successMessage, errorMessage, dispatch, navigate]);

	return (
		<div
			className='min-w-screen min-h-screen bg-cover bg-center flex justify-center items-center'
			style={{
				backgroundImage:
					"url('https://woorise.com/wp-content/uploads/2021/03/Online-event-registration.png')",
			}}
		>
			<div className='w-full max-w-md p-6 bg-opacity-80 rounded-lg shadow-lg'>
				<div className='bg-white p-8 rounded-lg'>
					<h2 className='text-2xl mb-4 font-bold text-gray-800 text-center'>
						Welcome to BizCart4all
					</h2>
					<form onSubmit={submit}>
						<div className='mb-4'>
							<label
								htmlFor='email'
								className='block text-gray-700 text-sm font-bold mb-2'
							>
								Email
							</label>
							<input
								type='email'
								id='email'
								name='email'
								value={state.email}
								onChange={inputHandle}
								className='w-full px-3 py-2 border rounded-md outline-none text-gray-700'
								placeholder='Enter your email'
								required
							/>
						</div>
						<div className='mb-6'>
							<label
								htmlFor='password'
								className='block text-gray-700 text-sm font-bold mb-2'
							>
								Password
							</label>
							<div className='relative'>
								<input
									type={state.showPassword ? "text" : "password"}
									id='password'
									name='password'
									value={state.password}
									onChange={inputHandle}
									className='w-full px-3 py-2 border rounded-md outline-none text-gray-700'
									placeholder='Enter your password'
									required
								/>
								<span
									className='absolute top-3 right-3 cursor-pointer text-gray-500'
									onClick={togglePasswordVisibility}
								>
									{state.showPassword ? <FaEyeSlash /> : <FaEye />}
								</span>
							</div>
						</div>
						<button
							type='submit'
							disabled={loader}
							className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline'
						>
							{loader ? (
								<PropagateLoader color='#fff' cssOverride={overrideStyle} />
							) : (
								"Sign In"
							)}
						</button>
					</form>
					<div className='mt-4 text-center'>
						<p className='text-sm text-gray-600'>
							Don't have an account?{" "}
							<Link to='/register' className='font-bold text-blue-500'>
								Sign Up
							</Link>
						</p>
					</div>
					<div className='flex justify-center items-center mt-6'>
						<div className='w-1/3 h-px bg-gray-300'></div>
						<div className='mx-3 text-sm text-gray-500'>Or</div>
						<div className='w-1/3 h-px bg-gray-300'></div>
					</div>
					<div className='flex justify-center items-center mt-6'>
						<a
							href='http://your-backend-url/auth/google' // Replace with your actual backend route for Google OAuth
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
	);
};

export default Login;
