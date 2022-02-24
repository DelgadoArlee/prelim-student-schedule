import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { students, Subject, Student } from "../../fakedata/students";


const getStudentsFromLS = () => {
    const data = localStorage.getItem('students');
    if (data) {
        return JSON.parse(data);
    }
    else {
        return []
    }
}


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

export default function UserInputButton(props: {students: Student[], setStudent: any}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [course, setCourse] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [courseError, setCourseError] = useState(false);
    const [year, setYear] = useState(9);

  




    // for modal window
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);




    // for year dropdown
    const dropdownYear = (event: SelectChangeEvent) => {
        setYear(parseInt(event.target.value));
    };
    //


    // just for testing remove after
    function printStudentArray() {
        console.log(students)
    }


    // include enter click function here
    function addSubject() {
        setFirstNameError(false)
        setLastNameError(false)
        setCourseError(false)

        if (firstName == '') {
            setFirstNameError(true)
        }

        if (lastName == '') {
            setLastNameError(true)
        }

        if (course == '') {
            setCourseError(true)
        }

        if (firstName && lastName && course) {
            localStorage.setItem('students', JSON.stringify([...props.students,
                {
                    firstName: firstName,
                    lastName: lastName,
                    course: course,
                    year: year,
                    schedule: []
                }]));
            props.setStudent(
            {
                firstName: firstName,
                lastName: lastName,
                course: course,
                year: year,
                schedule: []
            })
        }
        //^ this works bruh


        console.log('bruh')
    }

    return (
        <div style={{ margin: 4 }}>
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
                            onChange={(e) => setFirstName(e.target.value)}
                            id="firstname-input-field"
                            label="Firstname"
                            placeholder="Juan"
                            multiline
                            error={firstNameError}
                        />
                        <TextField style={{ marginTop: 20 }}
                            onChange={(e) => setLastName(e.target.value)}
                            id="lastname-input-field"
                            label="Lastname"
                            placeholder="Garcia"
                            multiline
                            error={lastNameError}
                        />
                        <TextField style={{ marginTop: 20 }}
                            onChange={(e) => setCourse(e.target.value)}
                            id="course-input-field"
                            label="Course"
                            placeholder="BSSE"
                            multiline
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
                                value={undefined}
                                label="Year"
                                onChange={dropdownYear}
                            >
                                <MenuItem value={1}>First Year</MenuItem>
                                <MenuItem value={2}>Second Year</MenuItem>
                                <MenuItem value={3}>Third Year</MenuItem>
                                <MenuItem value={4}>Fourth Year</MenuItem>
                                <MenuItem value={5}>Fifth Year</MenuItem>
                                <MenuItem value={0}>Irregular</MenuItem>
                            </Select>


                        </FormControl>
                        {/* End of year dropdown */}


                        <Button style={{ marginLeft: 20, marginTop: 25 }} variant="contained" onClick={addSubject}>Enter</Button>
                        <Button style={{ marginTop: 20 }} variant="contained" onClick={printStudentArray}>Print Array Test</Button>
                        {/*^button just for testing */}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}




// export default function CheckboxesGroup() {
//     const [state, setState] = React.useState({
//         gilad: true,
//         jason: false,
//         antoine: false,
//     });

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setState({
//             ...state,
//             [event.target.name]: event.target.checked,
//         });
//     };

    // const { gilad, jason, antoine } = state;
    // const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

//     return (
//         <Box sx={{ display: 'flex' }}>
//             <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
//                 <FormLabel component="legend">Assign responsibility</FormLabel>
//                 <FormGroup>
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
//                         }
//                         label="Gilad Gray"
//                     />
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={jason} onChange={handleChange} name="jason" />
//                         }
//                         label="Jason Killian"
//                     />
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
//                         }
//                         label="Antoine Llorca"
//                     />
//                 </FormGroup>
//                 <FormHelperText>Be careful</FormHelperText>
//             </FormControl>
//             <FormControl
//                 required
//                 error={error}
//                 component="fieldset"
//                 sx={{ m: 3 }}
//                 variant="standard"
//             >
//                 <FormLabel component="legend">Pick two</FormLabel>
//                 <FormGroup>
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
//                         }
//                         label="Gilad Gray"
//                     />
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={jason} onChange={handleChange} name="jason" />
//                         }
//                         label="Jason Killian"
//                     />
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
//                         }
//                         label="Antoine Llorca"
//                     />
//                 </FormGroup>
//                 <FormHelperText>You can display an error</FormHelperText>
//             </FormControl>
//         </Box>
//     );
// }






// export default function SelectLabels() {
//     const [age, setAge] = React.useState('');

//     const handleChange = (event: SelectChangeEvent) => {
//         setAge(event.target.value);
//     };

//     return (
//         <div>
//             <FormControl sx={{ m: 1, minWidth: 120 }}>
//                 <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
//                 <Select
//                     labelId="demo-simple-select-helper-label"
//                     id="demo-simple-select-helper"
//                     value={age}
//                     label="Age"
//                     onChange={handleChange}
//                 >
//                     <MenuItem value="">
//                         <em>None</em>
//                     </MenuItem>
//                     <MenuItem value={10}>Ten</MenuItem>
//                     <MenuItem value={20}>Twenty</MenuItem>
//                     <MenuItem value={30}>Thirty</MenuItem>
//                 </Select>
//                 <FormHelperText>With label + helper text</FormHelperText>
//             </FormControl>
//             <FormControl sx={{ m: 1, minWidth: 120 }}>
//                 <Select
//                     value={age}
//                     onChange={handleChange}
//                     displayEmpty
//                     inputProps={{ 'aria-label': 'Without label' }}
//                 >
//                     <MenuItem value="">
//                         <em>None</em>
//                     </MenuItem>
//                     <MenuItem value={10}>Ten</MenuItem>
//                     <MenuItem value={20}>Twenty</MenuItem>
//                     <MenuItem value={30}>Thirty</MenuItem>
//                 </Select>
//                 <FormHelperText>Without label</FormHelperText>
//             </FormControl>
//         </div>
//     );
// }






















// import * as React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// export default function DataInputFields() {

//     return (
        // <Box
        //     component="form"
        //     sx={{
        //         '& .MuiTextField-root': { m: 1, width: '25ch' },
        //     }}
        //     noValidate
        //     autoComplete="off"
        // >
        //     <div>
        //         <TextField
        //             id="subject-input-field"
        //             label="Subject"
        //             placeholder="sample subject"
        //             multiline
        //         />
        //         <TextField
        //             id="subject-timeslot-start-input-field"
        //             label="Timeslot Start Time"
        //             placeholder="sample valid time"
        //             multiline
        //         />
        //         <TextField
        //             //error
        //             id="subject-timeslot-end-input-field"
        //             label="Timeslot End Time"
        //             placeholder="sample valid time"
        //             multiline
        //         // helperText="Incorrect entry."
        //         //^included error and helperText here idk how it'll be implemented yet
        //         />
        //     </div>

        // </Box>
//     );
// }
