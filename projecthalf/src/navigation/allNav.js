import { MdDashboardCustomize } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { FaUserTimes, FaUsers } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoChatbubblesOutline } from "react-icons/io5";

export const allNav=[
    {
        id:1,
        title:'Dashboard',
        icon:<MdDashboardCustomize />,
        role:'admin',
        path:'/admin/dashboard'
    },
    {
        id:2,
        title:'Orders',
        icon:<IoCartOutline />,
        role:'admin',
        path:'/admin/dashboard/orders'
    },
    {
        id:3,
        title:'Category',
        icon:<MdOutlineCategory />,
        role:'admin',
        path:'/admin/dashboard/category'
    },
    {
        id:4,
        title:'Sellers',
        icon:<FaUsers />,
        role:'admin',
        path:'/admin/dashboard/seller'
    },
    {
        id:5,
        title:'Payment Request',
        icon:<MdPayment />,
        role:'admin',
        path:'/admin/dashboard/payment-request'
    },
    {
        id:6,
        title:'Deactive Sellers',
        icon:<FaUserTimes/>,
        role:'admin',
        path:'/admin/dashboard/deactive-sellers'
    },
    {
        id:7,
        title:'Seller Request',
        icon:<FaCodePullRequest />,
        role:'admin',
        path:'/admin/dashboard/seller-request'
    },
    {
        id:8,
        title:'Chat',
        icon:<IoChatbubblesOutline />,
        role:'admin',
        path:'/admin/dashboard/chat'
    },
   


    
    
    
    
]