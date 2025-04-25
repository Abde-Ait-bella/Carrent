'use client'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { closeReservationForm } from '@/lib/features/reservationFormSlice'
import BookingFormWrapper from './BookingFormWrapper'

export default function BookingPage() {
  const dispatch = useAppDispatch()
  const { isOpen, selectedCarId } = useAppSelector(state => state.reservationForm)
  
  const handleClose = () => {
    dispatch(closeReservationForm())
  }
  
  return (
    <BookingFormWrapper 
      isOpen={isOpen} 
      carId={selectedCarId}
      onClose={handleClose}
    />
  )
}