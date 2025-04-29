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
  'reservation/createReservation',
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

// Ajouter cette nouvelle action async thunk
export const fetchUserReservations = createAsyncThunk(
  'reservation/fetchUserReservations',
  async () => {
    try {
      const response = await api.get('/reservations');
      return response.data;
    } catch (error) {
      console.error('Error fetching user reservations:', error);
      throw error;
    }
  }
)

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    isOpen: false,
    selectedCarId: null as number | null,
    status: 'idle',
    error: null as string | null,
    // Ajouter ces nouvelles propriétés pour les réservations d'utilisateur
    userReservations: [] as Reservation[],
    userReservationsStatus: 'idle',
    userReservationsError: null as string | null
  },
  reducers: {
    openreservation: (state, action) => {
      state.isOpen = true;
      state.selectedCarId = action.payload;
      state.status = 'idle';
      state.error = null;
    },
    closereservation: (state) => {
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
      })
      // Ajouter ces gestionnaires pour l'action fetchUserReservations
      .addCase(fetchUserReservations.pending, (state) => {
        state.userReservationsStatus = 'loading';
        state.userReservationsError = null;
      })
      .addCase(fetchUserReservations.fulfilled, (state, action) => {
        state.userReservationsStatus = 'succeeded';
        state.userReservations = action.payload;
      })
      .addCase(fetchUserReservations.rejected, (state, action) => {
        state.userReservationsStatus = 'failed';
        state.userReservationsError = action.error.message || 'Unknown error occurred';
      });
  },
});

export const { openreservation, closereservation } = reservationSlice.actions;
export default reservationSlice.reducer;