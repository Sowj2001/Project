import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { place_order } from "../store/reducers/orderReducer";

const Shipping = () => {
	const {
		state: { products, price, shipping_fee, items },
	} = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userInfo } = useSelector((state) => state.auth);

	const [res, setRes] = useState(false);
	const [state, setState] = useState({
		name: "",
		address: "",
		phone: "",
		post: "",
		province: "",
		city: "",
		area: "",
	});
	const [errors, setErrors] = useState({});

	const validate = () => {
		const newErrors = {};

		// Validate that name contains only letters
		const namePattern = /^[a-zA-Z\s]+$/;
		if (!state.name) {
			newErrors.name = "Name is required";
		} else if (!namePattern.test(state.name)) {
			newErrors.name = "Name should contain only letters";
		}

		if (!state.address) newErrors.address = "Address is required";

		if (!state.phone) {
			newErrors.phone = "Phone number is required";
		} else if (!/^\d{10}$/.test(state.phone)) {
			newErrors.phone = "Phone number must be 10 digits";
		}

		// Validate that post is a 6-digit number
		if (!state.post) {
			newErrors.post = "Post code is required";
		} else if (!/^\d{6}$/.test(state.post)) {
			newErrors.post = "Post code must be a 6-digit number";
		}

		if (!state.province) newErrors.province = "State is required";
		if (!state.city) newErrors.city = "City is required";
		if (!state.area) newErrors.area = "Area is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const inputHandle = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const save = (e) => {
		e.preventDefault();
		if (validate()) {
			setRes(true);
		}
	};

	const placeOrder = () => {
		dispatch(
			place_order({
				price,
				products,
				shipping_fee,
				items,
				shippingInfo: state,
				userId: userInfo.id,
				navigate,
			})
		);
	};

	return (
		<div>
			<Header />
			<section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
				<div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
					<div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
						<div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
							<h2 className='text-3xl font-bold'>Shipping Page </h2>
							<div className='flex justify-center items-center gap-2 text-2xl w-full'>
								<Link to='/'>Home</Link>
								<span className='pt-1'>
									<IoIosArrowForward />
								</span>
								<span>Shipping </span>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='bg-[#eeeeee]'>
				<div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16'>
					<div className='w-full flex flex-wrap'>
						<div className='w-[67%] md-lg:w-full'>
							<div className='flex flex-col gap-3'>
								<div className='bg-white p-6 shadow-sm rounded-md'>
									<h2 className='text-slate-600 font-bold pb-3'>
										Shipping Information{" "}
									</h2>

									{!res && (
										<>
											<form onSubmit={save}>
												<div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
													<div className='flex flex-col gap-1 mb-2 w-full'>
														<label htmlFor='name'> Name </label>
														<input
															onChange={inputHandle}
															value={state.name}
															type='text'
															className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
															name='name'
															id='name'
															placeholder='Name'
														/>
														{errors.name && (
															<p className='text-red-500 text-sm'>
																{errors.name}
															</p>
														)}
													</div>

													<div className='flex flex-col gap-1 mb-2 w-full'>
														<label htmlFor='address'> Address </label>
														<input
															onChange={inputHandle}
															value={state.address}
															type='text'
															className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
															name='address'
															id='address'
															placeholder='Address'
														/>
														{errors.address && (
															<p className='text-red-500 text-sm'>
																{errors.address}
															</p>
														)}
													</div>
												</div>

												<div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
													<div className='flex flex-col gap-1 mb-2 w-full'>
														<label htmlFor='phone'> Phone </label>
														<input
															onChange={inputHandle}
															value={state.phone}
															type='text'
															className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
															name='phone'
															id='phone'
															placeholder='Phone'
														/>
														{errors.phone && (
															<p className='text-red-500 text-sm'>
																{errors.phone}
															</p>
														)}
													</div>

													<div className='flex flex-col gap-1 mb-2 w-full'>
														<label htmlFor='post'> Post </label>
														<input
															onChange={inputHandle}
															value={state.post}
															type='text'
															className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
															name='post'
															id='post'
															placeholder='Post'
														/>
														{errors.post && (
															<p className='text-red-500 text-sm'>
																{errors.post}
															</p>
														)}
													</div>
												</div>

												<div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
													<div className='flex flex-col gap-1 mb-2 w-full'>
														<label htmlFor='province'> State </label>
														<input
															onChange={inputHandle}
															value={state.province}
															type='text'
															className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
															name='province'
															id='province'
															placeholder='State'
														/>
														{errors.province && (
															<p className='text-red-500 text-sm'>
																{errors.province}
															</p>
														)}
													</div>

													<div className='flex flex-col gap-1 mb-2 w-full'>
														<label htmlFor='city'> City </label>
														<input
															onChange={inputHandle}
															value={state.city}
															type='text'
															className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
															name='city'
															id='city'
															placeholder='City'
														/>
														{errors.city && (
															<p className='text-red-500 text-sm'>
																{errors.city}
															</p>
														)}
													</div>
												</div>

												<div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
													<div className='flex flex-col gap-1 mb-2 w-full'>
														<label htmlFor='area'> Area </label>
														<input
															onChange={inputHandle}
															value={state.area}
															type='text'
															className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
															name='area'
															id='area'
															placeholder='Area'
														/>
														{errors.area && (
															<p className='text-red-500 text-sm'>
																{errors.area}
															</p>
														)}
													</div>
												</div>

												<div className='mt-2 flex justify-end'>
													<button
														type='submit'
														className='bg-[#06cc4a] hover:bg-[#06cc4ad6] transition-all p-2 rounded-md shadow-md w-32 text-white text-lg font-bold'>
														Save
													</button>
												</div>
											</form>
										</>
									)}

									{res && (
										<>
											<h2 className='text-xl text-slate-600 mb-2'>
												Shipping Details
											</h2>
											<ul>
												{Object.keys(state).map((key) => (
													<li key={key}>
														<strong>{key}:</strong> {state[key]}
													</li>
												))}
											</ul>
											<div className='mt-5 flex justify-end'>
												<button
													onClick={placeOrder}
													className='bg-[#06cc4a] hover:bg-[#06cc4ad6] transition-all p-2 rounded-md shadow-md w-32 text-white text-lg font-bold'>
													Place Order
												</button>
											</div>
										</>
									)}
								</div>
							</div>
						</div>

						<div className='w-[33%] md-lg:w-full'></div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Shipping;
