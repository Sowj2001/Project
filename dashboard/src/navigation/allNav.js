import { MdDashboardCustomize } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { FaUserTimes, FaUsers } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { BsChatLeftDotsFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";

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
        path:'/admin/dashboard/sellers'
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
        path:'/admin/dashboard/chat-sellers'
    },
    {
        id : 9,
        title : 'Dashboard',
        icon : <MdDashboardCustomize />,
        role : 'seller',
        path: '/seller/dashboard'
    },
    {
        id : 10,
        title : 'Add Product',
        icon : <MdAddShoppingCart />,
        role : 'seller',
        path: '/seller/dashboard/add-product'
    },     
    {
        id : 11,
        title : 'All Product',
        icon : <FaProductHunt />,
        role : 'seller',
        path: '/seller/dashboard/products'
    },
    // {
    //     id : 12,
    //     title : 'Discount Product',
    //     icon : <MdDashboardCustomize />,
    //     role : 'seller',
    //     path: '/seller/dashboard/discount-product'
    // },
    {
        id : 14,
        title : 'Orders',
        icon : <IoCartOutline />,
        role : 'seller',
        path: '/seller/dashboard/orders'
    },
    {
        id : 15,
        title : 'Payments',
        icon : <MdPayment />,
        role : 'seller',
        path: '/seller/dashboard/payments'
    },
    {
        id : 16,
        title : 'Chat-Customer',
        icon : <BsChatDotsFill />,
        role : 'seller',
        path: '/seller/dashboard/chat-customer'
    },
    {
        id : 17,
        title : 'Chat-Support',
        icon : <BsChatLeftDotsFill />,
        role : 'seller',
        path: '/seller/dashboard/chat-support'
    }, 
    {
        id : 17,
        title : 'Profile',
        icon : <BsPersonCircle />,
        role : 'seller',
        path: '/seller/dashboard/profile'
    }


    
    
    
    
]