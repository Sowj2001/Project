// // src/store/reducers/vendorsReducer.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../api/api';

// // Async thunk for fetching vendorProducts
// export const fetchVendorProducts = createAsyncThunk(
//     'vendors/fetchVendorProducts',
//     async (sellerId, { rejectWithValue }) => {
//         try {
//             const response = await api.get(`/api/products?sellerId=${sellerId}`);
//             return response.data;
//         } catch (error) {
//             console.error('API error:', error); // Log the error for debugging
//             return rejectWithValue(error.response?.data || 'Unknown error occurred');
//         }
//     }
// );

// // Vendor slice
// const vendorsSlice = createSlice({
//     name: 'vendors',
//     initialState: {
//         vendorproducts: [],
//         loading: false,
//         error: null,
//     },
//     reducers: {
//         clearVendorMessages: (state) => {
//             state.error = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//         .addCase(fetchVendorProducts.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         })
//         .addCase(fetchVendorProducts.fulfilled, (state, { payload }) => {
//             state.loading = false;
//             state.vendorproducts = payload;
//         })
//         .addCase(fetchVendorProducts.rejected, (state, { payload }) => {
//             state.loading = false;
//             state.error = payload;
//         });
//     },
// });

// export const { clearVendorMessages } = vendorsSlice.actions;
// export default vendorsSlice.reducer;
