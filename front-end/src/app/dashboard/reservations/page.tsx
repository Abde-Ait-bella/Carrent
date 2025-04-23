"use client"
import {  Quicksand } from 'next/font/google'
import ReservationList from "@/app/(components)/ReservationList";
import GeneratedForm from "@/app/(components)/GeneratedForm";
// import { Button } from "@/components/ui/button"
import { useState } from "react";


// const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '700'] })

function Reservations() {

    const [state, setState] = useState({
        isOpen: false,
        reservation: null
    })

    const updateState = (newState: Partial<typeof state>) => {
        setState((prevState) => ({
            ...prevState,
            ...newState
        }))
    }

    const openMultipForm = (res: any) => {
        updateState({ isOpen: true, reservation: res } )
    }

    const closeMultiForm = () => {
        updateState({ isOpen: false } )
    }


    return (
        <>
            <ReservationList handleOpen={openMultipForm} />
            <GeneratedForm isOpen={state.isOpen} reservation={state.reservation} onClose={closeMultiForm}  />
            {/* <Button
                onClick={openMultipForm}
                variant='outline'
                className={`font-bold text-lg text-[#1b4569] ${quicksand.className}`}
            >
                Ajouter voiture
            </Button> */}

        </>)
}

export default Reservations;