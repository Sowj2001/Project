import React, { useEffect } from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Vendors from './pages/Vendors';
import VendorProducts from './pages/VendorProducts';
import Shops from './pages/Shops';
import Card from './pages/Card';
import Shipping from './pages/Shipping';
import Details from './pages/Details';
import Login from './pages/Login';
import Register from './pages/Register';
import { get_category } from './store/reducers/homeReducer';
import { useDispatch} from 'react-redux';
import CategoryShop from './pages/CategoryShop';
import SearchProducts from './pages/SearchProducts';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import ProtectUser from './utils/ProtectUser';
import Index from './components/dashboard/Index';
import Orders from './components/dashboard/Orders';

import Wishlist from './components/dashboard/Wishlist';
import OrderDetails from './components/dashboard/OrderDetails';
import Chat from './components/dashboard/Chat';
import ConfirmOrder from './pages/ConfirmOrder';
import AboutUs from './pages/AboutUs';
import ForgotPassword from './pages/ForgotPassword';
import ContactUs from './pages/ContactUs';
import ResetPassword from './pages/ResetPassword';


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(get_category()) 
},[dispatch])


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<AboutUs/>}></Route>
      <Route path='/vendors' element={<Vendors/>}></Route>
      <Route path="/vendor/:sellerId/products" element={<VendorProducts />} />
      <Route path='/contact' element={<ContactUs/>}></Route>
      
    
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset-password/:id/:token' element={<ResetPassword/>}/>

      <Route path='/shops' element={<Shops/>} />
      <Route path='/card' element={<Card/>} />
      <Route path='/shipping' element={<Shipping/>} />
      <Route path='/payment' element={<Payment/>} />
      <Route path='/products?' element={<CategoryShop/>} />
      <Route path='/products/search?' element={<SearchProducts/>} />
      <Route path='/product/details/:slug' element={<Details/>} /> 
      <Route path='/order/confirm?' element={<ConfirmOrder/>} /> 

      <Route path='/dashboard' element={<ProtectUser/>} >
      <Route path='' element={<Dashboard/>} >        
      <Route path='' element={<Index/>} />
      <Route path='my-orders' element={<Orders/>} /> 
      
      <Route path='my-wishlist' element={<Wishlist/>} /> 
      <Route path='order/details/:orderId' element={<OrderDetails/>} /> 
      <Route path='chat' element={<Chat/>} /> 
      <Route path='chat/:sellerId' element={<Chat/>} /> 
       
       </Route> 
      </Route>
      
       




    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
