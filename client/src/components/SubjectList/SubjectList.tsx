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
import { Subject, SubjectCard } from '../../objects/objects';
import EnrolledSubjects from './Enrolled';
import AvailableSubjects from './Available';



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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])
    const [table, setTable] = useState(<AvailableSubjects/>)

    const handleTabs = (e: SyntheticEvent, newValue: string) => {

        switch (newValue) {
            case "available":
                setTable(<AvailableSubjects/>)
                break;
            case "enrolled":
                setTable(<EnrolledSubjects/>)
                break;
        }
    }

    return (
        <div style={{ margin: 4 }}>
            <Button variant="contained" onClick={handleOpen}>Input Subject</Button>
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
                    <Tabs onChange={handleTabs} >
                        <Tab sx={{border: 2,  borderStyle:"outset none none outset" }} value="available" label="Available"  wrapped />
                        <Tab sx={{border: 2,  borderStyle:"outset inset none none"}} value="enrolled" label="Enrolled" wrapped />
                    </Tabs>
                    {table}
                </Box>
            </Modal>
        </div>
    )

}


