import { useState } from "react"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import type { Car, CarResponse } from "../types"

type FormProps = {
    cardata: CarResponse
}
export default function EditCar({ cardata } : FormProps) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0,
    })

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = () => {
        setOpen(false)
    }
    return (
        <>
        <button onClick={handleClickOpen}>Edit</button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit car</DialogTitle>
            <DialogActions>
                <button onClick={handleClose}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </DialogActions>

        </Dialog>
        </>
    )
}