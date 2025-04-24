import { create } from 'zustand'
import  api  from '../Api/axios'

const useReservationStore = create(set => ({
  reservations: [],
  cars: [],
  loadingCars: [],
  loadingReservation: [],

  fetchReservations: async () => {
    try {
      const res = await api.get('/reservations')
      const data = await res.data
      set({ reservations: data })
    } catch (error) {
      console.error('Erreur de chargement des réservations', error)
    }
    
  },

  fetchCars: async () => {
    set({ loadingCars: true })
    try {
      const res = await api.get('/cars')
      const data = await res.data
      set({ cars: data, loadingCars: false })
    } catch (error) {
      set({ error, loadingCars: false })
    }
  }
}))

export default useReservationStore
