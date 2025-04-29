"use client"
import ReservationList from "@/app/(components)/ReservationList";
import GeneratedForm from "@/app/(components)/GeneratedForm";
import { useState } from "react";

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
        console.log('reservation', res);
    }

    const closeMultiForm = () => {
        updateState({ isOpen: false } )
    }

    return (
        <>
            <ReservationList handleOpen={openMultipForm} />
            <GeneratedForm isOpen={state.isOpen} reservation={state.reservation} onClose={closeMultiForm}  />
        </>)
}

export default Reservations;