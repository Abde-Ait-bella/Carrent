'use client'

import React, {
  useState
} from 'react'
import {
  useForm
} from 'react-hook-form'
import {
  Button
} from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  toast
} from 'sonner'
import exp from 'constants'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { CalendarIcon, CircleXIcon } from 'lucide-react'
import { is } from 'date-fns/locale'
import { Poppins } from 'next/font/google'
import { Input } from '@/components/ui/input'
import { log } from 'console'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { format } from "date-fns"

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })


interface FormProps {
  isOpen: boolean,
  onClose?: any
}

const GeneratedForm: React.FC<FormProps> = ({
  isOpen = true,
  onClose
}) => {

  const [state, setState] = useState<any>({
    isOpen: true,
    step: 0,
  })

  const updateState = (newState: Partial<typeof state>) => {
    setState((prevState: any) => ({
      ...prevState,
      ...newState
    }))
  }

  const totalSteps = 3

  const form = useForm()

  const {
    handleSubmit,
    reset
  } = form

  const onSubmit = async (formData: Record<string, any>) => {
    if (state.step < totalSteps - 1) {
      updateState({ step: state.step + 1 })
    } else {
      console.log(formData)
      updateState({ step: 0 })
      reset()

      toast.success("Form successfully submitted")
    }
  }

  const handleBack = () => {
    if (state.step > 0) {
      updateState({ step: state.step - 1 })
    }
  }

  // const onClose = () => {
  //   updateState({ isOpen: false })
  // }

  // console.log("isOpen", onClose);

  const formFields = {
    0: [
      { placeholder: 'CIN', type: 'text', name : 'cin' },
      { placeholder: 'Numéro de permis', type: 'text', name : 'permis_number' },
      { placeholder: 'Ville de délivrance du permis', type: 'text', name : 'permis_city_id' },
      { placeholder: 'Date de délivrance', type: 'date', name : '' },
      { placeholder: 'Numéro de téléphone', type: 'tel', name : 'phone_number' },
      { placeholder: 'Adresse', type: 'text', name : 'address' },
      { placeholder: 'Date de retour', type: 'date', name : 'final return ' },
      { placeholder: 'Avance', type: 'number', name : '' },
      { placeholder: 'Reste à payer', type: 'number', name : '' },
      { placeholder: 'Assurance tous risques', type: 'text', name : '' },

            $table->date("delicolumn: vered on");
            $table->string("phone_number");
            $table->string("address");
            $table->integer("final return");
            $table->integer("advance");
            $table->integer("rest");
            $table->string("comprehensive_insurance");
    ],

    1: [
    ],

    2: [
    ]
  }

  const [date, setDate] = React.useState<Date>()


  return (
    <>

      {
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="rounded-lg shadow-lg max-w-4xl w-full bg-[#DDEDF8] border border-gray-300 max-h-[90vh] overflow-auto text-white 
        scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100
        [&::-webkit-scrollbar]:w-2 
        [&::-webkit-scrollbar-track]:bg-blue-100/30 
        [&::-webkit-scrollbar-thumb]:rounded-full 
        [&::-webkit-scrollbar-thumb]:bg-blue-500/60
        hover:[&::-webkit-scrollbar-thumb]:bg-blue-600">
            {/* Popup Header */}
            <div className="p-4 border-b border-gray-200 sticky top-0 bg-[#DDEDF8] z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Contrat de location
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-500">Étape {state.step + 1}</p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center p-4">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full transition-all duration-300 ease-in-out",
                      index <= state.step ? "bg-blue-600" : "bg-blue-200"
                    )}
                  />
                  {index < totalSteps - 1 && (
                    <div
                      className={cn(
                        "w-8 h-0.5",
                        index < state.step ? "bg-blue-600" : "bg-blue-200"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Form Content */}
            <div className="p-6">

              {state.step === 0 && (
                <Form {...form}>
                  <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {formFields[0].map((field, index) => (
                        field.type === 'date' ? (
                          <div key={index} className="space-y-2 mt-1">
                            <label className="block text-sm font-medium text-gray-700">
                              {field.placeholder}
                            </label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal border text-gray-500 border-gray-300"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={date}
                                  onSelect={setDate}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        ) : (
                          <FormField
                            key={index}
                            control={form.control}
                            name={field.placeholder}
                            render={({ field: controlledField }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">
                                  {field.placeholder}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...controlledField}
                                    type={field.type || 'text'}
                                    placeholder={field.placeholder || ''}
                                    className="border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )
                      ))}
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"
                        onClick={handleBack}
                        disabled={state.step === 0}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-gray-200 transition-colors"
                      >
                        Next
                      </Button>
                    </div>
                  </form>
                </Form>
              )}

              {state.step === 1 && (
                <Form {...form}>
                  <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {formFields[state.step].map((field, index) => (
                        <FormField
                          key={index}
                          control={form.control}
                          name={field.placeholder}
                          render={({ field: controlledField }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">
                                {field.placeholder}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...controlledField}
                                  type={field.type || 'text'}
                                  placeholder={field.placeholder || ''}
                                  className="border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                      >
                        Next
                      </Button>
                    </div>
                  </form>
                </Form>
              )}

              {state.step === 2 && (
                <Form {...form}>
                  <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-6">
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-medium text-gray-800">Révision et Soumission</h3>
                      <p className="text-gray-600">Veuillez vérifier vos informations avant de soumettre</p>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"
                        onClick={handleBack}
                      >
                        Retour
                      </Button>
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                      >
                        Soumettre
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </div >
        </div >


      }
    </>
  )
}

export default GeneratedForm;