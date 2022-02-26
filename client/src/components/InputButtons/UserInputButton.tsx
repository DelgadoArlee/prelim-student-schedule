import React, { useState, useReducer, SetStateAction, SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Student } from "../../types/student";



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
    const [ firstNameError, setFirstNameError ] = useState(false);
    const [ lastNameError, setLastNameError ] = useState(false);
    const [ courseError, setCourseError ] = useState(false);
    const [ yearError, setYearError ] = useState(false);
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


    return (
        <div style={{ margin: 4 }}>
            <Button variant="contained" onClick={handleOpen}>Input User</Button>
            <Modal
                open={open}
                // onClose={handleClose}
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
                        {/* Fetch Code for the submit form, Currently not Sending to db, see api folder for api route code and controller for query code */}
                        <form onSubmit={e =>{
                            e.preventDefault()
                            console.log( formState)
                    
                            fetch(
                              'http://localhost:5000/student/createStudent',
                              {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(formState)
                              }
                            )
                            .then(res => res.json())
                            .then(data => console.log(data))
                            .catch( error => console.log(error))
                        }}> 

                            Input the User's Details Here:
                            <TextField style={{ marginTop: 20 }}
                                onChange={e =>  dispatch({key:'FirstName', value: e.target.value})}
                                id="firstname-input-field"
                                label="Firstname"
                                placeholder="Juan"
                                multiline
                                required
                                error={firstNameError}
                            />
                            <TextField style={{ marginTop: 20 }}
                                onChange={e => dispatch({key:'LastName', value: e.target.value})}
                                id="lastname-input-field"
                                label="Lastname"
                                placeholder="Garcia"
                                multiline
                                required
                                error={lastNameError}
                            />
                            <TextField style={{ marginTop: 20 }}
                                onChange={e => dispatch({key:'Course', value: e.target.value})}
                                id="course-input-field"
                                label="Course"
                                placeholder="BSSE"
                                multiline
                                required
                                error={courseError}
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
                                    onChange={e => dispatch({key:'Year', value: Number(e.target.value)})}
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
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}



