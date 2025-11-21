import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { deleteCar, getCars } from "../api/carapi";
import type { GridCellParams, GridColDef } from '@mui/x-data-grid';
import  { DataGrid } from '@mui/x-data-grid';
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function Carlist() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const {data, error, isSuccess} = useQuery({
        queryKey: ["cars"],
        queryFn: getCars
    });

    const { mutate } = useMutation({
        mutationFn: deleteCar,
        onSuccess: () => {
            setOpen(true);
            queryClient.invalidateQueries({queryKey: ['cars']})
        },
        onError: (err: Error) => {
            console.error(err);
        }
    })

    const columns: GridColDef[] = [
        {field: 'brand', headerName: 'Brand', width: 100},
        {field: 'model', headerName: 'Model', width: 100},
        {field: 'color', headerName: 'Color', width: 100},
        {field: 'registrationNumber', headerName: 'Reg.nr.', width: 100},
        {field: 'modelYear', headerName: 'Model Year', width: 100},
        {field: 'price', headerName: 'Price', width: 100},
        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => 
                <EditCar cardata={params.row}/>
        },
        {
            field: 'delete',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <button
                onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${params.row.brand} ${params.row.model}?`)) {
                        mutate(params.row._links.car.href);
                    }
                }}>
                    Delete
                </button>
            )
        }
  
    ]

    if (!isSuccess) {
        return <span>Loading...</span>
    } else if (error) {
        return <span>Error when fetching data....</span>
    } else {
        return (
            <>
            <AddCar />
            <DataGrid
            rows={data}
            columns={columns}
            disableRowSelectionOnClick={true}
            getRowId={row => row._links.self.href}
            showToolbar
            />

            <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={() => setOpen(false)}
            message="Car deleted"
            />
            </>
         
        )

    }
}