"use client";
import { useEffect, useState } from 'react';
import { Poppins, Quicksand } from 'next/font/google';
import { fetchReservations, updateStatus } from '@/lib/features/reservationSlice';
import { fetchPaiments } from '@/lib/features/paimentSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Target } from 'lucide-react';
import Form from './Form/Form';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';


const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })
const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '700'] })

interface ReservationListProps {
  handelOpen?: any
}
const ReservationList : React.FC<ReservationListProps> = ({
  handelOpen ,
}) => {

  const dispatch = useAppDispatch();
  const form = useForm();

    useEffect(() => {
      dispatch(fetchReservations())
      dispatch(fetchPaiments())
    }, [])

    const reservations = useAppSelector(state => state.reservation.reservations);
    const paiments = useAppSelector(state => state.paiment.paiments);

  const [state, setState] = useState<any>({
    isOpen: null,
    isOpenUppdate: null,
    isOpenUppdateStatus: null,
    formTitle: '',
    defaultValues: {},
    status: null
  })

  const updateState = (newState: any) => {
    setState((state: any) => ({ ...state, ...newState }))
  }

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(reservations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = reservations.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const formFields = [
    {
      type: 'select',
      name: 'state',
      label: 'Status',
      options: [
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'pending', label: 'Pending' },
        { value: 'canceled', label: 'Canceled' },
      ],
      col_span: 1
    }
  ]
  const formSchema = z.object({

  })

  const [value, setValue] = useState()


  const onSubmit = (data: any) => {
    const dataFinal = {
      ...data,
      state: value || state.defaultValues.state
    }

    dispatch(updateStatus({ data: dataFinal, id: state.defaultValues.id }))
    form.reset()
    closeDialog()
  }

  const toggleUpdateStatus = (id: any) => updateState({ isOpenUppdateStatus: true, formTitle: "Modifier Status", defaultValues: reservations.find((r: any) => r.id === id) })

  const closeDialog = () => {
    updateState({ isOpenUppdateStatus: false })
    form.reset()
  }


  return (
    <div>
      {
        state.isOpenUppdateStatus !== null &&
        <Form
          onSubmit={onSubmit}
          formFields={formFields}
          isOpen={state.isOpenUppdateStatus}
          onClose={closeDialog}
          validation={formSchema}
          defaultValues={state.defaultValues}
          setState={setValue}
          status={value || state.defaultValues.state}
          formTitle={state.formTitle}
        />
      }
      <div className='shadow-lg mb-8 rounded-lg w-full overflow-hidden'>
        <div className='w-full overflow-x-auto'>
          <table className='w-full whitespace-no-wrap'>
            <thead>
              <tr className='bg-gray-50 dark:bg-gray-800 dark:border-gray-700 border-b font-semibold text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wide'>
                <th className={`px-4 py-3 text-[1rem] ${poppins.className}`}>
                  Reservations
                </th>
                <th className={`px-4 py-3 text-[1rem] ${poppins.className}`}>
                  Amount
                </th>
                <th className={`px-4 py-3 text-[1rem] ${poppins.className}`}>
                  Auto
                </th>
                <th className={`px-4 py-3 text-[1rem] ${poppins.className}`}>
                  Status
                </th>
                <th className={`px-4 py-3 text-[1rem] ${poppins.className}`}>
                  Date
                </th>
                <th className={`px-4 py-3 text-[1rem] ${poppins.className}`}>
                  Contrat
                </th>
              </tr>
            </thead>
            <tbody className='bg-white dark:bg-gray-800 divide-y dark:divide-gray-700'>
              {paginatedData.map((d: any, index: any) => (
                <tr
                  key={d.id || index}
                  className='text-gray-700 dark:text-gray-400'
                >
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <div className='cursor-pointer'>
                          <td className='px-4 flex items-center gap-3 py-3'>
                            <Target />
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
                                <p
                                  className={` text-gray-600 dark:text-gray-400 text-xs ${poppins.className}`}
                                >
                                  {d.user.email}
                                </p>
                              </div>
                            </div>
                          </td>
                        </div>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className='shadow-lg rounded-t-lg text-sm'
                          side='right'
                          align='center'
                        >
                          <div className='bg-white p-2 shadow-xl mx-4 sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 rounded-lg sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm max-w-2xl text-gray-900'>

                            <div className="flex items-center justify-between p-3 bg-[#85C1E9]/10 border border-[#85C1E9]/30 mt-3 rounded-xl">
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-[#292929] mr-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                                  />
                                </svg>
                                <span className="text-xs uppercase tracking-wider text-[#292929]/80">
                                  Payment Status
                                </span>
                              </div>
                              {(() => {
                                const payment = paiments.find((p: any) => p.reservation_id === d.id);
                                const status = payment?.payment_status;
                                const isPaid = status === 'completed';
                                const isFailed = status === 'failed';

                                const statusColors = isPaid ? 'bg-green-100 text-green-700' :
                                  isFailed ? 'bg-red-500 text-red-100' :
                                    'bg-orange-100 text-orange-500';

                                const dotColor = isPaid ? 'bg-green-500' : isFailed ? 'bg-red-800' : 'bg-orange-500';

                                return (
                                  <div className={`px-3 py-1 rounded-full ${statusColors} flex items-center`}>
                                    <div className={`w-2 h-2 rounded-full mr-2 ${dotColor}`}></div>
                                    <span className="font-semibold text-sm">
                                      {isPaid ? 'Paid' : status || 'pending'}
                                    </span>
                                  </div>
                                );
                              })()}
                            </div>

                            <div className="container mx-auto px-2 py-2">
                              <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-3 border border-[#85C1E9]/20">
                                <div className="text-center flex-1">
                                  <div className="text-xs font-medium uppercase tracking-wider text-[#292929] mb-1">
                                    Start
                                  </div>
                                  <div className="bg-[#85C1E9]/10 border border-[#85C1E9]/20 rounded-lg px-2 py-1 inline-block">
                                    <span className="text-sm font-semibold text-[#292929]">
                                      {new Date(d.rental_start).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-1 mx-2">
                                  <div className="h-1 w-1 bg-[#85C1E9] rounded-full"></div>
                                  <div className="h-1 w-1 bg-[#85C1E9] rounded-full"></div>
                                  <div className="h-1 w-1 bg-[#85C1E9] rounded-full"></div>
                                </div>

                                <div className="text-center flex-1">
                                  <div className="text-xs font-medium uppercase tracking-wider text-[#292929] mb-1">
                                    End
                                  </div>
                                  <div className="bg-[#85C1E9]/10 border border-[#85C1E9]/20 rounded-lg px-2 py-1 inline-block">
                                    <span className="text-sm font-semibold text-[#292929]">
                                      {new Date(d.rental_end).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>


                            <div className="container mx-auto px-2 py-2">
                              <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-3 border border-[#85C1E9]/20">
                                <div className="text-center flex-1">
                                  <div className="text-xs font-medium uppercase tracking-wider text-[#292929] mb-1">
                                    Daily Rate
                                  </div>
                                  <div className="bg-[#85C1E9]/10 border border-[#85C1E9]/20 rounded-lg px-2 py-1 inline-block">
                                    <span className="text-sm font-semibold text-[#292929]">
                                      {d.daily_rate} DH
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-1 mx-2">
                                  <div className="h-1 w-1 bg-[#85C1E9] rounded-full"></div>
                                  <div className="h-1 w-1 bg-[#85C1E9] rounded-full"></div>
                                  <div className="h-1 w-1 bg-[#85C1E9] rounded-full"></div>
                                </div>

                                <div className="text-center flex-1">
                                  <div className="text-xs font-medium uppercase tracking-wider text-[#292929] mb-1">
                                    Final Rate
                                  </div>
                                  <div className="bg-[#85C1E9]/10 border border-[#85C1E9]/20 rounded-lg px-2 py-1 inline-block">
                                    <span className="text-sm font-semibold text-[#292929]">
                                      {d.final_price} DH
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='mx-8 mt-2 flex gap-3 p-4 border-top'>
                              <button onClick={() => toggleUpdateStatus(d.id)} className={`block ${poppins.className} text-[.8rem] bg-[#3A5A75] hover:shadow-lg mx-auto px-2 py-2 rounded-full w-1/2 text-white`}>
                                Change Status
                              </button>
                              <button onClick={() => toggleUpdateStatus(d.id)} className={`block ${poppins.className} text-[.8rem] bg-[#3A5A75] hover:shadow-lg mx-auto px-2 py-2 rounded-full w-1/2 text-white`}>
                                Chanege Paiment
                              </button>
                            </div>
                          </div>
                          <Tooltip.Arrow className='fill-gray-800' />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>


                  <td className={`px-4 py-3 text-sm ${poppins.className}`}>
                    {d.final_price} <span className='text-bold'>DH</span>
                  </td>

                  <td className={`px-4 py-3 text-sm ${poppins.className}`}>
                    {d.car.model}
                  </td>
                  <td className='px-4 py-3 text-xs'>

                    <span
                      className={`bg-green-100 px-3 py-1 rounded-full ${poppins.className} ${d.state === 'confirmed'
                        ? 'dark:bg-green-700 text-green-700 dark:text-green-100' : d.state === 'pending'
                          ? 'bg-orange-200 text-orange-500' : d.state === 'completed'
                            ? 'bg-green-200 text-green-500' : 'bg-orange-300 text-red-500'
                        } px-2 py-1 rounded-full font-semibold   leading-tight`}
                    >
                      {d.state}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-sm ${poppins.className}`}>
                    <span>{formatDistanceToNow(new Date(d.created_at), { addSuffix: true, locale: fr })}</span>
                  </td>

                  <td>
                    <Button
                      onClick={() => handelOpen(d)}
                      variant='outline'
                      className={`font-bold text-lg text-[#1b4569] ${quicksand.className}`}
                    >
                      <div className="flex items-center gap-1">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                          <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                          <line x1="9" y1="9" x2="10" y2="9" />
                          <line x1="9" y1="13" x2="15" y2="13" />
                          <line x1="9" y1="17" x2="15" y2="17" />
                        </svg>
                        <span>Contrat</span>
                      </div>
                    </Button>
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
                        onClick={() => setCurrentPage(index + 1)}
                        className={`flex justify-center items-center ${currentPage == index + 1 ? 'bg-gray-700' : 'bg-gray-400'}  dark:hover:bg-gray-600 dark:bg-gray-800 px-4 border-0  dark:border-gray-700 rounded h-10 font-medium text-white dark:hover:text-white dark:text-gray-400 text-base`}
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
                    className={`${currentPage == totalPages ? 'bg-gray-300' : 'bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-900'} flex justify-center items-center  dark:bg-gray-800 px-4 border-0 dark:border-gray-700 rounded h-10 font-medium text-white dark:hover:text-white dark:text-gray-400 text-base`}
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
