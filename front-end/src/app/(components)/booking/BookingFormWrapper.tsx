'use client'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import BookingForm from './BookingForm'
import { fetchCars } from '@/lib/features/carsSlice'

interface BookingFormWrapperProps {
  isOpen: boolean
  carId: number | null
  onClose: () => void
}

const BookingFormWrapper: React.FC<BookingFormWrapperProps> = ({
  isOpen,
  carId,
  onClose
}) => {
  const dispatch = useAppDispatch()
  const { cars } = useAppSelector(state => state.cars)
  const [selectedCar, setSelectedCar] = useState<any>(null)

  useEffect(() => {
    if (carId && (!cars || cars.length === 0)) {
      dispatch(fetchCars())
    }
  }, [carId, cars, dispatch])

  useEffect(() => {
    if (carId && cars && cars.length > 0) {
      const car = cars.find(c => c.id === carId)
      setSelectedCar(car)
    } else {
      setSelectedCar(null)
    }
  }, [carId, cars])

  return (
    <BookingForm 
      isOpen={isOpen}
      carId={carId}
      car={selectedCar}
      onClose={onClose}
    />
  )
}

export default BookingFormWrapper