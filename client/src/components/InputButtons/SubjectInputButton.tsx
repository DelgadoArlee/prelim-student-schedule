import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';


import { students, Subject, Student } from "../../fakedata/students";

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

export default function SubjectInputButton() {
    // make a current user useState

    // for modal window
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    // for day check boxes
    const [day, setDay] = React.useState({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
    });

    const selectDay = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDay({
            ...day,
            [event.target.name]: event.target.checked,
        });
    };

    const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } = day;
    //

    // for color dropdown
    const [color, setColor] = React.useState('');

    const dropdownColor = (event: SelectChangeEvent) => {
        setColor(event.target.value);
    };
    //


    const [studentArray, setStudentArray] = React.useState(students);

    // just for testing remove after
    function printStudentArray() {
        console.log(studentArray)
    }


    // include enter click function here
    function addSubject() {
        // setStudentArray([...studentArray,
        // {
        //     title: "Bruh",
        //     startTime: '5:00:00',
        //     endTime: "6:00:00",
        //     daysOfWeek: [5]
        // }])

        setStudentArray([...studentArray,
        {
            firstName: "Bruh",
            lastName: "Delgado",
            course: "BSSE",
            year: 3,
            schedule: []
        }])
        //^ this works bruh

        // )
        // students[0].schedule.push({
        //     title: "Bruh",
        //     startTime: '5:00:00',
        //     endTime: "6:00:00",
        //     daysOfWeek: [5]
        // })
        console.log('bruh')
        // console.log(studentArray)
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
                        Input the Subject's Details Here:
                        <TextField style={{ marginTop: 20 }}
                            id="subject-input-field"
                            label="Subject"
                            placeholder="Emath2200"
                            multiline
                        />
                        <TextField style={{ marginTop: 20 }}
                            id="subject-timeslot-start-input-field"
                            label="Timeslot Start Time"
                            placeholder="10:00:00"
                            multiline
                        />
                        <TextField style={{ marginTop: 20 }}
                            //error
                            id="subject-timeslot-end-input-field"
                            label="Timeslot End Time"
                            placeholder="12:00:00"
                            multiline
                        // helperText="Incorrect entry."
                        //^included error and helperText here idk how it'll be implemented yet
                        />

                        {/* Days Check Box */}
                        <FormControl style={{ marginTop: 20, width: '20ch' }} component="fieldset" variant="standard">
                            <FormLabel component="legend">Select Days</FormLabel>
                            <Select >
                                <FormGroup style={{ marginLeft: 20, width: '20ch' }}>

                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={sunday} onChange={selectDay} name="sunday" />
                                        }
                                        label="Sunday"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={monday} onChange={selectDay} name="monday" />
                                        }
                                        label="Monday"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={tuesday} onChange={selectDay} name="tuesday" />
                                        }
                                        label="Tuesday"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={wednesday} onChange={selectDay} name="wednesday" />
                                        }
                                        label="Wednesday"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={thursday} onChange={selectDay} name="thursday" />
                                        }
                                        label="Thursday"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={friday} onChange={selectDay} name="friday" />
                                        }
                                        label="Friday"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={saturday} onChange={selectDay} name="saturday" />
                                        }
                                        label="Saturday"
                                    />
                                </FormGroup>
                                <FormHelperText style={{ marginLeft: 20 }}>May select multiple days</FormHelperText>
                            </Select>
                        </FormControl>


                        {/*Color drop down */}
                        <FormControl style={{ marginTop: 20, width: '15ch' }}>
                            <InputLabel id="demo-simple-select-helper-label">Color</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={color}
                                label="Color"
                                onChange={dropdownColor}
                            >
                                <MenuItem style={{ color: 'red' }} value={'red'}>Red</MenuItem>
                                <MenuItem style={{ color: 'orange' }} value={'orange'}>Orange</MenuItem>
                                <MenuItem style={{ color: 'yellow' }} value={'yellow'}>Yellow</MenuItem>
                                <MenuItem style={{ color: 'green' }} value={'green'}>Green</MenuItem>
                                <MenuItem style={{ color: 'blue' }} value={'blue'}>Blue</MenuItem>
                                <MenuItem style={{ color: 'indigo' }} value={'indigo'}>Indigo</MenuItem>
                                <MenuItem style={{ color: 'violet' }} value={'violet'}>Violet</MenuItem>
                                <MenuItem style={{ color: 'pink' }} value={'pink'}>Pink</MenuItem>
                            </Select>

                        </FormControl>
                        {/* End of color dropdown */}


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
