'use client'
import { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google'
import useReservationStore from '@/app/store/storeFetch'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import * as Tooltip from '@radix-ui/react-tooltip'
// import cancledSVG from '../../asset²s/img/pending.svg'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

function page () {
  const { reservations, fetchReservations } = useReservationStore()

  useEffect(() => {
    fetchReservations()
  }, [])

  const uniqueReservations = reservations.filter(
    (reser, index, self) =>
      index === self.findIndex(u => u.id === reser.user_id)
  )

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(uniqueReservations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = uniqueReservations.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const lengthreser = reservations.map(r => {
    reservations.find(res => res.user.id == r.user.id)
  })

  console.log(
    reservations.map(r => {
      reservations.find(res => res.user.id == r.user.id)
    }).length
  )

  return (
    <div className='shadow-lg rounded-lg w-full overflow-hidden'>
      <div className='w-full overflow-x-auto'>
        <table className='w-full whitespace-no-wrap'>
          <thead>
            <tr className='bg-gray-50 dark:bg-gray-800 dark:border-gray-700 border-b font-semibold text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wide'>
              <th className={`px-4 py-3 text-lg ${poppins.className}`}>
                Client
              </th>
              <th className={`px-4 py-3 text-lg ${poppins.className}`}>
                Inscrit depuis
              </th>
              <th className={`px-4 py-3 text-lg ${poppins.className}`}>
                Réservations
              </th>
              <th className={`px-4 py-3 text-lg ${poppins.className}`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white dark:bg-gray-800 divide-y dark:divide-gray-700'>
            {paginatedData.length > 0 ? (
              paginatedData.map(d => (
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
                        <p className={` text-lg ${poppins.className}`}>
                          {d.user.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={`px-4 py-3 text-sm ${poppins.className}`}>
                    <span>
                      {formatDistanceToNow(new Date(d.created_at), {
                        addSuffix: true,
                        locale: fr
                      })}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-sm ${poppins.className}`}>
                    {lengthreser.length}{' '}
                    <span className='text-bold'>
                      Reservation
                      {lengthreser.length > 1 ? 's' : ''}
                    </span>
                  </td>

                  <td>
                    {/* Tooltip spécifique pour chaque utilisateur */}
                    <Tooltip.Provider>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <div>
                            <button class={`group ${poppins.className} group group-hover:from-[#1F4068] group-hover:to-[#6083B7] inline-flex relative justify-center items-center bg-gradient-to-br from-[#2C5A96] to-[#6083B7] mr-2 p-0.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-[#0E2540] font-medium text-gray-900 hover:text-white dark:text-white text-sm`}>
                              <span class={`relative ${poppins.className} bg-white dark:bg-[#0E2540] group-hover:bg-opacity-0 px-5 py-1.5 rounded-md transition-all duration-75 ease-in`}>
                              Detailles
                              </span>
                            </button>
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            className='shadow-lg rounded-t-lg text-sm'
                            side='right'
                            align='center'
                          >
                            <div class='bg-white shadow-xl mx-4 sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 rounded-lg sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm max-w-2xl text-gray-900'>
                              <div class='rounded-t-lg h-32 overflow-hidden'>
                                <img
                                  class='w-full object-cover object-top'
                                  src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'
                                  alt='Mountain'
                                />
                              </div>
                              <div class='relative mx-auto -mt-16 border-4 border-white rounded-full w-32 h-32 overflow-hidden'>
                                <img
                                  class='h-32 object-center object-cover'
                                  src='https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                                  alt='Woman looking front'
                                />
                              </div>
                              <div class='mt-2 text-center'>
                                <h2 class='font-semibold'>{d.user.name}</h2>
                                <p class='text-gray-500'>{d.user.email}</p>
                              </div>
                              <div className='text-center'>
                                <h6 className={` mt-3 ${poppins.className}`}>
                                  Reservations status
                                </h6>
                                <ul class='flex justify-around items-center py-4 text-gray-700'>
                                  <li class='flex flex-col justify-around items-center'>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='30'
                                      height='30'
                                      viewBox='0 0 24 24'
                                    >
                                      <path
                                        fill='#212121'
                                        fill-rule='nonzero'
                                        d='M6.5 12a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11m0 7.88a.625.625 0 1 0 0 1.249.625.625 0 0 0 0-1.249M17.75 3A3.25 3.25 0 0 1 21 6.25v11.5A3.25 3.25 0 0 1 17.75 21l-5.773.001a6.5 6.5 0 0 0 .71-1.5l5.063-.001a1.75 1.75 0 0 0 1.75-1.75V6.25a1.75 1.75 0 0 0-1.75-1.75H6.25A1.75 1.75 0 0 0 4.5 6.25v5.064a6.5 6.5 0 0 0-1.501.709L3 6.25A3.25 3.25 0 0 1 6.25 3zM6.5 14.003c-1.048 0-1.864.817-1.853 1.954a.5.5 0 1 0 1-.01c-.006-.578.36-.944.853-.944.472 0 .853.392.853.95 0 .224-.075.39-.317.677l-.1.113-.265.29c-.484.542-.671.892-.671 1.468a.5.5 0 1 0 1 0c0-.233.076-.403.324-.695l.1-.115.266-.29c.478-.535.663-.882.663-1.448 0-1.104-.822-1.95-1.853-1.95M11.75 6a.75.75 0 0 1 .743.648l.007.102V12h3.748a.75.75 0 0 1 .102 1.493l-.102.007H11.75a.75.75 0 0 1-.743-.648L11 12.75v-6a.75.75 0 0 1 .75-.75'
                                      />
                                    </svg>{' '}
                                    <div>2k</div>
                                  </li>
                                  <li class='flex flex-col justify-between items-center'>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='800'
                                      height='800'
                                      viewBox='0 0 24 24'
                                    >
                                      <path
                                        d='M1008 120a12 12 0 1 1 12-12 12 12 0 0 1-12 12m0-22a10 10 0 1 0 10 10 10 10 0 0 0-10-10m-.08 14.333a.8.8 0 0 1-.22.391.9.9 0 0 1-.72.259.91.91 0 0 1-.94-.655l-2.82-2.818a.9.9 0 0 1 1.27-1.271l2.18 2.184 4.46-7.907a1 1 0 0 1 1.38-.385 1.05 1.05 0 0 1 .36 1.417Z'
                                        fill='#212121'
                                        fill-rule='nonzero'
                                      />
                                    </svg>
                                    <div>10k</div>
                                  </li>
                                  <li class='flex flex-col justify-around items-center'>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='30'
                                      height='30'
                                      class='si-glyph-deny si-glyph'
                                      viewBox='0 -0.5 17 17'
                                    >
                                      <path
                                        fill='#434343'
                                        fill-rule='evenodd'
                                        d='M9.016.06a7.97 7.97 0 1 0 .002 15.936A7.97 7.97 0 0 0 9.016.06M3.049 8.028a5.974 5.974 0 0 1 5.967-5.966c1.354 0 2.6.458 3.602 1.221l-8.347 8.348a5.93 5.93 0 0 1-1.222-3.603m5.967 5.966a5.92 5.92 0 0 1-3.447-1.105l8.309-8.309a5.93 5.93 0 0 1 1.104 3.448 5.974 5.974 0 0 1-5.966 5.966'
                                        class='si-glyph-fill'
                                      />
                                    </svg>
                                    <div>15</div>
                                  </li>
                                </ul>
                              </div>
                              <div class='mx-8 mt-2 p-4 border-t'>
                                <button class='block bg-gray-900 hover:shadow-lg mx-auto px-6 py-2 rounded-full w-1/2 font-semibold text-white'>
                                  Follow
                                </button>
                              </div>
                            </div>
                            <Tooltip.Arrow className='fill-gray-800' />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </Tooltip.Provider>
                  </td>
                </tr>
              ))
            ) : (
              <tr className='text-gray-700 dark:text-gray-400'>
                <td colSpan="4" className='px-4 py-10 text-center'>
                  <div className='flex flex-col items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className={`text-gray-500 text-lg italic ${poppins.className}`}>
                      Aucun client disponible
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
                    } flex justify-center items-center   dark:bg-gray-800 ml-2 px-4 border-0 dark:border-gray-700 rounded h-10 font-medium text-white dark:hover:text-white dark:text-gray-400 text-base`}
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
                        onClick={() => setCurrentPage(index + 1)}
                        className={`flex justify-center items-center ${
                          currentPage == index + 1 ? 'bg-gray-700' : 'bg-gray-400'
                        }  dark:hover:bg-gray-600 dark:bg-gray-800 px-4 border-0  dark:border-gray-700 rounded h-10 font-medium text-white dark:hover:text-white dark:text-gray-400 text-base`}
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
                    className={`${
                      currentPage == totalPages
                        ? 'bg-gray-300'
                        : 'bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-900'
                    } flex justify-center items-center  dark:bg-gray-800 px-4 border-0 dark:border-gray-700 rounded h-10 font-medium text-white dark:hover:text-white dark:text-gray-400 text-base`}
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

export default page
