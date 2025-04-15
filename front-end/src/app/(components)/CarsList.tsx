'use client'
import { useEffect, useRef, useState } from 'react'
import { Poppins, Quicksand } from 'next/font/google'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchCars, addCar, updateCar, deleteCar } from '@/lib/features/carsSlice'
import { Button } from '@/components/ui/button'
import * as Tooltip from '@radix-ui/react-tooltip'
import { z } from 'zod'
import { fetchReservations } from '@/lib/features/reservationSlice'
import Formulair from '../(components)/form/Form'
import { Ellipsis, Target } from 'lucide-react'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })
const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '700'] })

function CarsList() {

  const [state, setState] = useState<any>({
    isOpen: null,
    isOpenUppdate: null,
    formTitle: "",
    car: "",
    status: "",
    defaultValues: {
      brand: '',
      model: '',
      registration_number: '',
      year: new Date().getFullYear(),
      color: '',
      engine: '',
      quantity: 1,
      mileage: 0,
      resduce: 0,
      stars: 0,
      price_per_day: 0,
      status: 'disponible',
      description: ''
    }
  })
  const [toggleButtons, setToglleButtons] = useState<any>(false)
  const [value, setValue] = useState()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCars())
    dispatch(fetchReservations())

    if (toggleButtons) {
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [toggleButtons])

  const formSchema = z.object({
    brand: z.string().min(1, 'La marque est requise'),
    model: z.string().min(1, 'Le modèle est requis'),
    registration_number: z
      .string()
      .min(1, "Le numéro d'immatriculation est requis"),
    year: z.coerce.number().min(1900, 'Année invalide'),
    color: z.string().min(1, 'La couleur est requise'),
    engine: z.string().min(1, 'Le type de moteur est requis'),
    image: z.instanceof(File, {
      message: 'Image invalide, sélectionnez un fichier'
    }),
    quantity: z.coerce.number().min(1, 'Quantité invalide'),
    mileage: z.coerce.number().min(0, 'Kilométrage invalide'),
    resduce: z.coerce.number().min(0, 'Réduction invalide'),
    stars: z.coerce
      .number()
      .min(0)
      .max(5, 'Les étoiles doivent être entre 0 et 5'),
    price_per_day: z.coerce.number().min(1, 'Prix invalide'),
    // status: z.enum(['disponible', 'loue', 'reserve', 'maintenance'], {
    //   message: "Le statut doit être 'disponible', 'loue' ou 'reserve' ou 'maintenance'."
    // }),
    description: z
      .string()
      .min(10, 'La description doit contenir au moins 10 caractères')
  })

  const onSubmit = (data: any) => {
    const dataFinale = { ...data, status: value }
    dispatch(addCar(dataFinale))
    updateState({ isOpen: false })
  }

  const onUpdateSubmit = (data: any) => {
    const dataFinale = { ...data, status: state.status }

    dispatch(updateCar({ newCar : dataFinale, id: state.car[0]?.id  }))
    updateState({ isOpenUppdate: false })
  }

  const { cars } = useAppSelector(state => state.cars)
  const { reservations } = useAppSelector(state => state.reservation)

  const isReserved = (id: any) => {
    const reserved = reservations?.filter(
      (r:any) => r.car_id == id && r.state === 'confirmed'
    )
    const reservedAll = cars?.find(
      c => c.id === id && c.quantity === reserved.length
    )

    return reservedAll
      ? 'réservés'
      : reserved.length > 0
        ? 'Certains sont réservés'
        : 'Disponible'
  }

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(cars.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = cars.slice(startIndex, startIndex + itemsPerPage)

  const updateState = (newState: Partial<typeof state>) => {
    setState((prevState: any) => ({
      ...prevState,
      ...newState
    }))
  }

  const openDialog = () => updateState({ isOpen: true, isOpenUppdate: null, formTitle: "Ajouter une voiture" , defaultValues: {
    brand: '',
    model: '',
    registration_number: '',
    year: new Date().getFullYear(),
    color: '',
    engine: '',
    quantity: 1,
    mileage: 0,
    resduce: 0,
    stars: 0,
    price_per_day: 0,
    status: 'disponible',
    description : ''
  } })

  const closeDialog = () => {
    updateState({ isOpen: false, defaultValues: {
      brand: '',
      model: '',
      registration_number: '',
      year: new Date().getFullYear(),
      color: '',
      engine: '',
      quantity: 1,
      mileage: 0,
      resduce: 0,
      stars: 0,
      price_per_day: 0,
      status: '',
      description : ''
    } })
    
  }

  const formFields = [
    {
      name: 'brand',
      label: 'Marque',
      rules: { required: 'La marque est obligatoire' }
    },
    {
      name: 'model',
      label: 'Modèle',
      rules: { required: 'Le modèle est obligatoire' }
    },
    {
      name: 'year',
      label: 'Année',
      rules: { required: "L'année est obligatoire" }
    },
    {
      name: 'color',
      label: 'Couleur',
      rules: { required: 'La couleur est obligatoire' }
    },
    {
      name: 'registration_number',
      label: "Numéro d'immatriculation",
      rules: { required: "Le numéro d'immatriculation est obligatoire" }
    },
    { name: 'engine', label: 'Moteur' },
    { name: 'quantity', label: 'Quantité', type: 'number' },
    { name: 'mileage', label: 'Kilométrage', type: 'number' },
    { name: 'resduce', label: 'Réduction', type: 'number' },
    {
      name: 'stars',
      label: 'Étoiles',
      type: 'select',
      options: [
        { label: 'Étoile 1', value: 1 },
        { label: 'Étoile 2', value: 2 },
        { label: 'Étoile 3', value: 3 },
        { label: 'Étoile 4', value: 4 },
        { label: 'Étoile 5', value: 5 }
      ],
      placeholder: 'Étoile'
    },
    {
      name: 'price_per_day',
      label: 'Prix par jour MAD',
      rules: { required: 'Le prix par jour est obligatoire' }
    },
    {
      name: 'status',
      label: 'Statut',
      rules: { required: 'Le statut est obligatoire' },
      type: 'select',
      options: [
        { label: 'disponible', value: 'disponible' },
        { label: 'reserve', value: 'reserve' },
        { label: 'loue', value: 'loue' },
        { label: 'maintenance', value: 'maintenance' }
      ]
    },
    {
      name: 'image',
      label: 'image',
      type: 'file',
      rules: { required: "L'image' est obligatoire" }
    },
    { name: 'description', type: 'textarea', label: 'Description' }
  ]

  const toggleRef = useRef<HTMLTableDataCellElement | null>(null);

  const handleClickOutside = (event: MouseEvent): void => {
    if (toggleRef.current && toggleRef.current.contains(event.target as Node)) {
      return;
    }
    setToglleButtons(false);
  };

  const toggleUpdate = (id:any) => {
    const car = cars.filter(c => c.id === id)
    console.log("car[0]?.status", car[0]?.status);
    
    updateState({ isOpen: null, isOpenUppdate: true, formTitle: "Modifier la voiture", car , status: car[0]?.status , defaultValues: {
      brand: car[0]?.brand,    
      model: car[0]?.model,    
      registration_number: car[0]?.registration_number,    
      year: new Date().getFullYear(),
      color: car[0]?.color,    
      engine: car[0]?.engine,    
      quantity: car[0]?.quantity,
      mileage: car[0]?.mileage,
      resduce: car[0]?.resduce,
      stars: car[0]?.stars,
      price_per_day: car[0]?.price_per_day,
      status: car[0]?.status,
      description: car[0]?.description,
    } })
  }

  const handelDelete = (id:any) => {
    dispatch(deleteCar(id))
  }

  return (
    <div className='gap-2 grid'>
      <Button
        onClick={openDialog}
        variant='outline'
        className={`font-bold text-lg text-[#1b4569] ${quicksand.className}`}
      >
        Ajouter voiture
      </Button>
      {
        state.isOpen !== null ?
          <Formulair
            onSubmit={onSubmit}
            formFields={formFields}
            isOpen={state.isOpen}
            onClose={closeDialog}
            validation={formSchema}
            defaultValues={state.defaultValues}
            setState={setValue}
            status={state.status}
            formTitle={state.formTitle}
          />
          :
          state.isOpenUppdate ?
            <Formulair
              onSubmit={onUpdateSubmit}
              formFields={formFields}
              isOpen={state.isOpenUppdate}
              onClose={closeDialog}
              validation={formSchema}
              defaultValues={state.defaultValues}
              setState={setValue}
              status={state.status}
              formTitle={state.formTitle}
            />
            :
            null
      }

      <div className='shadow-lg mb-8 rounded-lg w-full overflow-hidden'>
        <div className='w-full overflow-x-auto'>
          <table className='w-full whitespace-no-wrap'>
            <thead>
              <tr className='bg-gray-50 dark:bg-gray-800 dark:border-gray-700 border-b font-semibold text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wide'>
                <th className={`px-4 py-3 text-[1.2rem] font-medium ${poppins.className}`}>
                  Brand
                </th>
                <th className={`px-4 py-3 text-[1.2rem] font-medium ${poppins.className}`}>
                  Model
                </th>
                <th className={`px-4 py-3 text-[1.2rem] font-medium ${poppins.className}`}>
                  Engine
                </th>
                <th className={`px-4 py-3 text-[1.2rem] font-medium ${poppins.className}`}>
                  Prix MAD <span className='text-[0.7rem]'>(Jour)</span>
                </th>
                <th className={`px-4 py-3 text-[1.2rem] font-medium ${poppins.className}`}>
                  reserved
                </th>
                <th className={`px-4 py-3 text-[1.2rem] font-medium ${poppins.className}`}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='bg-white dark:bg-gray-800 divide-y dark:divide-gray-700'>
              {paginatedData.map((d:any, index:any) => (
                <tr
                  key={d.id || index}
                  className='text-gray-700 dark:text-gray-400'
                >
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <div>
                          <td className='px-4 py-3'>
                            <div className='flex items-center gap-3 text-md '>
                              <Target />
                              <div className='cursor-pointer'>
                                <p
                                  className={` text-[1.2rem] ${poppins.className}`}
                                >
                                  {d.brand}
                                </p>
                                <p
                                  className={` text-gray-600 dark:text-gray-400 text-xs ${poppins.className}`}
                                >
                                  Quantity {d.quantity}
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
                          <div className='bg-white shadow-xl mx-4 sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 rounded-lg sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm max-w-2xl text-gray-900'>
                            <div className='rounded-t-lg h-44 overflow-hidden'>
                              <img
                                className='w-full object-cover object-top'
                                src={`http://127.0.0.1:8000/storage/${d.image}`}
                                alt='Mountain'
                              />
                            </div>
                            {/* <div className='left-0 relative -mt-16 border-4 border-white rounded-sm w-fit h-32 overflow-hidden'>
                              <img
                                className='h-32 object-center object-cover'
                                src={`http://127.0.0.1:8000/storage/${d.image}`}
                                alt='Woman looking front'
                              />
                            </div> */}
                            <div className='mt-4 text-center'>
                              <h2 className={`font-semibold capitalize ${poppins.className}`}>
                                Model : {d.model}
                              </h2>
                              <p className={`text-gray-500 capitalize ${poppins.className}`}>
                                Moteur : {d.engine}
                              </p>
                              <p className='text-gray-500'>
                                Kelométrage : {d.mileage} Km
                              </p>
                            </div>
                            <div className='text-center'>
                              <h6
                                className={`flex mt-3 justify-center ${poppins.className}`}
                              >
                                {Array.from({ length: d.stars }, v => (
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='w-5 h-5 text-yellow-400'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                  >
                                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                  </svg>
                                ))}
                              </h6>
                            </div>
                            <p className={`mx-8 mt-2 p-4 border-t ${poppins.className}`}>
                              {d.description}
                            </p>
                            <div className='mx-8 mt-2 flex gap-3 p-4 border-t'>
                              <button onClick={() => toggleUpdate(d.id)} className='block bg-[#3A5A75] hover:shadow-lg mx-auto px-6 py-2 rounded-full w-1/2 font-semibold text-white'>
                                Modifier
                              </button>
                              <button onClick={() => handelDelete(d.id)} className='block bg-[#ff8906] hover:shadow-lg mx-auto px-6 py-2 rounded-full w-1/2 font-semibold text-white'>
                                Delete
                              </button>
                            </div>
                          </div>
                          <Tooltip.Arrow className='fill-gray-800' />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>

                  <td className={`px-4 py-3 text-sm ${poppins.className}`}>
                    {d.model} <span className='text-bold'>DH</span>
                  </td>
                  <td className={`px-4 py-3 text-sm ${poppins.className}`}>
                    {d.model}
                  </td>
                  <td className={`px-4 py-3 text-sm ${poppins.className}`}>
                    {d.price_per_day}
                  </td>
                  <td className={`px-4 py-3 text-sm ${poppins.className}`}>
                    <span
                      className={`bg-green-100 ${quicksand.className} ${isReserved(d.id) === 'réservés'
                        ? 'dark:bg-green-700 bg-orange-200 text-orange-500'
                        : isReserved(d.id) === 'Certains sont réservés' ?
                          'bg-orange-100 text-orange-300' : "dark:bg-green-600 text-green-600 dark:text-green-100"
                        } px-2 py-1 rounded-full font-semibold   leading-tight`}
                    >
                      {reservations ? (
                        <span>{isReserved(d.id)}</span>
                      ) : (
                        <span>Chargement...</span>
                      )}
                    </span>
                  </td>

                  <td ref={toggleRef} className='relative grid justify-center'>
                    <button onClick={() => setToglleButtons(d.id)} className='mx-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-600 hover:text-gray-800 hover:rotate-180 transition !duration-1000 ease-in-out'>
                      <Ellipsis />
                    </button>
                    <div id="dropdownHover" className={`${toggleButtons === d.id ? "" : "hidden"}  z-10 bg-[#CCE5F6] absolute right-26 dark:bg-gray-700 shadow-sm rounded-lg divide-y divide-gray-100`}>
                      <ul className="py-1 font-font-medium text-gray-100 dark:text-gray-100 profile-dropdown" aria-labelledby="dropdownHoverButton">
                        <li>
                          <button onClick={() => handelDelete(d.id)} className="block hover:bg-white dark:hover:bg-gray-600 px-2 py-1 hover:text-[#0E2540]">
                            <svg
                              width='25px'
                              height='25px'
                              viewBox='0 0 24 24'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M10 12V17'
                                stroke='#292929'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                              />
                              <path
                                d='M14 12V17'
                                stroke='#292929'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                              />
                              <path
                                d='M4 7H20'
                                stroke='#292929'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                              />
                              <path
                                d='M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10'
                                stroke='#292929'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                              />
                              <path
                                d='M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z'
                                stroke='#292929'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                              />
                            </svg>
                          </button>
                        </li>
                        <li>
                          <button onClick={() => toggleUpdate(d.id)} className="block hover:bg-white dark:hover:bg-gray-600 flex justify-center w-full py-1 hover:text-[#0E2540]">
                            <svg
                              width='22px'
                              height='22px'
                              viewBox='0 0 24 24'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z'
                                stroke='#292929'
                                stroke-width='2.4'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                              />
                              <path
                                d='M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13'
                                stroke='#292929'
                                stroke-width='2.4'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                              />
                            </svg></button>

                        </li>
                      </ul>
                    </div>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='grid sm:grid-cols-2 bg-gray-50 dark:bg-gray-800 px-4 py-3 dark:border-gray-700 border-t font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide'>
          <span className='flex sm:justify-center col-span-4 mt-2 sm:mt-auto'>
            <nav aria-label='Table navigation'>
              <ul className='inline-flex items-center'>
                <li>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    className={`${currentPage == 1
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
                        className={`flex justify-center items-center ${currentPage == index + 1
                          ? 'bg-gray-700'
                          : 'bg-gray-400'
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
                    className={`${currentPage == totalPages
                      ? 'bg-gray-300'
                      : 'bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-900'
                      } flex justify-center items-center  dark:bg-gray-800 ml-2 px-4 border-0 dark:border-gray-700 rounded h-10 font-medium text-white dark:hover:text-white dark:text-gray-400 text-base`}
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

export default CarsList
