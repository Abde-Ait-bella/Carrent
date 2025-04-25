import api from '@/app/Api/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Reservation {
  id?: number
  user_id: number
  car_id: number
  rental_start: Date | string
  rental_end: Date | string
  daily_rate: string | number
  final_price: string | number
  state: string
}

export const createReservation = createAsyncThunk(
  'reservationForm/createReservation',
  async (reservationData: any) => {
    // Convert dates to ISO strings for API
    const dataToSend = {
      ...reservationData,
      rental_start: new Date(reservationData.rental_start).toISOString().split('T')[0],
      rental_end: new Date(reservationData.rental_end).toISOString().split('T')[0],
    };

    try {
      const response = await api.post('/reservations', dataToSend);
      return response.data;
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  }
)

const reservationFormSlice = createSlice({
  name: 'reservationForm',
  initialState: {
    isOpen: false,
    selectedCarId: null as number | null,
    status: 'idle',
    error: null as string | null
  },
  reducers: {
    openReservationForm: (state, action) => {
      state.isOpen = true;
      state.selectedCarId = action.payload;
      state.status = 'idle';
      state.error = null;
    },
    closeReservationForm: (state) => {
      state.isOpen = false;
      state.selectedCarId = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createReservation.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error occurred';
      });
  },
});

export const { openReservationForm, closeReservationForm } = reservationFormSlice.actions;
export default reservationFormSlice.reducer;