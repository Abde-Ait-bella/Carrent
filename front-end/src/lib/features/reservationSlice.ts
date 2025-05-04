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
  total_price?: string | number
  state: string
  car?: {
    id: number
    brand: string
    model: string
    year: number
    image?: string
  }
  contract_url?: string
  contract_confirmation?: any
}

// Actions de reservationSlice
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

export const fetchReservations = createAsyncThunk(
  'reservation/fetchreservation',
  async () => {
    try {
      const response = await api.get('/reservations');
      let reservations = response.data;
      
      try {
        const contractsResponse = await api.get('/reservation-confirmations');
        const confirmations = contractsResponse.data || [];
        
        reservations = reservations.map((reservation: Reservation) => {
          const confirmation = confirmations.find((c: any) => c.reservation_id === reservation.id);
          
          return {
            ...reservation,
            contract_confirmation: confirmation || null,
            contract_url: confirmation?.contract_path ? `/storage/${confirmation.contract_path}` : null,
            has_contract: !!confirmation
          };
        });
      } catch (e) {
        console.error("Erreur lors de la récupération des confirmations de réservation:", e);}
      
      return reservations;
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
      throw error;
    }
  }
)

export const updateStatus = createAsyncThunk(
  'reservation/updateStatus',
  async ({ data, id }: { data: any; id: number }) => {
    const response = await api.put(`/reservations/${id}`, data);
    return response.data;
  }
)

export const addContract = createAsyncThunk(
  'reservation/addContract',
  async (data: any ) => {
    const response = await api.post('/addContract', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
)

export const uploadContract = createAsyncThunk(
  'reservation/uploadContract',
  async (data: any) => {
    const response = await api.post('/uploadContract', data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  }
)

// Action partagée entre les deux slices
export const fetchUserReservations = createAsyncThunk(
  'reservation/fetchUserReservations',
  async () => {
    try {
      const response = await api.get('/user-reservations');
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
    // État de reservationSlice
    reservations: [] as Reservation[],
    userReservations: [] as Reservation[],
    status: 'idle',
    error: null,
    
    // État de reservationSlice
    isFormOpen: false,
    selectedCarId: null as number | null,
    formStatus: 'idle',
    formError: null as string | null,
    userReservationsStatus: 'idle',
    userReservationsError: null as string | null
  },

  reducers: {
    // Reducers de reservationSlice
    openreservation: (state, action) => {
      state.isFormOpen = true;
      state.selectedCarId = action.payload;
      state.formStatus = 'idle';
      state.formError = null;
    },
    closereservation: (state) => {
      state.isFormOpen = false;
      state.selectedCarId = null;
      state.formStatus = 'idle';
      state.formError = null;
    },
  },
  
  extraReducers: builder => {
    builder
      // Reducers de reservationSlice
      .addCase(createReservation.pending, (state) => {
        state.formStatus = 'loading';
      })
      .addCase(createReservation.fulfilled, (state) => {
        state.formStatus = 'succeeded';
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.formStatus = 'failed';
        state.formError = action.error.message || 'Unknown error occurred';
      })
      
      // Reducers de reservationSlice
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reservations = action.payload;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        const index = state.reservations.findIndex(res => res.id === action.payload.id);
        if (index !== -1) {
          state.reservations[index] = action.payload;
        }
        
        // Mettre à jour dans userReservations si existant
        const userIndex = state.userReservations.findIndex(res => res.id === action.payload.id);
        if (userIndex !== -1) {
          state.userReservations[userIndex] = action.payload;
        }
      })
      
      // Reducers partagés
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
  }
});

export const { openreservation, closereservation } = reservationSlice.actions;
export default reservationSlice.reducer;
