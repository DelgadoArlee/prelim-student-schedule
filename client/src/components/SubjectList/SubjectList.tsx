import React, { useState, SyntheticEvent} from 'react';
import { 
    Box, 
    Button, 
    Modal, 
    TextField,
    Stack,
    Tabs,
    Tab
} from "@mui/material"
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import axios from 'axios';
import NewSubjectForm from '../Forms/NewSubjectForm';
import { Subject, SubjectCard } from '../../objects/objects';
import { width } from '@mui/system';




const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'azure',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width: '100ch'
};

//Column Format
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




export default function SubjecList() {
    const defaultButtons = [
        <Button sx={{mx: 1, width: 100} } variant="contained">Add</Button>,
        <NewSubjectForm/>
     ]
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])
    const [buttons, setButtons] = useState(defaultButtons)

    const handleTabs = (e: SyntheticEvent, newValue: string) => {

        switch (newValue) {
            case "available":
                setButtons(defaultButtons)
                break;
            case "enrolled":
                setButtons([<Button variant="contained">Remove</Button>])
                break;
            
        }
    }

    return (
        <div style={{ margin: 4 }}>
            <Button variant="contained" onClick={handleOpen}>Add Subject</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    component="form"
                    sx={style}
                    noValidate
                    autoComplete="off"
                >
               
                    <div>
                        <TextField
                        sx={{my:2}}
                        fullWidth
                        size="small"
                        placeholder='Stub Code'
                        />  
                    </div>
                    <Tabs onChange={handleTabs}  >
                        <Tab sx={{border: 2,  borderStyle:"outset none none outset" }} value="available" label="Available"  wrapped />
                        <Tab sx={{border: 2,  borderStyle:"outset inset none none"}} value="enrolled" label="Enrolled" wrapped />
                    </Tabs>
                    <div style={{ height: 400, width: '100%' }}>
                        
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
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
                    {buttons}
                </Stack>
                </Box>
            </Modal>
        </div>
    )

}


