"use client";
import { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google'
import useReservationStore from '@/app/store/storeFetch'
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale'
import Link from 'next/link';

const quicksand = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

function ReservationList () {
  const { reservations, fetchReservations } = useReservationStore()

  useEffect(() => {
    fetchReservations()
  }, [])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(reservations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = reservations.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  // console.log(paginatedData);

  return (
    <div>
      <div className='shadow-lg rounded-lg w-full overflow-hidden'>
        <div className='w-full overflow-x-auto'>
          <table className='w-full whitespace-no-wrap'>
            <thead>
              <tr className='bg-gray-50 dark:bg-gray-800 dark:border-gray-700 border-b font-semibold text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wide'>
                <th className={`px-4 py-3 text-lg ${quicksand.className}`}>
                  Client
                </th>
                <th className={`px-4 py-3 text-lg ${quicksand.className}`}>
                  Amount
                </th>
                <th className={`px-4 py-3 text-lg ${quicksand.className}`}>
                  Auto
                </th>
                <th className={`px-4 py-3 text-lg ${quicksand.className}`}>
                  Status
                </th>
                <th className={`px-4 py-3 text-lg ${quicksand.className}`}>
                  Date
                </th>
              </tr>
            </thead>
            <tbody className='bg-white dark:bg-gray-800 divide-y dark:divide-gray-700'>
              {paginatedData.map(d => (
                <tr
                  key={d.id || index}
                  className='text-gray-700 dark:text-gray-400'
                >
                  <td className='px-4 py-3'>
                    <div className='flex items-center text-sm'>
                      {/* <!-- Avatar with inset shadow --> */}
                      <div className='hidden md:block relative mr-3 rounded-full w-8 h-8'>
                        <img
                          className='rounded-full w-full h-full object-cover'
                          src='https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                          alt=''
                          loading='lazy'
                        />
                        <div
                          className='absolute inset-0 shadow-inner rounded-full'
                          aria-hidden='true'
                        ></div>
                      </div>
                      <div>
                        <p className={` text-lg ${quicksand.className}`}>
                          {d.user.name}
                        </p>
                        <p
                          className={` text-gray-600 dark:text-gray-400 text-xs ${quicksand.className}`}
                        >
                          {d.user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={`px-4 py-3 text-sm ${quicksand.className}`}>
                    {d.final_price} <span className='text-bold'>DH</span>
                  </td>

                  <td className={`px-4 py-3 text-sm ${quicksand.className}`}>
                    {d.car.model}
                  </td>
                  <td className='px-4 py-3 text-xs'>
                    <span
                      className={`bg-green-100 ${quicksand.className} ${
                        d.state === 'confirmed'
                          ? 'dark:bg-green-700 text-green-700 dark:text-green-100'
                          : 'bg-orange-200 text-orange-500'
                      } px-2 py-1 rounded-full font-semibold   leading-tight`}
                    >
                      {d.state}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-sm ${quicksand.className}`}>
                    <span>{formatDistanceToNow(new Date(d.created_at), { addSuffix: true, locale: fr })}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='grid sm:grid-cols-2 bg-gray-50 dark:bg-gray-800 px-4 py-3 dark:border-gray-700 border-t font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide'>
          {/* <span className='flex items-center col-span-3'>
                    Showing 21-30 of 100
                  </span>
                  <span className='col-span-2'></span> */}
          {/* <!-- Pagination --> */}
          <span className='flex sm:justify-center col-span-4 mt-2 sm:mt-auto'>
            <nav aria-label='Table navigation'>
              <ul className='inline-flex items-center'>
                <li>
                  <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className={`${currentPage == 1 ? 'bg-gray-300' : 'bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-900'} flex justify-center items-center   dark:bg-gray-800 ml-2 px-4 border-0 dark:border-gray-700 rounded h-10 font-medium text-white dark:hover:text-white dark:text-gray-400 text-base`}
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
                {Array.from({ length: totalPages }).map((t, index) => {
                          return (
                            <li key={index} className='mx-1'>
                              <button
                                onClick={() => setCurrentPage(index+1)}
                                className={`flex justify-center items-center ${currentPage == index+1 ? 'bg-gray-700' : 'bg-gray-400'}  dark:hover:bg-gray-600 dark:bg-gray-800 px-4 border-0  dark:border-gray-700 rounded h-10 font-medium text-white dark:hover:text-white dark:text-gray-400 text-base`}
                              >
                                {index + 1}{' '}
                              </button>
                            </li>
                          )
                        })}
                <li>
                  <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className={`${currentPage == totalPages ? 'bg-gray-300' : 'bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-900'} flex justify-center items-center  dark:bg-gray-800 ml-2 px-4 border-0 dark:border-gray-700 rounded h-10 font-medium text-white dark:hover:text-white dark:text-gray-400 text-base`}
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
      </div>
    </div>
  )
}

export default ReservationList
