import React, { 
    useState, 
    useEffect, 
    SyntheticEvent,
    FormEvent,
    Dispatch,
    SetStateAction
} from 'react';
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
import { SubjectCard,  SubjectRow } from '../../objects/objects';
import { mapSubjectRow,  removeConflicts } from "../../helper/helpers"


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'azure',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width: '120ch'
};

//Column Format
const columns: GridColDef[] = [
    { field: 'id', headerName: 'SC', width: 70, align: "center",},
    {
        field: 'title',
        headerName: 'SUBJECT',
        width: 150,
        align: "center",
        editable: false,
    },
    {
        field: 'lecStart',
        headerName: 'Lec Start',
        width: 90,
        align: "center",
        editable: false,
    },
    {
        field: 'lecEnd',
        headerName: 'Lec End',
        type: 'number',
        width: 90,
        align: "center",
        editable: false,
    },
    {
        field: 'lecDays',
        headerName: 'Lec Days',
        width: 150,
        align: "center",
        editable: false,
    },
    {
        field: 'labStart',
        headerName: 'Lab Start',
        width: 90,
        align: "center",
        editable: false,
    },
    {
        field: 'labEnd',
        headerName: 'Lab End',
        type: 'number',
        width: 90,
        align: "center",
        editable: false,
    },
    {
        field: 'labDays',
        headerName: 'Lab Days',
        width: 150,
        align: "center",
        editable: false,
    },

  ];
  
  //Rows

  

export default function SubjecList(props: {student?: number,  disabled?: boolean, setSchedule: Dispatch<SetStateAction<SubjectCard[]>>}) {
    const [table, setTable] = useState(" ");
    const [tableSelection, select] = useState<GridSelectionModel>([]);
    const [availableSubjects, setAvailable] = useState<SubjectRow[]>([]);
    const [enrolledSubjects, setEnrolled] = useState<SubjectRow[]>([]);
    const [ rows, setRows] = useState<any>([]);

    //Modal Window 
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    


    useEffect(() => {

        if(props.student && props.student > 0){
            axios.get(`http://localhost:5000/get/studentSubjects`, { params:{ id: props.student}})
            .then(res => setEnrolled(mapSubjectRow(res.data[0].Subject)))
            .catch( err => {
            if (err.response){
                console.log(err.response);
            } else if (err.request){
                console.log(err.request);
            } else{
                console.log(err.message);
            }
            console.log(err.config);
        });

        axios.get(`http://localhost:5000/get/availableSubjects`, { params:{ id: props.student}})
        .then(res => setAvailable(mapSubjectRow(res.data)))
        .catch( err => {
            if (err.response){
                console.log(err.response);
            } else if (err.request){
                console.log(err.request);
            } else{
                console.log(err.message);
            }
            console.log(err.config);
        });

        }
         
       
    }, [open])

    
    

    const handleTabs = (e: SyntheticEvent, newValue: string) => {
        const x = [[...availableSubjects],[...enrolledSubjects]]
        switch (newValue) {
            case "available" :
                setTable("available")
                setRows(removeConflicts([...availableSubjects], [...enrolledSubjects]))
                break;
            case "enrolled" :
                setTable("enrolled")
                setRows([...enrolledSubjects])
                break;

        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        switch (table) {
            case "available":
                axios.post(
                    'http://localhost:5000/post/addToStudent',
                    {
                        studentId: props.student,
                        subjectIds: tableSelection.map( id => {
                                return {id: id}
                            })
                    }
                )
                .then( res => {
                    console.log(res.data)
                    return res.data;
                })
                .catch( err => {
                    if (err.response){
                        console.log(err.response);
                    } else if (err.request){
                        console.log(err.request);
                    } else{
                        console.log(err.message);
                    }
                    console.log(err.config);
                })
                break;
            case "enrolled":
                axios.post(
                    'http://localhost:5000/post/remove',
                    {
                        studentId: props.student,
                        subjectIds: tableSelection.map( id => {
                                return {id: id}
                            })
                    }
                )
                .then( res => {
                    console.log(res.data)
                    return res.data;
                })
                .catch( err => {
                    if (err.response){
                        console.log(err.response);
                    } else if (err.request){
                        console.log(err.request);
                    } else{
                        console.log(err.message);
                    }
                    console.log(err.config);
                })
                break;
        }

        select([])
        handleClose()
        props.setSchedule([]);

      
    }

    const buttons = () => {

        switch (table) {
            case "available":
               return  <Button variant="contained" type="submit">Add</Button>
            case "enrolled":
                return <Button variant="contained" type="submit">Remove</Button>
        }
    }

    return (
        <div style={{ margin: 4 }}>
            <Button variant="contained" onClick={handleOpen} disabled={props.disabled}>
                Add Subject
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={style}
                    noValidate
                    autoComplete="off"
                >
               
                    <div>
                        {/* <TextField
                        sx={{my:2}}
                        fullWidth
                        size="small"
                        placeholder='Stub Code'
                        />   */}
                    </div>
                    <Tabs onChange={handleTabs} value={false}  >
                        <Tab sx={{border: 2,  borderStyle:"outset none none outset" }} value="available" label="Available"  wrapped />
                        <Tab sx={{border: 2,  borderStyle:"outset inset none none"}} value="enrolled" label="Enrolled" wrapped />
                    </Tabs>
                    <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection={true}
                    disableSelectionOnClick
                    onSelectionModelChange={(rowIds) => {
                            select(rowIds);
                                
                            console.log(tableSelection)
                        }}
                    selectionModel={tableSelection}
                    />
                </div>
                <Stack sx={{gap:2, my:2}} direction="row-reverse">
                    {buttons()}
                </Stack>
                </Box>
            </Modal>
        </div>
    )

}


