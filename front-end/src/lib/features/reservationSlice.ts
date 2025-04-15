import api from '@/app/Api/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Reservation {
  id: number;
  [key: string]: any; // Add other properties as needed
}

export const fetchReservations = createAsyncThunk(
  'reservation/fetchreservation',
  async () => {
    const response = await api.get('/reservations')
    return await response.data
  }
)

export const updateStatus = createAsyncThunk(
  'reservation/updateStatus',
  async ({ data, id }: { data: any; id: number }) => {
    console.log(data, id);
    
    const response = await api.put(`/reservations/${id}`, data);
    
    return response.data;
  })

const reservationSlace = createSlice({
  name: 'reservation',
  initialState: {
    reservations: [] as Reservation[],
    status: 'idle',
    error: null
  },

  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(fetchReservations.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.reservations = action.payload
    })

    .addCase(updateStatus.fulfilled, (state, action) => {
            const index = state.reservations.findIndex(res => res.id === action.payload.id)
            if (index !== -1) {
              state.reservations[index] = action.payload 
            }
          })

  }
})

export default reservationSlace.reducer
