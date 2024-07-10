import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Async thunk for fetching vendors
export const fetchVendors = createAsyncThunk(
    'vendors/fetchVendors',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await api.get('/api/products');
            const vendors = response.data.reduce((acc, product) => {
                const { sellerId, shopName } = product;
                if (!acc.some(vendor => vendor.sellerId === sellerId)) {
                    acc.push({ sellerId, shopName });
                }
                return acc;
            }, []);
            return fulfillWithValue(vendors);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Vendor slice
const vendorsSlice = createSlice({
    name: 'vendors',
    initialState: {
        vendors: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearVendorMessages: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVendors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVendors.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.vendors = payload;
            })
            .addCase(fetchVendors.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export const { clearVendorMessages } = vendorsSlice.actions;
export default vendorsSlice.reducer;
