import api from '@/app/Api/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Reservation {
  id: number;
  contract_url?: string; 
  contract_confirmation?: any;
  [key: string]: any;
}

export const fetchReservations = createAsyncThunk(
  'reservation/fetchreservation',
  async () => {
    try {
      const response = await api.get('/reservations');
      let reservations = response.data;
      
      // Récupérer les confirmations de réservation (contrats)
      const contractsResponse = await api.get('/reservation-confirmations');
      const confirmations = contractsResponse.data || [];
      
      // Associer chaque confirmation à sa réservation correspondante
      reservations = reservations.map((reservation: Reservation) => {
        const confirmation = confirmations.find((c: any) => c.reservation_id === reservation.id);
        
        return {
          ...reservation,
          contract_confirmation: confirmation || null,
          contract_url: confirmation.contract_path ? `/storage/${confirmation.contract_path}` : null,
          has_contract: !!confirmation
        };
      });
      
      return reservations;
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
      
      // Si l'API de confirmations échoue, essayer de continuer avec les données de base
      try {
        const fallbackResponse = await api.get('/reservations');
        return fallbackResponse.data;
      } catch (e) {
        throw error;
      }
    }
  }
)

export const updateStatus = createAsyncThunk(
  'reservation/updateStatus',
  async ({ data, id }: { data: any; id: number }) => {

    const response = await api.put(`/reservations/${id}`, data);

    return response.data;
  })

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
