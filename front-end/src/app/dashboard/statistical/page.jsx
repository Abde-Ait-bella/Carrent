'use client'
import { useEffect, useState } from 'react'
// import useReservationStore from '@/app/store/storeFetch'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../../../lib/hooks'
import { fetchReservations } from '../../../lib/features/reservationSlice'
import { fetchCars } from '../../../lib/features/carsSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import { Quicksand } from 'next/font/google'

const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '700'] })

function Statistical () {
  const displatch = useAppDispatch()

  useEffect(() => {
    displatch(fetchReservations())
    displatch(fetchCars())
  }, [])

  const { reservations } = useAppSelector(state => state.reservation)
  const { cars } = useAppSelector(state => state.cars)

  const uniqueReservations = reservations?.filter(
    (reser, index, self) =>
      index === self.findIndex(u => u.id === reser.user_id)
  )

  const carsAvailbl = cars?.filter(c => c.status === 'available')

  const activeReservation = reservations?.filter(r => r.state === 'confirmed')



  return (
    <div>


      {/* <!-- Cards --> */}
      <div className='gap-6 grid md:grid-cols-3 xl:grid-cols-3 mb-8'>
        {/* <!-- Card --> */}
        <Link href='/dashboard/clients'>
          <div className='flex items-center bg-white hover:bg-[#6083B7] dark:bg-gray-800 shadow-md p-4 rounded-lg text-gray-600 hover:text-white dark:text-gray-400 cursor-pointer'>
            <div className='bg-orange-100 dark:bg-orange-500 mr-4 p-3 rounded-full text-orange-500 dark:text-orange-100'>
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z'></path>
              </svg>
            </div>
            <div>
              <p className={`mb-2 font-bold  text-sm ${quicksand.className}`}>
                Total clients
              </p>
              <p className='font-semibold text-lg'>
                {uniqueReservations ? (
                  uniqueReservations.length
                ) : (
                  <div className='flex justify-center items-center bg-gray-100 py-1 rounded-md'>
                    <p className='text-gray-400 text-sm italic'>
                      Aucune donnée <FontAwesomeIcon icon={faExclamation} />
                    </p>
                  </div>
                )}
              </p>
            </div>
          </div>
        </Link>
        {/* <!-- Card --> */}
        <div className='flex items-center bg-white hover:bg-[#6083B7] dark:bg-gray-800 shadow-md p-4 rounded-lg text-gray-600 hover:text-white dark:text-gray-400 cursor-pointer'>
          <div className='bg-green-100 dark:bg-green-500 mr-4 p-3 rounded-full text-green-500 dark:text-green-100'>
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          <div>
            <p className={`mb-2 font-bold text-sm ${quicksand.className}`}>
              Voitures disponibles
            </p>
            <p className='font-semibold text-lg'>
              {carsAvailbl ? (
                carsAvailbl.length
              ) : (
                <div className='flex justify-center items-center bg-gray-100 py-1 rounded-md'>
                  <p className='text-gray-400 text-sm italic'>
                    Aucune donnée <FontAwesomeIcon icon={faExclamation} />
                  </p>
                </div>
              )}
            </p>
          </div>
        </div>
        {/* <!-- Card --> */}
        <div className='flex items-center bg-white hover:bg-[#6083B7] dark:bg-gray-800 shadow-md p-4 rounded-lg text-gray-600 hover:text-white dark:text-gray-400 cursor-pointer'>
          <div className='bg-teal-100 dark:bg-teal-500 mr-4 p-3 rounded-full text-teal-500 dark:text-teal-100'>
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          <div>
            <p className={`mb-2 font-bold text-sm ${quicksand.className}`}>
              Active Reservations
            </p>
            <p className='font-semibold text-lg'>
              {activeReservation ? (
                activeReservation.length
              ) : (
                <div className='flex justify-center items-center bg-gray-100 py-1 rounded-md'>
                  <p className='text-gray-400 text-sm italic'>
                    Aucune donnée <FontAwesomeIcon icon={faExclamation} />
                  </p>
                </div>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Statistical.getLayout = function getLayout (page) {
//   return <DashboardLayout>{page}</DashboardLayout>
// }

export default Statistical
