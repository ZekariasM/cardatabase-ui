import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {useState} from "react";
import { addCar } from "../api/carapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Car } from "../types";

export default function AddCar() {
    const queryClient = useQueryClient();
    const[open, setOpen] = useState(false);
    const[car, setCar] = useState < Car > ({
      brand: '',
      model: '',
      color: '',
      registrationNumber: '',
      modelYear: 0,
      price: 0
    })

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCar({...car, [event.target.name]: event.target.value})
    }

    const { mutate } = useMutation({
            mutationFn: addCar,
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['cars']})
            },
            onError: (err: Error) => {
                console.error(err);
            }
        })

    const handleSave = () => {
        mutate(car);
        setCar({brand: '', model: '', color: '', registrationNumber: '', modelYear: 0, price: 0});
        handleClose();
    }


    return ( < >
    <button onClick={handleOpen}>New Car</button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
            <input placeholder="Brand" name="brand" value={car.brand} onChange={handleChange}/> <br/>
            <input placeholder="Model" name="model" value={car.model} onChange={handleChange}/> <br/>
            <input placeholder="Color" name="color" value={car.color} onChange={handleChange}/> <br/>
            <input placeholder="Year" name="modelYear" value={car.modelYear} onChange={handleChange}/> <br/>
            <input placeholder="Reg.nr" name="registrationNumber" value={car.registrationNumber} onChange={handleChange}/> <br/>
            <input placeholder="Price" name="price" value={car.price} onChange={handleChange}/> <br/>
        </DialogContent>
        <DialogActions>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={handleSave}>Save</button>
        </DialogActions>

    </Dialog>
    </>
    )
}