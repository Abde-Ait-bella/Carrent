'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../../../lib/hooks'
import { fetchCars } from '../../../lib/features/carsSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faExclamation } from '@fortawesome/free-solid-svg-icons'
import { Quicksand } from 'next/font/google'

const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '700'] })

function AvailableCars() {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(fetchCars())
  }, [])
  
  const { cars, loading } = useAppSelector(state => state.cars)
  const availableCars = cars?.filter(car => car.status === 'available')
  
return (
    <div className="p-6 bg-gray-50">
        <div className="flex items-center mb-8">
            <Link href="/dashboard/statistical">
                <span className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    <span className={`${quicksand.className} font-bold`}>Retour au tableau de bord</span>
                </span>
            </Link>
        </div>
        
        <h1 className={`text-3xl font-bold mb-8 text-gray-800 ${quicksand.className}`}>Voitures Disponibles</h1>
        
        {loading ? (
            <div className="flex justify-center py-12">
                <div className="animate-pulse text-blue-600">Chargement...</div>
            </div>
        ) : availableCars && availableCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {availableCars.map(car => (
                    <div key={car.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        {car.image && (
                            <div className="h-56 overflow-hidden">
                                <img 
                                    src={car.image} 
                                    alt={car.brand + ' ' + car.model} 
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    loading="lazy"
                                />
                            </div>
                        )}
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800">{car.brand} {car.model}</h2>
                            <p className="text-gray-500 mb-3">{car.year}</p>
                            <div className="flex justify-between items-center mt-5">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                    Disponible
                                </span>
                                <span className="font-bold text-lg text-blue-600">{car.price} DH/jour</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="bg-white rounded-xl p-10 text-center shadow-md border border-gray-100">
                <p className="text-gray-600 text-lg">
                    Aucune voiture disponible <FontAwesomeIcon icon={faExclamation} className="ml-2 text-amber-500" />
                </p>
            </div>
        )}
    </div>
)
}

export default AvailableCars