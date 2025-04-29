import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import carsSlice from './features/carsSlice'
import reservationSlice from './features/reservationSlice'
import paimentSlice from './features/paimentSlice'
import citiesSlice from './features/citiesSlice'
import userSlice from './features/userSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        counter: counterReducer, 
        cars: carsSlice,
        reservation: reservationSlice,  // Ce reducer contient maintenant tout
        paiment: paimentSlice,
        cities : citiesSlice,
        user: userSlice
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']