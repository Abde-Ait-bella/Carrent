'use client'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { createReservation } from '@/lib/features/reservationSlice'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon, ChevronRight, ChevronLeft, Check, X } from 'lucide-react'
import { format, addDays, differenceInDays, set } from 'date-fns'
import { fr } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import ToastNotification from '../elements/ToastNotification'
import { Poppins } from 'next/font/google'
import { setUserData, fetchUserData } from '@/lib/features/userSlice'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

interface BookingFormProps {
  isOpen: boolean
  carId?: number | null
  car?: any
  onClose: () => void
}

const BookingForm: React.FC<BookingFormProps> = ({
  isOpen,
  carId,
  car,
  onClose
}) => {
  const dispatch = useAppDispatch()
 
  useEffect(() => {
    dispatch(fetchUserData())
  }
  , [ dispatch ])

  const user = useAppSelector((state) => state.user)

  const [state, setState] = useState<any>({
    step: 1,
    totalSteps: 3,
    typeToast: null,
    contentToast: null,
    isLoading: false,
    termsAccepted: false,
    additionalOptions: {
      insurance: false,
      gps: false,
      childSeat: false,
      additionalDriver: false
    },
    optionPrices: {
      insurance: 52,
      gps: 25,
      childSeat: 32,
      additionalDriver: 25
    }
  })

  const updateState = (newState: Partial<typeof state>) => {
    setState((prevState: any) => ({
      ...prevState,
      ...newState
    }))
  }


  // Update this section - remove test variable
  // console.log('user data', user.name);
  // const test = user.name
  
  // Form validation schema
  const formSchema = z.object({
    // user_id: z.number().default(userId),
    car_id: z.number().optional(),
    rental_start: z.date({
      required_error: "La date de début est requise"
    }),
    rental_end: z.date({
      required_error: "La date de fin est requise"
    }).refine(date => date > new Date(), {
      message: "La date de fin doit être dans le futur"
    }),
    daily_rate: z.string().min(1, "Le tarif journalier est requis"),
    total_price: z.string().optional(),
    state: z.string().default('pending'),

    // Additional fields for user details
    name: z.string().min(1, "Le nom est requis"),
    email: z.string().email("Format d'email invalide"),
    user_phone: z.string().min(1, "Le numéro de téléphone est requis"),

  }).refine(data => data.rental_end > data.rental_start, {
    message: "La date de fin doit être après la date de début",
    path: ["rental_end"]
  });

  const defaultValues = {
    // user_id: userId,
    car_id: carId || undefined,
    rental_start: addDays(new Date(), 1),
    rental_end: addDays(new Date(), 3),
    daily_rate: car?.price_per_day ? car.price_per_day.toString() : "",
    total_price: "",
    state: "pending",
    // Default user information - remove default values here
    name: "",
    email: "",
    user_phone: "",
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  // Add this useEffect to update form values when user data is loaded
  useEffect(() => {
    if (user && user.name) {
      form.setValue('name', user.name);
    }
    if (user && user.email) {
      form.setValue('email', user.email);
    }
  }, [user, form]);
  
  // Keep your existing useEffect for car data
  useEffect(() => {
    if (car && car.price_per_day) {
      form.setValue('daily_rate', car.price_per_day.toString());
      form.setValue('car_id', car.id);
    }
  }, [car, form]);

  const handleClose = () => {
    form.reset();
    updateState({ step: 1 });
    onClose();
  }

  const nextStep = async () => {
    
    const currentStep = state.step;

    // Validate current step fields before proceeding
    if (currentStep === 1) {
      const start = form.getValues('rental_start');
      const end = form.getValues('rental_end');
      if (!start || !end) {
        // Show validation errors
        form.trigger(['rental_start', 'rental_end']);
        return;
      }
      
      // Calculate total price when going from step 1 to step 2
      if (car && car.price_per_day) {
        const days = differenceInDays(form.getValues('rental_end'), form.getValues('rental_start'));
        const totalPrice = days * parseInt(car.price_per_day);
        form.setValue('total_price', totalPrice.toString());
      }
      
    } else if (currentStep === 2) {
      // Validation manuelle des champs à l'étape 2
      const name = form.getValues('name');
      const email = form.getValues('email');
      const phone = form.getValues('user_phone');
      
      if (!name || !email || !phone) {
        await form.trigger(['name', 'email', 'user_phone']);
        return;
      }
      
      // Vérifier explicitement si les champs sont valides
      const nameField = form.getFieldState('name');
      const emailField = form.getFieldState('email');
      const phoneField = form.getFieldState('user_phone');
      
      if (nameField.invalid || emailField.invalid || phoneField.invalid) {
        return;
      }
    }

    if (currentStep < state.totalSteps) {
      updateState({ step: currentStep + 1 });
    }
  }

  const prevStep = () => {
    if (state.step > 1) {
      updateState({ step: state.step - 1 });
    }
  }

  const toggleAdditionalOption = (option: string) => {
    updateState({
      additionalOptions: {
        ...state.additionalOptions,
        [option]: !state.additionalOptions[option]
      }
    });
  }

  const onSubmit = async (data: any) => {
    updateState({ isLoading: true });

    try {

      const result = await dispatch(createReservation(data)).unwrap();
      
      if (result.status === 201) {
        
        dispatch(setUserData({
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          token: result.authorisation.token,
          role: result.user_role,
          remember : false,
          autenticated: true
        }))

        updateState({
          isLoading: false,
          typeToast: 'success',
          contentToast: 'Réservation créée avec succès!'
        });

        setTimeout(() => {
          handleClose();
          updateState({ typeToast: null, contentToast: null });
          form.reset();
        }, 3000);
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      updateState({
        isLoading: false,
        typeToast: 'error',
        contentToast: 'Erreur lors de la création de la réservation.'
      });

      setTimeout(() => {
        updateState({ typeToast: null, contentToast: null });
      }, 3000);
    }
  }

  // Progress bar calculation
  const progress = ((state.step - 1) / (state.totalSteps - 1)) * 100;

  // Don't render anything if not open
  if (!isOpen) return null;

  return (
    <>
      {state.typeToast && (
        <ToastNotification
          type={state.typeToast}
          content={state.contentToast}
        />
      )}

      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center overflow-y-auto">
        {/* Main Container */}
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-[600px] max-h-[70vh] overflow-y-auto my-4 mx-4 md:mx-auto">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="p-6 border-b">
            <h2 className={`${poppins.className} text-xl font-bold`}>
              Réserver {car?.brand} {car?.model}
            </h2>

            {/* Progress Bar */}
            <div className="w-full mt-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Étape {state.step} sur {state.totalSteps}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Step indicators */}
              <div className="flex justify-between mt-2">
                <div className={`flex flex-col items-center ${state.step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`rounded-full flex items-center justify-center w-8 h-8 ${state.step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    {state.step > 1 ? <Check size={16} /> : 1}
                  </div>
                  <span className="text-xs mt-1">Dates</span>
                </div>

                <div className={`flex flex-col items-center ${state.step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`rounded-full flex items-center justify-center w-8 h-8 ${state.step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    {state.step > 2 ? <Check size={16} /> : 2}
                  </div>
                  <span className="text-xs mt-1">Détails</span>
                </div>

                <div className={`flex flex-col items-center ${state.step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`rounded-full flex items-center justify-center w-8 h-8 ${state.step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    3
                  </div>
                  <span className="text-xs mt-1">Confirmation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4">
                  {/* Car details - visible on all steps */}
                  {car && (
                    <div className="p-4 bg-gray-200 rounded-md">
                      <div className="flex space-x-4 items-center">
                        {car.image && (
                          <img
                            src={`http://127.0.0.1:8000/storage/${car.image}`}
                            alt={`${car.brand} ${car.model}`}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        )}
                        <div>
                          <h3 className="font-bold">{car.brand} {car.model}</h3>
                          <p className="text-sm text-gray-500">{car.price_per_day} MAD / jour</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 1: Date Selection */}
                  {state.step === 1 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Sélectionnez vos dates de location</h3>

                      {/* Date Range Picker */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormField
                            control={form.control}
                            name="rental_start"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Date de début</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP", { locale: fr })
                                        ) : (
                                          <span>Choisir une date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) => date < new Date()}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="space-y-2">
                          <FormField
                            control={form.control}
                            name="rental_end"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Date de fin</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP", { locale: fr })
                                        ) : (
                                          <span>Choisir une date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) =>
                                        date < new Date() ||
                                        (form.getValues('rental_start') && date < form.getValues('rental_start'))
                                      }
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Daily Rate */}
                      <FormField
                        control={form.control}
                        name="daily_rate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prix par Jour (MAD)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                readOnly
                                className='bg-gray-200'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 2: Personal Details */}
                  {state.step === 2 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Informations personnelles</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom complet</FormLabel>
                              <FormControl>
                                <Input placeholder="Entrez votre nom" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="votre@email.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="user_phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+212 XXXXXXXXX"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 3: Confirmation & Payment */}
                  {state.step === 3 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Confirmer votre réservation</h3>

                      <div className="space-y-3 p-4 bg-gray-50 rounded-md">
                        <div className="flex justify-between">
                          <span className="font-medium">Voiture:</span>
                          <span>{car?.brand} {car?.model}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Date de début:</span>
                          <span>{format(form.getValues('rental_start'), "PPP", { locale: fr })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Date de fin:</span>
                          <span>{format(form.getValues('rental_end'), "PPP", { locale: fr })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Durée:</span>
                          <span>{differenceInDays(form.getValues('rental_end'), form.getValues('rental_start'))} jours</span>
                        </div>

                        <div className="pt-2 border-t">
                          <div className="flex justify-between">
                            <span className="font-medium">Prix par Jour:</span>
                            <span>{form.getValues('daily_rate')} MAD</span>
                          </div>

                          {/* Afficher le prix total statiquement pour éviter le recalcul */}
                          <div className="flex justify-between mt-3 pt-2 border-t font-semibold">
                            <span>TOTAL:</span>
                            <span>
                              {(() => {
                                const totalPrice = form.getValues('total_price');
                                if (totalPrice) return `${totalPrice} MAD`;
                                
                                const days = differenceInDays(form.getValues('rental_end'), form.getValues('rental_start'));
                                const calculatedPrice = days * parseInt(form.getValues('daily_rate') || '0');
                                return `${calculatedPrice} MAD`;
                              })()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Final Price - gardé caché mais avec preventDefault pour éviter les soumissions automatiques */}
                      <FormField
                        control={form.control}
                        name="total_price"
                        render={({ field }) => (
                          <FormItem className="hidden">
                            <FormControl>
                              <Input
                                type="text"
                                readOnly
                                {...field}
                                onSubmit={(e) => e.preventDefault()}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between pt-4 border-t mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={state.step > 1 ? prevStep : handleClose}
                    className="flex items-center gap-1"
                  >
                    {state.step > 1 ? (
                      <>
                        <ChevronLeft size={16} />
                        Retour
                      </>
                    ) : (
                      'Annuler'
                    )}
                  </Button>

                  {state.step < state.totalSteps ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
                    >
                      Suivant
                      <ChevronRight size={16} />
                    </Button>
                  ) : (
                    <Button
                      type="button" // Changé de submit à button
                      onClick={(e) => {
                        e.preventDefault(); // Empêcher la soumission automatique
                        form.handleSubmit(onSubmit)(e); // Appeler manuellement la soumission du formulaire
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white"
                      disabled={state.isLoading}
                    >
                      {state.isLoading ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Traitement...
                        </div>
                      ) : (
                        "Confirmer la réservation"
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookingForm