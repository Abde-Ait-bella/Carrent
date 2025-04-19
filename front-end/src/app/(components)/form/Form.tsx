'use client'

import * as React from 'react'

import { useForm } from 'react-hook-form'

import { Poppins, Quicksand } from 'next/font/google'

import {
  AlertDialog,
  //   AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
// Ton composant Input personnalisé
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'

import { Check, ChevronsUpDown, CircleXIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

interface MyComponentProps {
  onSubmit: any
  formFields: any
  isOpen: any
  onClose: any
  validation?: any
  defaultValues?: any
  setState?: any
  status?: any
  formTitle?: any
}

const Formulair: React.FC<MyComponentProps> = ({
  onSubmit,
  formFields, 
  isOpen,
  onClose,
  validation,
  defaultValues,
  setState,
  status,
  formTitle
}) => {
  const [dropdownId, setDropdownd] = React.useState<number | boolean>(false)
  const [valueStars, setValueStars] = React.useState('')
  
  const form = useForm({
    resolver: zodResolver(validation),
    defaultValues
  })

  React.useEffect(() => {
    form.reset(defaultValues) // Mettre à jour les valeurs du formulaire
  }, [defaultValues])

  const toggleDropdown = (id: any) => {
    setDropdownd(dropdownId === id ? false : id)
  }
  

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent className='bg-[#292929] shadow-lg border border-gray-700 rounded-lg max-w-4xl max-h-[90vh] overflow-auto text-white scrollbar-container'>
          <style jsx global>{`
            .scrollbar-container::-webkit-scrollbar {
              width: 8px;
            }
            .scrollbar-container::-webkit-scrollbar-track {
              background: #1f1f1f;
              border-radius: 4px;
            }
            .scrollbar-container::-webkit-scrollbar-thumb {
              background: #4a4a4a;
              border-radius: 4px;
            }
            .scrollbar-container::-webkit-scrollbar-thumb:hover {
              background: #555;
            }
          `}</style>
          <AlertDialogHeader className='text-start'>
            <div className='flex justify-between'>
              <AlertDialogTitle
                className={`mb-7 text-2xl ${poppins.className}`}
              >
                {formTitle}
              </AlertDialogTitle>
              <CircleXIcon
                size={32}
                className='cursor-pointer'
                onClick={onClose}
              />
            </div>
            <AlertDialogDescription className='text-gray-300'>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-6'
                >
                  {
                    <div className={`gap-4 grid grid-cols-1 ${formTitle == "Modifier Status" ? "": "sm:grid-cols-2 md:grid-cols-3"} `}>
                      {formFields.map((field: any, index: number) => (
                        <FormField
                          key={index}
                          control={form.control}
                          name={field.name}
                          render={({ field: controlledField }) => (
                            <FormItem
                              className={
                                field.type == 'file'
                                  ? 'col-span-1 sm:col-span-2 md:col-span-3'
                                  : field.type == 'textarea' 
                                  ? 'min-h-24 col-span-3 sm:col-span-2 md:col-span-3' :
                                  field?.col_span == 1 ? 'col-span-3'
                                  : ''
                              }
                            >
                              <FormLabel className={`${poppins.className}`}>
                                {field.label}
                              </FormLabel>

                              {field.type === 'file' ? (
                                <div className='relative'>
                                  <div className='flex flex-col items-center bg-gray-800 hover:bg-gray-750 p-4 border border-gray-700 rounded-lg transition-colors cursor-pointer'>
                                    <div className='flex justify-center items-center bg-gray-700 mb-2 rounded-full w-12 h-12'>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='w-6 h-6 text-gray-400'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                      >
                                        <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          strokeWidth={2}
                                          d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                                        />
                                      </svg>
                                    </div>
                                    <span className='font-medium text-gray-300 text-sm'>
                                      Sélectionner une image
                                    </span>
                                    {controlledField.value && (
                                      <span className='mt-1 max-w-full text-gray-400 text-xs truncate'>
                                        {typeof controlledField.value ===
                                        'object'
                                          ? controlledField.value.name
                                          : controlledField.value}
                                      </span>
                                    )}
                                  </div>
                                  <input
                                    type='file'
                                    accept='image/*'
                                    className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'
                                    onChange={e => {
                                      const file = e.target.files?.[0]
                                      if (file) {
                                        controlledField.onChange(file)
                                      }
                                    }}
                                  />
                                </div>
                              ) : field.type === 'select' &&
                                field.label !== 'Étoiles' ? (
                                <Popover open={dropdownId == index + 1}>
                                  <PopoverTrigger asChild>
                                    <Button
                                      role='combobox'
                                      className={`${poppins.className} w-full text-gray-400 bg-gray-800 border-gray-700`}
                                      onClick={() => toggleDropdown(index + 1)}
                                    >
                                      {status
                                        ? field.options &&
                                          field.options.find(
                                            (op: any) => op.value === status
                                          )?.label
                                        : `Select ${field.label}...`}
                                      <ChevronsUpDown className='opacity-50' />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className='p-0 w-full'>
                                    <Command>
                                      <CommandInput placeholder='Search framework...' />
                                      <CommandList>
                                        <CommandEmpty>
                                          No options found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                          {field.options &&
                                            field.options.map((op: any) => (
                                              <CommandItem
                                                // key={op.value}
                                                value={op.value}
                                                onSelect={currentValue => {
                                                  setState(
                                                    currentValue === status
                                                      ? ''
                                                      : currentValue
                                                  )
                                                  setDropdownd(false)
                                                }}
                                              >
                                                {op.label}
                                                <Check
                                                  className={cn(
                                                    'ml-auto',
                                                    status === op.value
                                                      ? 'opacity-100'
                                                      : 'opacity-0'
                                                  )}
                                                />
                                              </CommandItem>
                                            ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                              ) : 
                              field.type === 'select' ? (
                                <Select
                                  onValueChange={value => setValueStars(value)}
                                  defaultValue={controlledField.value}
                                >
                                  <SelectTrigger className='bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-lg text-gray-300 transition-colors'>
                                    <SelectValue
                                      placeholder={
                                        field.placeholder ||
                                        `Sélectionner un ${field.placeholder}`
                                      }
                                    />
                                      {valueStars
                                        ? field.options &&
                                          field.options.find(
                                            (op: any) => op.value == valueStars
                                          )?.label
                                        : `Select ${field.label}...`}
                                  </SelectTrigger>
                                  <SelectContent className='bg-gray-800 border border-gray-700 text-gray-300'>
                                    {field.options &&
                                      field.options.map(
                                        (option: any, indexOption: any) => (
                                          <SelectItem
                                            key={option.value}
                                            value={option.value}
                                          >
                                            <div className='flex items-center gap-3'>
                                              <div className='flex'>
                                                {Array.from(
                                                  { length: option.value },
                                                  v => (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      className='w-5 h-5 text-yellow-400'
                                                      viewBox='0 0 20 20'
                                                      fill='currentColor'
                                                    >
                                                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                                    </svg>
                                                  )
                                                )}
                                              </div>
                                              <Check
                                                className={cn(
                                                  'ml-auto',
                                                  valueStars == option.value
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                                )}
                                              />
                                            </div>
                                          </SelectItem>
                                        )
                                      )}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input
                                  {...controlledField}
                                  type={field.type || 'text'}
                                  placeholder={field.placeholder || ''}
                                  className={`bg-gray-800 border-gray-700 ${
                                    field.type == 'textarea'
                                      ? 'min-h-24 col-span-3 sm:col-span-2 md:col-span-3'
                                      : ''
                                  }`}
                                />
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  }
                  <div className='flex sm:flex-row flex-col justify-end gap-3'>
                    <Button type='submit' className='w-full sm:w-auto'>
                      Envoyer
                    </Button>
                  </div>
                </form>
              </Form>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Annuler</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Formulair
