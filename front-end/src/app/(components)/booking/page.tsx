'use client'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { closereservation } from '@/lib/features/reservationSlice'
import BookingFormWrapper from './BookingFormWrapper'

export default function BookingPage() {
  const dispatch = useAppDispatch()
  const { isFormOpen, selectedCarId } = useAppSelector(state => state.reservation)
  
  const handleClose = () => {
    dispatch(closereservation())
  }
  
  return (
    <BookingFormWrapper 
      isOpen={isFormOpen} 
      carId={selectedCarId}
      onClose={handleClose}
    />
  )
}