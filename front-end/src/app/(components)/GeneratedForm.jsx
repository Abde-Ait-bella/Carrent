'use client'

import {
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
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  toast
} from 'sonner'
import {
  cn
} from '@/lib/utils'
import exp from 'constants'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

function GeneratedForm (){
  const [step, setStep] = useState(0)
  const totalSteps = 3

  const form = useForm()

  const {
    handleSubmit,
    control,
    reset
  } = form

  const onSubmit = async (formData) => {
    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      console.log(formData)
      setStep(0)
      reset()

      toast.success("Form successfully submitted")
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  return (
    <div className="space-y-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Open Form</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Multi form</AlertDialogTitle>
            <AlertDialogDescription>Current step {step + 1}</AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="flex items-center justify-center mb-4">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full transition-all duration-300 ease-in-out",
                    index <= step ? "bg-primary" : "bg-primary/30",
                    index < step && "bg-primary"
                  )}
                />
                {index < totalSteps - 1 && (
                  <div
                    className={cn(
                      "w-8 h-0.5",
                      index < step ? "bg-primary" : "bg-primary/30"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          
          {step === 0 && (
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
                {/* Form fields for step 1 */}
                
                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="font-medium"
                    size="sm"
                    onClick={handleBack}
                    disabled={step === 0}
                  >
                    Back
                  </Button>
                  <Button type="submit" size="sm" className="font-medium">
                    {step === 2 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </form>
            </Form>
          )}
          
          {step === 1 && (
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
                {/* Form fields for step 2 */}
                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="font-medium"
                    size="sm"
                    onClick={handleBack}
                    disabled={step === 0}
                  >
                    Back
                  </Button>
                  <Button type="submit" size="sm" className="font-medium">
                    {step === 2 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </form>
            </Form>
          )}
          
          {step === 2 && (
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
                {/* Form fields for step 3 */}
                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="font-medium"
                    size="sm"
                    onClick={handleBack}
                    disabled={step === 0}
                  >
                    Back
                  </Button>
                  <Button type="submit" size="sm" className="font-medium">
                    {step === 2 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default GeneratedForm;