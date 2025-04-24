import api from '@/app/Api/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Cities {
  id: number
  name: string
  [key: string]: any // Add other properties as needed
}

export const fetchcities = createAsyncThunk(
  'cities/fetchcities',
  async () => {
    const response = await api.get('/cities')
    return await response.data
  }
)

const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    cities: [] as Cities[],
    status: 'idle',
    error: null
  },

  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(fetchcities.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.cities = action.payload
    })

  }
})

export default citiesSlice.reducer
