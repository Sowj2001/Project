import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getNav } from "../navigation/index";
import { BiLogOutCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout,messageClear } from "../store/Reducers/authReducer";
import logo from "../assets/logo.png";
// import toast from 'react-hot-toast';


const Sidebar = ({ showSidebar, setShowSidebar }) => {
	const dispatch = useDispatch();
	const { role,errorMessage,successMessage } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const { pathname } = useLocation();
	const [allNav, setAllNav] = useState([]);
	useEffect(() => {
		const navs = getNav(role);
		setAllNav(navs);
	}, [role]);

	const handleLogout = () => {
		console.log('Dispatching logout action');
		dispatch(logout({ navigate, role }));
	};


	// useEffect(() => {
    //     if (errorMessage) {
    //         toast.error(errorMessage)
    //         dispatch(messageClear())
    //     }
    //     if (successMessage) {
    //         toast.success(successMessage)
    //         dispatch(messageClear())  
    //         // navigate('/')          
    //     }
    // },[errorMessage,successMessage])

	return (
		<div>
			<div
				onClick={() => setShowSidebar(false)}
				className={`fixed duration-200 ${
					!showSidebar ? "invisible" : "visible"
				} w-screen h-screen bg-[#8cbce780] top-0 left-0 z-10`}
			></div>

			<div
				className={`w-[260px] fixed bg-[#e6e7fb] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${
					showSidebar ? "left-0" : "-left-[260px] lg:left-0"
				} `}
			>
				<div className='h-[70px] flex justify-center items-center'>
					<Link to='/' className='w-[180px] h-[50px]'>
						<img className='w-full h-full' src={logo} alt='' />
					</Link>
				</div>

				<div className='px-[16px]'>
					<ul>
						{allNav.map((n, i) => (
							<li key={i}>
								<Link
									to={n.path}
									className={`${
										pathname === n.path
											? "bg-blue-600 shadow-indigo-500/50 text-white duration-500"
											: "text-[#030811] font-bold duration-200 "
									} px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1 `}
								>
									<span>{n.icon}</span>
									<span>{n.title}</span>
								</Link>
							</li>
						))}

						<li>
							<button
								onClick={handleLogout}
								className='text-[#030811] font-bold duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1'
							>
								<span>
									<BiLogOutCircle />
								</span>
								<span>Logout</span>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
