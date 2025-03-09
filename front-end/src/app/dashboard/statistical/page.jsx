'use client'
import { useEffect } from 'react'
import useReservationStore from '@/app/store/storeFetch'
import { Quicksand } from 'next/font/google'
import Link from 'next/link'

const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '700'] })

function Statistical () {

  const { reservations, cars, fetchReservations, fetchCars } = useReservationStore()

  useEffect(() => {
    fetchReservations()
    fetchCars()
  }, [])
  
  console.log(reservations);
  

  const uniqueReservations = reservations?.filter(
    (reser, index, self) =>
      index === self.findIndex(u => u.id === reser.user_id)
  )

  const carsAvailbl = cars?.filter((c) => c.status === 'available')

  const activeReservation = reservations?.filter((r) => r.state === 'confirmed')

  return (
    <div>
      {/* <!-- Cards --> */}
      <div className='gap-6 grid md:grid-cols-3 xl:grid-cols-3 mb-8'>
        {/* <!-- Card --> */}
        <Link href="/dashboard/clients">
        <div className='flex items-center bg-white hover:bg-[#6083B7] dark:bg-gray-800 shadow-md p-4 rounded-lg text-gray-600 hover:text-white dark:text-gray-400 cursor-pointer'>
          <div className='bg-orange-100 dark:bg-orange-500 mr-4 p-3 rounded-full text-orange-500 dark:text-orange-100'>
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z'></path>
            </svg>
          </div>
          <div>
            <p
              className={`mb-2 font-bold  text-sm ${quicksand.className}`}
            >
              Total clients
            </p>
            <p className='font-semibold text-lg'>
              {uniqueReservations.length}
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
            <p
              className={`mb-2 font-bold text-sm ${quicksand.className}`}
            >
              Voitures disponibles
            </p>
            <p className='font-semibold text-lg'>
              {carsAvailbl.length}
            </p>
          </div>
        </div>
        {/* <!-- Card --> */}
        {/* <div className='flex items-center bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg'>
          <div className='bg-blue-100 dark:bg-blue-500 mr-4 p-3 rounded-full text-blue-500 dark:text-blue-100'>
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'></path>
            </svg>
          </div>
          <div>
            <p
              className={`mb-2 font-bold text-gray-600 dark:text-gray-400 text-sm ${quicksand.className}`}
            >
              Total de réservations
            </p>
            <p className='font-semibold text-gray-700 dark:text-gray-200 text-lg'>
              {reservations.length}
            </p>
          </div>
        </div> */}
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
            <p
              className={`mb-2 font-bold text-sm ${quicksand.className}`}
            >
              Active Reservations
            </p>
            <p className='font-semibold text-lg'>
              {activeReservation.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

Statistical.getLayout = function getLayout (page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Statistical
