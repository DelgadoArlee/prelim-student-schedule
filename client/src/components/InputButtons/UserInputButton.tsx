import React, { useState, useReducer, FormEvent, Dispatch, SetStateAction } from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Student } from "../../objects/objects";



const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'azure',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    // m: 2,
    width: '30ch',
};


type FormAction = {
    key: 'LastName'
    value: string
} | {
    key: 'FirstName'
    value: string
} |  {
    key: 'Course'
    value: string
} |  {
    key: 'Year'
    value: number
};

const valid  = ( value: string | number  ) => typeof value == "string"? value != '':  typeof value != "undefined";

const studentFormReducer = (state: Student, action: FormAction) => {
    console.log(state)
    switch (action.key) {
        case 'LastName':
            return {
                ...state,
                lastName: action.value
            }
        case 'FirstName':
            return {
                ...state,
                firstName: action.value
            }
        case 'Course':
            return {
                ...state,
                course: action.value
            }
        case 'Year':
            return {
                ...state,
                year: action.value
            }
        default:
             return state
    }   
}



export default function UserInputButton() {
    const [formState, dispatch] = useReducer(studentFormReducer, {
        lastName: '', 
        firstName: '', 
        course: '', 
        year: 0
    })

    // for modal window
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = ( e: FormEvent ) => {
        e.preventDefault();

        axios.post(
            'http://localhost:5000/post/student',
            formState
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
      
    }


    return (
        <div style={{ margin: 4 }}>
            <form onSubmit={handleSubmit}> 
            <Button variant="contained" onClick={handleOpen}>Input User</Button>
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
                            Input the User's Details Here:
                            <TextField style={{ marginTop: 20 }}
                                onChange={e =>  dispatch({key:'FirstName', value: e.target.value})}
                                id="firstname-input-field"
                                label="Firstname"
                                placeholder="Juan"
                                value={formState.firstName}
                                multiline
                                required

                            />
                            <TextField style={{ marginTop: 20 }}
                                onChange={e => dispatch({key:'LastName', value: e.target.value})}
                                id="lastname-input-field"
                                label="Lastname"
                                placeholder="Garcia"
                                value={formState.lastName}
                                multiline
                                required

                            />
                            <TextField style={{ marginTop: 20 }}
                                onChange={e => dispatch({key:'Course', value: e.target.value})}
                                id="course-input-field"
                                label="Course"
                                placeholder="BSSE"
                                value={formState.course}
                                multiline
                                required

                            // helperText="Incorrect entry."
                            //^included error and helperText here idk how it'll be implemented yet
                            />

                            {/*Year drop down */}
                            <FormControl style={{ marginTop: 20, width: '15ch' }}>
                                <InputLabel id="demo-simple-select-helper-label">Year Level</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    label="Year"
                                    value={formState.year}
                                    onChange={e => dispatch({key:'Year', value: Number(e.target.value)})}
                                    required
                                >
                                    <MenuItem value={1}>First Year</MenuItem>
                                    <MenuItem value={2}>Second Year</MenuItem>
                                    <MenuItem value={3}>Third Year</MenuItem>
                                    <MenuItem value={4}>Fourth Year</MenuItem>
                                    <MenuItem value={5}>Fifth Year</MenuItem>
                                    <MenuItem value={6}>Irregular</MenuItem>
                                </Select>


                            </FormControl>
                            <Button style={{ marginLeft: 20, marginTop: 25 }} variant="contained" type="submit">Submit</Button>
                      
                    </div>
                </Box>
            </Modal>
            </form>
        </div>
    );
}



