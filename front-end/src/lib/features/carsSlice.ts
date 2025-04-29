'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/app/Api/axios'

// 🔄 Action asynchrone pour récupérer les posts
export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
  const response = await api.get('/cars')
  const cars = await response.data.map((car: any) => ({
    ...car,
    quantity: Number(car.quantity),
    price_per_day: Number(car.price_per_day),
  }))
  return cars // Axios renvoie déjà `response.data`
})

export const addCar = createAsyncThunk('cars/addCar', async (newCar: any) => {
  let formData = new FormData();

  Object.keys(newCar).forEach((key) => {
    formData.append(key, newCar[key]);
  });

  const response = await api.post('/cars', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
})

export const updateCar = createAsyncThunk('cars/updateCar', async ({ newCar, id }: { newCar: any; id: number }) => {

  let formData = new FormData();

  Object.keys(newCar).forEach((key) => {
    formData.append(key, newCar[key]);
  });

  const response = await api.post(`/cars/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
});

export const deleteCar = createAsyncThunk('cars/deleteCar', async (id: any) => {
  const response = await api.delete('/cars/' + id);
  return response.data
})

// Add this to your carsSlice.ts file
export const fetchCarById = createAsyncThunk(
  'cars/fetchCarById',
  async (id: string | number) => {    
    const response = await api.get(`/cars/${id}`);
    return await response.data.data;
  }
);

export interface Car {
  id: number;
  brand: string;
  model: string;
  registration_number: string;
  year: number;
  color: string;
  engine: string;
  image: string;
  quantity: number;
  mileage: number;
  resduce: number;
  stars: number;
  price_per_day: number;
  status: string;
  description: string;
  currentCar: Car | null; // Ajout de currentCar ici
  loading: boolean; // Ajout de loading ici
  error: string | null; // Ajout de error ici
}


interface CarsState {
  cars: Car[]
  error: string | null
  currentCar: Car | null; // Ajout de currentCar ici
  loading: boolean; // Ajout de loading ici
}

const initialState: CarsState = {
  cars: [],
  error: null,
  currentCar: null, // Initialisation de currentCar
  loading: false, // Initialisation de loading
}

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {}, // Pas d'actions synchrones ici
  extraReducers: builder => {
    builder
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload
      })

      .addCase(addCar.fulfilled, (state, action) => {
        state.cars.push(action.payload) // Ajouter la nouvelle voiture à l'état
      })

      .addCase(updateCar.fulfilled, (state, action) => {
        // Vérifier si action.payload existe et contient les données attendues
        if (action.payload && action.payload.id) {
          const index = state.cars.findIndex(car => car.id === action.payload.id)
          // S'assurer que l'index est valide avant de mettre à jour
          if (index !== -1) {
            state.cars[index] = action.payload
          } else {
            // Si la voiture n'existe pas déjà, l'ajouter
            state.cars.push(action.payload)
          }
        }
      })

      .addCase(deleteCar.fulfilled, (state, action) => {
        state.cars = state.cars.filter(car => car.id !== action.meta.arg) // Supprimer la voiture par ID
      })

      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.currentCar = action.payload;
        state.loading = false;
      })
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
})

// 🔹 Exporter le reducer pour l'intégrer au store
export default carsSlice.reducer
