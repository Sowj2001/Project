import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getNav } from '../navigation';
import { RiLogoutBoxRLine } from "react-icons/ri";
import {  useSelector } from "react-redux";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  // const dispatch = useDispatch()
  const { role } = useSelector(state => state.auth)


  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);

  useEffect(() => {
    // const navs = getNav('admin');
    const navs = getNav(role);
    setAllNav(navs);
  }, [role]);

  return (
    <div>
      {/* Overlay for closing the sidebar */}
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed top-0 left-0 w-screen h-screen bg-[#8698a680] z-40 transition-opacity duration-200 ${
          showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 h-screen w-[260px] bg-[#c1bec5] z-50 shadow-[0_0_15px_0_rgb(34_41_47_/5%)] transition-transform duration-300 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className='h-[70px] flex justify-center items-center'>
          <Link to='/' className='w-[180px] h-[50px]'>
            <img className='w-full h-full' src='http://localhost:3000/images/bizcartlogo.png' alt="logo" />
          </Link>
        </div>
        <div className='px-[16px]'>
          <ul>
            {allNav.map((n, i) => (
              <li key={i}>
                <Link
                  to={n.path}
                  className={`${pathname === n.path 
                    ? 'bg-blue-500 shadow-indigo-500/50 text-white duration-500' 
                    : 'text-[#030811] font-bold duration-200'} px-[12px] py-[9px] rounded-md flex justify-start items-center gap-[12px] hover:pl-4 w-full transition-all mb-1`}
                >
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                className='text-[#030811] font-bold duration-200 px-[12px] py-[9px] rounded-md flex justify-start items-center gap-[12px] hover:pl-4 w-full transition-all mb-1'
                onClick={() => {
                  // Add your logout logic here
                  console.log('Logout clicked');
                }}
              >
                <span><RiLogoutBoxRLine /></span>
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
