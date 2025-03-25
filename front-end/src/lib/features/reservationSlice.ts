import api from '@/app/Api/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchReservations = createAsyncThunk(
  'reservation/fetchreservation',
  async () => {
    const response = await api.get('/reservations')
    return await response.data 
  }
)

const reservationSlace = createSlice({
  name: 'reservation',
  initialState: {
    reservations: [],
    status: 'idle',
    error: null
  },

  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchReservations.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.reservations = action.payload
    })
  }
})

export default reservationSlace.reducer
