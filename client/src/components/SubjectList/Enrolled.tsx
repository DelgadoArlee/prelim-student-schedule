import React, { useState, SyntheticEvent} from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { 
    Box, 
    Button, 
    Modal, 
    TextField,
    Stack,
    Tabs,
    Tab
} from "@mui/material";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'SC', width: 70 },
    {
      field: 'title',
      headerName: 'SUBJECT',
      width: 150,
      editable: false,
    },
    {
      field: 'startTime',
      headerName: 'Start',
      width: 150,
      editable: false,
    },
    {
      field: 'endTime',
      headerName: 'Ends',
      type: 'number',
      width: 100,
      editable: false,
    },
    {
        field: 'daysOfWeek',
        headerName: 'Days',
        width: 100,
        editable: false,
      },

  ];
  
  //Rows
  const rows = [
    {
        id: 2313,
        title: "SE2226 - Lec",
        startTime: '14:00:00', 
        endTime:"16:00:00", 
        daysOfWeek: ["M", "T","W", "Th", "F", "S", "Sun"]
    },
    {   
        id: 2214,
        title: "SE2226 - Lec",
        startTime: '13:00:00', 
        endTime:"16:00:00", 
        daysOfWeek: ["Sat"],

    }

  ];





export default function EnrolledSubjects() {
    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                        
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection={true}
                    disableSelectionOnClick
                    onSelectionModelChange={(newSelectionModel) => {
                            console.log(newSelectionModel)
                            setSelectionModel(newSelectionModel);
                        }}
                    selectionModel={selectionModel}
                    />
            </div>
            <Stack sx={{gap:2, my:2}} direction="row-reverse">
                {/* Adds Subject to Student */}
                <Button sx={{mx: 1}} variant="contained">Remove Subject</Button>
             </Stack> 
        </>
        
    )
}