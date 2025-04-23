import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import api from '@/app/Api/axios';

export const fetchPaiments = createAsyncThunk('paiment/fetchPaiments', async () => {
  const response = await api.get('/payments');
  return response.data;
});

const  paimentSlice = createSlice({
  name: 'paiment',      
    initialState: {
        paiments: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchPaiments.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.paiments = action.payload;
        });
    },
});

export default paimentSlice.reducer;