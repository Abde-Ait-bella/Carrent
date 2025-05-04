'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../../../lib/hooks'
import { fetchReservations } from '../../../lib/features/reservationSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faExclamation, faCalendarAlt, faCar, faMoneyBillWave, faUser, faClock } from '@fortawesome/free-solid-svg-icons'
import { Quicksand, Poppins } from 'next/font/google'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import * as Tooltip from '@radix-ui/react-tooltip'

const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '700'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

function ActiveReservations() {
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  
  useEffect(() => {
    dispatch(fetchReservations())
  }, [])
  
  const { reservations, loading } = useAppSelector(state => state.reservation)
  const activeReservations = reservations?.filter(r => r.state === 'confirmed')
  
  const totalPages = Math.ceil((activeReservations?.length || 0) / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = activeReservations?.slice(
    startIndex,
    startIndex + itemsPerPage
  ) || []

  // Fonction pour calculer le coût total de la réservation
  const calculateTotalCost = (reservation) => {
    if (!reservation?.daily_rate || !reservation.rental_start || !reservation.rental_end) return 0;
    
    const startDate = new Date(reservation.rental_start);
    const endDate = new Date(reservation.rental_end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays * parseFloat(reservation.daily_rate);
  }
  
  // Fonction pour formater la durée de réservation
  const formatReservationDuration = (reservation) => {
    if (!reservation.rental_start || !reservation.rental_end) return "Durée inconnue";
    
    const startDate = new Date(reservation.rental_start);
    const endDate = new Date(reservation.rental_end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays === 1 ? "1 jour" : `${diffDays} jours`;
  }
  
  return (
    <div className="shadow-lg rounded-lg w-full overflow-hidden">
      <div className="flex items-center mb-6 p-4">
        <Link href="/dashboard/statistical">
          <span className="flex items-center text-gray-600 hover:text-[#6083B7]">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            <span className={`${poppins.className} font-bold`}>Retour au tableau de bord</span>
          </span>
        </Link>
        <h1 className={`text-xl font-bold ml-4 ${poppins.className}`}>Réservations Actives</h1>
      </div>
      
      <div className='w-full overflow-x-auto'>
        <table className='w-full whitespace-no-wrap'>
          <thead>
            <tr className='bg-gray-50 dark:bg-gray-800 dark:border-gray-700 border-b font-semibold text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wide'>
              <th className={`px-4 py-3 text-lg ${quicksand.className}`}>
                Client
              </th>
              <th className={`px-4 py-3 text-lg ${quicksand.className}`}>
                Voiture
              </th>
              <th className={`px-4 py-3 text-lg ${quicksand.className}`}>
                Date début
              </th>
              <th className={`px-4 py-3 text-lg ${quicksand.className}`}>
                Date fin
              </th>
              <th className={`px-4 py-3 text-lg ${quicksand.className}`}>
                État
              </th>
              <th className={`px-4 py-3 text-lg ${quicksand.className}`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white dark:bg-gray-800 divide-y dark:divide-gray-700'>
            {!loading && paginatedData.length > 0 ? (
              paginatedData.map(reservation => (
                <tr
                  key={reservation.id}
                  className='text-gray-700 dark:text-gray-400'
                >
                  <td className='px-4 py-3'>
                    <div className='flex items-center text-sm'>
                      <div className='hidden md:block relative mr-3 rounded-full w-8 h-8'>
                        <img
                          className='rounded-full w-full h-full object-cover'
                          src='https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                          alt='User avatar'
                          loading='lazy'
                        />
                        <div
                          className='absolute inset-0 shadow-inner rounded-full'
                          aria-hidden='true'
                        ></div>
                      </div>
                      <div>
                        <p className={`text-lg ${quicksand.className}`}>
                          {reservation.user?.name || "Client"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={`px-4 py-3 text-sm ${quicksand.className}`}>
                    {reservation.car?.brand} {reservation.car?.model}
                  </td>
                  <td className={`px-4 py-3 text-sm ${quicksand.className}`}>
                    {new Date(reservation.rental_start).toLocaleDateString('fr-FR')}
                  </td>
                  <td className={`px-4 py-3 text-sm ${quicksand.className}`}>
                    {new Date(reservation.rental_end).toLocaleDateString('fr-FR')}
                  </td>
                  <td className={`px-4 py-3 text-sm ${quicksand.className}`}>
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                      Confirmée
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-sm ${quicksand.className}`}>
                    <Tooltip.Provider>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <button className="group group-hover:from-[#1F4068] group-hover:to-[#6083B7] inline-flex relative justify-center items-center bg-gradient-to-br from-[#2C5A96] to-[#6083B7] p-0.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-[#0E2540] font-medium text-gray-900  dark:text-white text-sm">
                            <span className={`relative ${quicksand.className} bg-white dark:bg-[#0E2540] group-hover:bg-opacity-0 px-5 py-1.5 rounded-md transition-all duration-75 ease-in`}>
                              Détails
                            </span>
                          </button>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            className="shadow-lg rounded-lg text-sm z-50"
                            side="right"
                            align="center"
                            sideOffset={5}
                          >
                            <div className="bg-white shadow-xl rounded-lg max-w-md w-96 text-gray-900">
                              <div className="rounded-t-lg h-32 overflow-hidden relative">
                                {reservation.car?.image !== 'undefined' ? (
                                  <img
                                    className="w-full h-full object-cover"
                                    // src={ reservation.car.image}
                                    src={`${process.env.NEXT_PUBLIC_API_URL_SAP}/storage/${reservation.car.image}`}
                                    alt={`${reservation.car.brand}${reservation.car.model}`}
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faCar} className="text-white text-4xl" />
                                  </div>
                                )}
                                {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}
                              </div>

                              <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-1 flex items-center">
                                  <FontAwesomeIcon icon={faCar} className="text-[#6083B7] mr-2" />
                                  <span>
                                    {reservation.car?.brand} {reservation.car?.model} ({reservation.car?.year})
                                  </span>
                                </div>
                                
                                <div className="border-t border-gray-200 my-2"></div>
                                
                                <div className="grid grid-cols-1 gap-3 mt-4">
                                  <div className="flex items-start">
                                    <FontAwesomeIcon icon={faUser} className="text-[#6083B7] mt-1 mr-3" />
                                    <div>
                                      <p className="text-sm text-gray-500">Client</p>
                                      <p className="font-medium">{reservation.user?.name || "Client"}</p>
                                      <p className="text-sm text-gray-600">{reservation.user?.email || ""}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-start">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="text-[#6083B7] mt-1 mr-3" />
                                    <div>
                                      <p className="text-sm text-gray-500">Période de réservation</p>
                                      <p className="font-medium">
                                        Du {new Date(reservation.rental_start).toLocaleDateString('fr-FR')} au {new Date(reservation.rental_end).toLocaleDateString('fr-FR')}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-start">
                                    <FontAwesomeIcon icon={faClock} className="text-[#6083B7] mt-1 mr-3" />
                                    <div>
                                      <p className="text-sm text-gray-500">Durée</p>
                                      <p className="font-medium">{formatReservationDuration(reservation)}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-start">
                                    <FontAwesomeIcon icon={faMoneyBillWave} className="text-[#6083B7] mt-1 mr-3" />
                                    <div>
                                      <p className="text-sm text-gray-500">Coût de la réservation</p>
                                      <p className="font-bold text-lg">{calculateTotalCost(reservation)} DH</p>
                                      <p className="text-xs text-gray-500">
                                        ({reservation.daily_rate} DH/jour × {formatReservationDuration(reservation)})
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="px-6 py-3 bg-gray-50 rounded-b-lg flex justify-between">
                                <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full flex items-center">
                                  <span className="w-2 h-2 bg-green-600 rounded-full mr-1"></span>
                                  Réservation confirmée
                                </span>
                                <span className="text-xs text-gray-500">
                                  Réservé {formatDistanceToNow(new Date(reservation.created_at), { addSuffix: true, locale: fr })}
                                </span>
                              </div>
                            </div>
                            <Tooltip.Arrow className="fill-white" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </Tooltip.Provider>
                  </td>
                </tr>
              ))
            ) : loading ? (
              <tr className='text-gray-700 dark:text-gray-400'>
                <td colSpan="6" className='px-4 py-10 text-center'>
                  <div className='flex flex-col items-center justify-center'>
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6083B7]"></div>
                    <p className={`text-gray-500 text-lg mt-4 ${quicksand.className}`}>
                      Chargement...
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              <tr className='text-gray-700 dark:text-gray-400'>
                <td colSpan="6" className='px-4 py-10 text-center'>
                  <div className='flex flex-col items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <p className={`text-gray-500 text-lg italic ${quicksand.className}`}>
                      Aucune réservation active
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination - seulement visible s'il y a des données */}
      {paginatedData.length > 0 ? (
        <div className='grid sm:grid-cols-2 bg-gray-50 dark:bg-gray-800 px-4 py-3 dark:border-gray-700 border-t font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide'>
          <span className='flex sm:justify-center col-span-4 mt-2 sm:mt-auto'>
            <nav aria-label='Table navigation'>
              <ul className='inline-flex items-center'>
                <li>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    className={`${
                      currentPage == 1
                        ? 'bg-gray-300'
                        : 'bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-900'
                    } flex justify-center items-center dark:bg-gray-800 ml-2 px-4 border-0 dark:border-gray-700 rounded h-10 font-medium text-white dark: dark:text-gray-400 text-base`}
                  >
                    <svg
                      className='me-2 w-3.5 h-3.5 rtl:rotate-180'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 14 10'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M13 5H1m0 0 4 4M1 5l4-4'
                      />
                    </svg>
                    Prev
                  </button>
                </li>
                {Array.from({ length: totalPages }).map((t, index) => (
                  <li key={index} className='mx-1'>
                    <button
                      onClick={() => setCurrentPage(index + 1)}
                      className={`flex justify-center items-center ${
                        currentPage == index + 1 ? 'bg-gray-700' : 'bg-gray-400'
                      } dark:hover:bg-gray-600 dark:bg-gray-800 px-4 border-0 dark:border-gray-700 rounded h-10 font-medium text-white dark: dark:text-gray-400 text-base`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                    className={`${
                      currentPage == totalPages
                        ? 'bg-gray-300'
                        : 'bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-900'
                    } flex justify-center items-center dark:bg-gray-800 px-4 border-0 dark:border-gray-700 rounded h-10 font-medium text-white dark: dark:text-gray-400 text-base`}
                  >
                    Next
                    <svg
                      className='ms-2 w-3.5 h-3.5 rtl:rotate-180'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 14 10'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M1 5h12m0 0L9 1m4 4L9 9'
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </span>
        </div>
      ) : null}
    </div>
  )
}

export default ActiveReservations