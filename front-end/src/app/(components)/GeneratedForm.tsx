'use client'

import React, {
  useEffect,
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
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react'
import { is } from 'date-fns/locale'
import { Poppins } from 'next/font/google'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { format } from "date-fns"

import jsPDF from 'jspdf';

import { cn } from "@/lib/utils"
import { Switch } from '@/components/ui/switch'

import { useAppDispatch } from '@/lib/hooks'
import { addContract } from '@/lib/features/reservationSlice'
import { fetchcities } from '@/lib/features/citiesSlice'
import { useAppSelector } from '@/lib/hooks'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import ToastNotification from './elements/ToastNotification'


interface FormProps {
  isOpen: boolean,
  reservation: any
  onClose?: any,
}

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

const GeneratedForm: React.FC<FormProps> = ({
  isOpen,
  reservation,
  onClose
}) => {

  const dispatch = useAppDispatch()

  const [state, setState] = useState<any>({
    isOpen,
    step: 0,
    typeToast: null,
    selectedFile: null,
  })



  const [generatedPDF, setGeneratedPDF] = useState<jsPDF | null>(null);

  const updateState = (newState: Partial<typeof state>) => {
    setState((prevState: any) => ({
      ...prevState,
      ...newState
    }))
  }

  useEffect(() => {
    dispatch(fetchcities())
  }, [])

  const cities = useAppSelector(state => state.cities.cities);

  console.log('cities', cities);

  const totalSteps = 3

  const form = useForm()

  const {
    handleSubmit,
    reset
  } = form

  const generatePDF = (formData: Record<string, any>) => {
    const doc = new jsPDF();
    // Set document properties
    doc.setProperties({
      title: 'Contrat de Location',
      subject: 'Contrat de Location de Véhicule',
      author: 'Agence de Location'
    });
    
    // Import modern fonts for titles
    try {
      // Add web-safe modern fonts that work well in PDFs
      doc.addFont('https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Hw5aXo.woff2', 'Montserrat', 'normal');
      doc.addFont('https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w5aXo.woff2', 'Montserrat', 'bold');
      doc.addFont('https://fonts.gstatic.com/s/raleway/v28/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrE.woff2', 'Raleway', 'normal');
      
      // Set default title font
      doc.setFont('Montserrat', 'bold');
    } catch (error) {
      console.warn("Custom fonts couldn't be loaded, using fallback fonts", error);
      doc.setFont('helvetica', 'bold');
    }
    // Setup modern font styling for PDF
    try {
      // Define a text style system for consistent, modern typography
      const textStyle = {
        title: () => {
          doc.setFontSize(24);
          doc.setFont('helvetica', 'bold');
          doc.setFont('Montserrat', 'bold'); // Use Montserrat for titles
          doc.setTextColor(0, 51, 102); // Deep blue for titles
        },
        subtitle: () => {
          doc.setFontSize(18);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(41, 128, 185); // Light blue for subtitles
        },
        sectionHeader: () => {
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(44, 62, 80); // Dark slate for sections
        },
        label: () => {
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(52, 73, 94); // Slate for labels
        },
        normal: () => {
          doc.setFontSize(11);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(60, 60, 60); // Dark gray for normal text
        },
        small: () => {
          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(100, 100, 100); // Gray for small text
        }
      };

      // Set modern line spacing
      doc.setLineHeightFactor(1.3);

      // Use the text style system
      textStyle.normal(); // Set default style

      // Make text styles available throughout the PDF generation
      Object.defineProperty(doc, 'textStyle', {
        value: textStyle,
        writable: false
      });

    } catch (error) {
      console.error("Error setting up PDF styles:", error);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
    }
    doc.addFont('Poppins-Bold.ttf', 'Poppins', 'bold');
    doc.setFont('helvetica', 'bold'); // Using helvetica as fallback

    // Add professional header
    doc.setFillColor(41, 128, 185);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('CONTRAT DE LOCATION', 105, 15, { align: 'center' });

    // Reset text color for document body
    doc.setTextColor(0, 0, 0);

    // Contract reference
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('N° DE CONTRAT: ' + new Date().getTime().toString().slice(-8), 200, 40, { align: 'right' });
    doc.text('Date: ' + new Date().toLocaleDateString(), 200, 47, { align: 'right' });

    // Parties section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('ENTRE LES SOUSSIGNÉS', 105, 60, { align: 'center' });

    // Rental company details
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('LE LOCATAIRE:', 20, 70);
    doc.setFont('helvetica', 'normal');
    doc.text('Société Carrent', 20, 77);
    doc.text('Adresse : Taroudant', 20, 82);
    doc.text('Téléphone : +212 681 78 31 61', 20, 87);

    doc.setFont('helvetica', 'normal');

    // Separator line
    doc.setDrawColor(41, 128, 185);
    doc.line(20, 95, 190, 95);
    // doc.line(20, 110, 190, 110);

    // Form data section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMATIONS DU CLIENT', 105, 120, { align: 'center' });

    // Create structured form data display
    doc.setFontSize(10);
    let yPos = 140;
    const leftColumn = 20;
    const rightColumn = 100;
    const lineHeight = 7;

    // Function to add data in table-like format
    const addRow = (label: string, value: any) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label + ' :', leftColumn, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(String(value || 'Non spécifié'), rightColumn, yPos);
      yPos += lineHeight;
    };

    // Add client data rows
    Object.keys(formData).forEach(key => {
      let label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      let value = formData[key];
      if (key === 'comprehensive_insurance') {
        value = value ? 'Oui' : 'Non';
      }
      if (key === 'advance' || key === 'rest' || key === 'total_price') {
        value = value + ' DH';
      }
      if (key === 'duration' && value) {
        if (typeof value === 'object' && value.from && value.to) {
          value = `La durée est du ${format(new Date(value.from), 'dd/MM/yyyy')} au ${format(new Date(value.to), 'dd/MM/yyyy')}`;
        } else {
          value = `La durée est jusqu'au ${format(new Date(value), 'dd/MM/yyyy')}`;
        }
      }
      if (key === 'permis_city_id' && value) {
        value = cities.find((c) => c.id == value)?.city || '...';
      }
      if (key === 'reservation_id' && value) {
        return; // Skip reservation ID in the PDF 
      }
      addRow(label, value);
    });

    // Add signature section
    yPos += 15;
    doc.setFont('helvetica', 'bold');
    doc.text('Signature du loueur:', 20, yPos);
    doc.text('Signature du locataire:', 130, yPos);
    yPos += 5;
    doc.rect(20, yPos, 60, 20);
    doc.rect(130, yPos, 60, 20);

    // Add footer
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('Ce document constitue un contrat légal entre les parties mentionnées ci-dessus.', 105, 280, { align: 'center' });
    doc.setFontSize(16);

    setGeneratedPDF(doc); // Stocker le fichier PDF généré dans l'état
  };

  const downloadPDF = () => {
    if (generatedPDF) {
      generatedPDF.save('form-step1.pdf');
    }
  };


  const onSubmit = async (formData: Record<string, any>) => {
    // Add reservation ID to form data automatically

    const dataWithReservationId = {
      ...formData,
      reservation_id: reservation.id
    };

    if (state.step < totalSteps - 1) {
      if (state.step === 0 && dataWithReservationId) {
        generatePDF(dataWithReservationId);
        // try {
        //   const result = await dispatch(addContract(dataWithReservationId)).unwrap();
        //   if (result && result.status === 201) {
        //     updateState({ typeToast: 'success', contentToast: 'Contrat créé avec succès!' });
        //   }
        // } catch (error) {
          //   updateState({ typeToast: 'error', contentToast: 'Erreur lors de la création du contrat' });
          // }
          updateState({ step: state.step + 1 });
      } else if (state.step === 1) {
        // Move to the final review step
        updateState({ step: state.step + 1 });
      }
    } else if (state.step === 2) {
        // Step 2 - Final submission with PDF verification
        try {
          // Check if we have a file input element
          const fileInput = document.getElementById('contract-upload') as HTMLInputElement;
          
          if (fileInput && fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            
            // Verify it's a PDF file
            if (file.type === 'application/pdf') {
              console.log('yes');
              
              // Now we can proceed with the contract submission
              // Create form data to include the file
              // const contractFormData = new FormData();
              // contractFormData.append('pdf', file);
              // contractFormData.append('reservation_id', reservation.id.toString());
              
              // Here you would send the form data with the PDF to your API
              // For example:
              // await fetch('/api/contracts/upload', {
              //   method: 'POST',
              //   body: contractFormData
              // });
              
              // const result = await dispatch(addContract(dataWithReservationId)).unwrap();
              // if (result && result.status === 201) {
              //   updateState({ typeToast: 'success', contentToast: 'Contrat créé avec succès!' });
              //   updateState({ step: 0 });
              //   reset();
              // }
            } else {
              // Not a PDF
              updateState({ typeToast: 'error', contentToast: 'Veuillez télécharger un fichier PDF valide' });
              return; // Prevent form submission
            }
          } else {
            // No file selected
            updateState({ typeToast: 'error', contentToast: 'Veuillez télécharger le contrat signé' });
            return; // Prevent form submission
          }
        } catch (error) {
          console.error('Error submitting contract:', error);
          updateState({ typeToast: 'error', contentToast: 'Erreur lors de la création du contrat' });
        }
      } else {
      console.log(dataWithReservationId);
      updateState({ step: 0 });
      reset();

      toast.success("Form successfully submitted");
    }
  }

  const handleBack = () => {
    if (state.step > 0) {
      updateState({ step: state.step - 1 })
    }
  }

  const formFields = {
    0: [
      { placeholder: 'CIN', type: 'text', name: 'cin' },
      { placeholder: 'Numéro de permis', type: 'text', name: 'permis_number' },
      {
        placeholder: 'Ville de délivrance du permis', type: 'select', name: 'permis_city_id', options: [
          { value: '', label: 'Sélectionner une ville' },
          ...cities.map((city: any) => ({ value: city.id, label: city.city }))
        ]
      },
      { placeholder: 'Numéro de téléphone', type: 'tel', name: 'phone_number' },
      { placeholder: 'Adresse', type: 'text', name: 'address' },
      { placeholder: 'Avance', type: 'number', name: 'advance' },
      {
        placeholder: 'La durée',
        type: 'date',
        name: 'duration',
        value: {
          from: reservation?.rental_start ? new Date(reservation.rental_start) : undefined,
          to: reservation?.rental_end ? new Date(reservation.rental_end) : undefined
        },
        rental_start: reservation?.rental_start ? new Date(reservation.rental_start) : undefined,
        final_return: reservation?.rental_end ? new Date(reservation.rental_end) : undefined
      },
      { placeholder: 'Reste à payer', type: 'number', name: 'rest' },
      { placeholder: 'Prix total', type: 'number', name: 'final_price', value: reservation?.final_price ? parseFloat(reservation?.final_price) : undefined },
      { placeholder: 'Assurance tous risques', type: 'switch', name: 'comprehensive_insurance' },
    ],

    1: [
    ],

    2: [
    ]
  }

  const [date, setDate] = React.useState<DateRange | undefined>();

  const handleDateChange = (range: DateRange | undefined) => {
    setDate(range);
  };

  const [dropdownId, setDropdownId] = useState<number | null>(null);



  return (
    <>

      {state.typeToast ? (
        <ToastNotification
          type={state.typeToast}
          content={state.contentToast}
          width={state.width}
        />
      ) : null}

      {
        isOpen &&
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
                        <FormField
                          key={index}
                          control={form.control}
                          name={field.name}
                          render={({ field: controlledField }) => (
                            <FormItem className={cn(`grid gap-2 ${field.type == 'date' ? 'grid col-span-2 md:col-span-2' : ''} `)}>
                              <FormLabel className="text-gray-700">
                                {field.placeholder}
                              </FormLabel>

                              {field.type === 'date' ? (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      id="date"
                                      variant={"outline"}
                                      className={cn(
                                        "w-full border-gray-300 !mt-2.5 text-gray-900 justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                      )}
                                      onClick={() => updateState({ typeToast: '' })}
                                    >
                                      <CalendarIcon />
                                      {date?.from ? (
                                        date.to ? (
                                          <>
                                            {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                          </>
                                        ) : (
                                          format(date.from, "LLL dd, y")
                                        )
                                      ) : field?.value?.from ? (
                                        field.value.to ? (
                                          <>
                                            {format(field.value.from, "LLL dd, y")} - {format(field.value.to, "LLL dd, y")}
                                          </>
                                        ) : (
                                          format(field.value.from, "LLL dd, y")
                                        )
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="flex flex-col w-full p-0" align="start">
                                    <div className="p-3 bg-muted/20 border-b text-sm text-muted-foreground">
                                      <p>Sélectionnez la durée de location</p>
                                    </div>
                                    <Calendar
                                      initialFocus
                                      mode="range"
                                      defaultMonth={field?.rental_start || new Date()}
                                      selected={{
                                        from: controlledField.value?.from || field?.rental_start,
                                        to: controlledField.value?.to || field?.final_return
                                      }}
                                      onSelect={(range) => {
                                        controlledField.onChange(range);
                                        handleDateChange(range);
                                      }}
                                      numberOfMonths={2}
                                      className="p-3"
                                    />
                                    <div className="p-3 border-t text-xs text-muted-foreground italic">
                                      Cliquez et faites glisser pour sélectionner plusieurs jours
                                    </div>
                                  </PopoverContent>
                                </Popover>

                              ) : field.type === 'select' ?

                                (
                                  <Popover open={dropdownId === index}>
                                    <PopoverTrigger asChild>
                                      <Button
                                        type="button"
                                        role="combobox"
                                        variant={"outline"}
                                        aria-expanded={dropdownId === index}
                                        aria-haspopup="listbox"
                                        className="w-full border-gray-300 text-gray-800 justify-between"
                                        onClick={() => {
                                          setDropdownId(dropdownId === index ? null : index);
                                          updateState({ typeToast: '' })
                                        }
                                        }
                                      >
                                        {controlledField.value
                                          ? field.options?.find(option => option.value === controlledField.value)?.label
                                          : field.placeholder || "Sélectionner une ville"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                      <Command>
                                        <CommandInput placeholder="Rechercher une ville..." />
                                        <CommandList>
                                          <CommandEmpty>Aucune ville trouvée.</CommandEmpty>
                                          <CommandGroup>
                                            {field.options &&
                                              field.options.map((option) => (
                                                <CommandItem
                                                  key={option.value}
                                                  onSelect={() => {
                                                    controlledField.onChange(option.value);
                                                    updateState({ typeToast: '' });
                                                    setDropdownId(null);
                                                  }}
                                                >
                                                  {option.label}
                                                </CommandItem>
                                              ))}
                                          </CommandGroup>
                                        </CommandList>
                                      </Command>
                                    </PopoverContent>
                                  </Popover>
                                )
                                : field.type === 'switch' ? (
                                  <FormControl>
                                    <Switch
                                      checked={controlledField.value}
                                      onCheckedChange={controlledField.onChange}
                                      className="data-[state=checked]:bg-gray-600  !mt-0"
                                    />
                                  </FormControl>
                                ) : (
                                  <FormControl>
                                    <Input
                                      {...controlledField}
                                      value={controlledField.value || field.value || ''}
                                      type={field.type || 'text'}
                                      placeholder={field.placeholder || ''}
                                      className="border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all"
                                      onChange={(e) => {
                                        controlledField.onChange(e);
                                        updateState({ typeToast: '' });
                                      }}
                                    />
                                  </FormControl>
                                )}
                              <FormMessage />
                            </FormItem>

                          )}
                        />
                      ))
                      }
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"
                        onClick={() => {
                          updateState({ typeToast: '' });
                          handleBack();
                        }}
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
                    <div className="flex justify-center mt-4">
                      <Button
                        onClick={() => {
                          updateState({ typeToast: '' }),
                            downloadPDF()
                        }
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                      >
                        Télécharger le Contrat de location
                      </Button>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"
                        onClick={() => {
                          updateState({ typeToast: '' });
                          handleBack();
                        }}
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
                      <div className="mt-6 max-w-md mx-auto">
                      <label 
                        htmlFor="contract-upload" 
                        className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 hover:border-blue-500 group"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-10 h-10 mb-3 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                        </p>
                        <p className="text-xs text-gray-500">PDF uniquement (MAX. 10MB)</p>
                        </div>
                        <input 
                        id="contract-upload" 
                        type="file" 
                        className="hidden" 
                        accept="application/pdf" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                          // Handle the file upload here
                          console.log("File selected:", file.name);
                          // Create state for selected file if it doesn't exist yet
                          // const [selectedFile, setSelectedFile] = useState<File | null>(null);
                          if (file) {
                            updateState({ selectedFile: file });
                            updateState({ typeToast: '' });
                          }
                          }
                        }} 
                        />
                      </label>
                      </div>

                      {state.selectedFile && (
                        <div className="mt-3 flex items-center justify-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5 text-blue-500" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                            />
                          </svg>
                          <span className="text-sm text-blue-700 font-medium">
                            Fichier sélectionné: {state.selectedFile.name}
                          </span>
                        </div>
                      )}
                      
                      {/* File selection feedback */}
                      <div className="mt-3 text-center">
                        <p className="text-sm text-gray-600">
                        Téléchargez le contrat signé pour finaliser la réservation
                        </p>
                      {/* </div> */}
                      {/* </div> */}
                    </div>
                    </div>



                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"
                        onClick={() => {
                          updateState({ typeToast: '' });
                          handleBack();
                        }}
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