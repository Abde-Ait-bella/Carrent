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
}


interface CarsState {
  cars: Car[]
  error: string | null
}

const initialState: CarsState = {
  cars: [],
  error: null
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
        state.cars.push(action.payload) // Ajouter la nouvelle voiture à l'ét
      })

      .addCase(updateCar.fulfilled, (state, action) => {
        const index = state.cars.findIndex(car => car.id === action.payload.id)
        if (index !== -1) {
          state.cars[index] = action.payload // Mettre à jour la voiture existante
        }
      })

      .addCase(deleteCar.fulfilled, (state, action) => {
        state.cars = state.cars.filter(car => car.id !== action.meta.arg) // Supprimer la voiture par ID
      })
  }
})

// 🔹 Exporter le reducer pour l'intégrer au store
export default carsSlice.reducer
