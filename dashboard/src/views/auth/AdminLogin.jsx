import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { admin_login ,messageClear} from '../../store/Reducers/authReducer';
import {PropagateLoader} from 'react-spinners';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const  AdminLogin = () => {

    const navigate =useNavigate()

    const dispatch =useDispatch()
    const {loader,errorMessage,successMessage}=useSelector(state=>state.auth)



    const[state,setState]=useState({
        email:"",
        password:""
    })

    const inputHandle=(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    const submit =(e)=>{
        e.preventDefault()
        dispatch(admin_login(state))
   
    }

    const overideStyle={
        display:'flex',
        margin:'0 auto',
        height:'20px',
        justifyContent:'center',
        alignItems :'center'
    }

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            navigate('/')
        }
    }, [errorMessage, successMessage, dispatch, navigate]);
    


    return (
        <div className='min-w-screen min-h-screen bg-[#ccc9e9] flex justify-center items-center '>
            <div className='w-[350px] text-[#ffffff] p-2'>
                <div className='bg-[#6f68d1] p-4 rounded-md'>
                   <div className='h-[50px] items-center'>
                    <div className='w-[200px] h-[50px]'>
                        <img className="h-full w-full" src='http://localhost:3000/images/bizcartlogo.png' alt="logo"/>
                    </div>

                   </div>
                    <form onSubmit={submit}>
                      
                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="email">Email</label>
                            <input  onChange={inputHandle} value={state.email} className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md'
                             type="email" name='email'placeholder='Email' 
                            id='email'required/>
                        </div>
                        
                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="password">Password</label>
                            <input onChange={inputHandle} value={state.password} className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md'
                             type="password" name='password'placeholder='Password' 
                            id='password'required/>
                        </div>
                        
                        <button disabled={loader ? true :false}  className='bg-slate-700 w-full hover:shadow-blue-400 hover:shadow-lg
                         text-white rounded-md px-6 py-2 mb-2 mt-2'>
                            {
                                loader ? <PropagateLoader color='#fff' cssOverride={overideStyle}/>: 'Login'
                            }
                  
                        </button>

                       
                      
                        

                    </form>
                </div>

            </div>
           
        </div>
    );
}

export default AdminLogin
