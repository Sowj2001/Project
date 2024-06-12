import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api/api';


export const admin_login=createAsyncThunk(
    'auth/admin_login',
    async(info,{rejectWithValue,fulfillWithValue})=>{
        console.log(info)
        try{
            const{data}=await api.post('/admin-login',info,
            {withCredentials:true})
            localStorage.setItem('accessToken',data.token)
            // console.log(data)
            return fulfillWithValue(data)

        } catch(error){
            // console.log(error.response.data)
             return rejectWithValue(error.response.data)

        }
    }
)
const authSlice = createSlice({
    name:'auth',
    initialState:{
        successMessage: '',
        errorMessage :'',
        loader :false,
        userInfo:''
    },
    reducers :{
        messageClear:(state,_)=>{
            state.errorMessage=""
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(admin_login.pending,(state,{payload})=>{
            state.loader=true;
        })
        .addCase(admin_login.rejected,(state,{payload})=>{
            state.loader=false;
            state.errorMessage=payload.error
        })
        .addCase(admin_login.fulfilled,(state,{payload})=>{
            state.loader=false;
            state.successMessage=payload.message
    })

}

})
export const authReducer=authSlice.reducer;
export const {messageClear}= authSlice.actions