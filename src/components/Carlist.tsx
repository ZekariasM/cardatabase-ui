import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { deleteCar, getCars } from "../api/carapi";
import type { GridCellParams, GridColDef } from '@mui/x-data-grid';
import  { DataGrid } from '@mui/x-data-grid';
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Carlist() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const {data, isError, isLoading, isSuccess} = useQuery({
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
        {field: 'brand', headerName: 'Brand', width: 125},
        {field: 'model', headerName: 'Model', width: 125},
        {field: 'color', headerName: 'Color', width: 125},
        {field: 'registrationNumber', headerName: 'Reg.nr.', width: 125},
        {field: 'modelYear', headerName: 'Model Year', width: 125},
        {field: 'price', headerName: 'Price', width: 125},
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
                <IconButton aria-label="delete" size="small"
                onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${params.row.brand} ${params.row.model}?`)) {
                        mutate(params.row._links.car.href);
                    }
                }}>
                   <DeleteIcon fontSize="small" />
                </IconButton>
            )
        }
  
    ]

    
  if (isLoading) {
    return <span>Loading...</span>
  }
  else if (isError) {
    return <span>Error when fetching cars...</span>
  }
  else if (isSuccess) {
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