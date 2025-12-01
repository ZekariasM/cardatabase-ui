import { useState } from "react"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import type { Car, CarResponse, CarEntry } from "../types"
import CarDialogContent from "./CarDialogContent";
import { updateCar } from "../api/carapi";
import { useQueryClient, useMutation } from "@tanstack/react-query";

type FormProps = {
    cardata: CarResponse
}
export default function EditCar({ cardata } : FormProps) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0,
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCar({...car, [event.target.name]: event.target.value})
    }

    const handleClickOpen = () => {
        setCar({
            brand: cardata.brand,
            model: cardata.model,
            color: cardata.color,
            registrationNumber: cardata.registrationNumber,
            modelYear: cardata.modelYear,
            price: cardata.price
        });

        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
    }


    const { mutate } = useMutation({
        mutationFn: updateCar,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['cars']});
        },
        onError: (err: Error) => {
            console.error(err);
        }
    })

    const handleSave = () => {
        const url = cardata._links.self.href;
        const carEntry: CarEntry = {car, url}
        mutate(carEntry);
        setCar({brand: '', model: '', color: '', registrationNumber: '', modelYear: 0, price: 0});
        setOpen(false)
    }

    return (
        <>

        <Tooltip title="Edit car" >
        <IconButton aria-label="edit" size="small" 
        onClick={handleClickOpen}>
        <EditIcon fontSize="small" />
        </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit car</DialogTitle>
            <CarDialogContent car={car} handleChange={handleChange} />
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>

        </Dialog>
        </>
    )
}