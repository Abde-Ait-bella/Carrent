import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import carsSlice from './features/carsSlice'
import reservationSlice from './features/reservationSlice'
import paimentSlice from './features/paimentSlice'
import citiesSlice from './features/citiesSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        counter: counterReducer, 
        cars: carsSlice,
        reservation: reservationSlice,
        paiment: paimentSlice,
        cities : citiesSlice
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']