import React, { useState,  useReducer, ChangeEvent, FormEvent, Dispatch, SetStateAction } from 'react';
import { 
    Box, 
    Button, 
    Modal, 
    TextField, 
    InputLabel, 
    MenuItem, 
    FormControl, 
    Select, 
    SelectChangeEvent,
    FormLabel,
    FormGroup,
    FormControlLabel,
    FormHelperText,
    Checkbox,
    RadioGroup,
    Radio
} from "@mui/material"
import axios from 'axios';
import { Student, Subject, SubjectCard } from '../../objects/objects';
import { isPropsValid } from '@fullcalendar/react';


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
    width: '40ch'
};

type FormAction = {
    key: 'Title'
    value: string
} | {
    key: 'StartTime'
    value: string
} |  {
    key: 'EndTime'
    value: string
} |  {
    key: 'Days'
    value: number[]
} | {
    key: 'AllDay'
    value: boolean
}




export default function SubjectInputButton(props: { studentId?: number, setSchedule: Dispatch<SetStateAction<SubjectCard[]>>}) {
    const subjectFormReducer = (state: Subject, action: FormAction ) => {

        switch(action.key){
            case 'Title':
                return {
                    ...state,
                    studentId: props.studentId,
                    title: action.value
                }
            case 'StartTime':
                return {
                    ...state,
                    studentId: props.studentId,
                    startTime: action.value
                }
            case 'EndTime':
                return {
                    ...state,
                    studentId: props.studentId,
                    endTime: action.value
                }
            case 'Days':
                return {
                    ...state,
                    studentId: props.studentId,
                    days: action.value
                }
            case 'AllDay':
                return {
                    ...state,
                    studentId: props.studentId,
                    days: [0, 1, 2, 3, 4, 5, 6],
            }
            default:
                return state
    
        };
    }
    
    
    
    
    const [ formState, dispatch ] = useReducer(subjectFormReducer, {
        studentId: props.studentId,
        title: '',
        startTime: '',
        endTime: '',
        days: [],
        allDay: false
    })
    const [allDay, disableCheckboxes] = useState(false);
    
  
  

    // for modal window
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleDayCheck = (e: ChangeEvent<HTMLInputElement>) => {

        dispatch({
            key: "Days", 
            value: (e.target.checked)
            ? [...formState.days, Number(e.target.value)] 
            : [...formState.days].filter(i => i != Number(e.target.value))
        })  
    }

    const handleAllDayCheck = (e: ChangeEvent<HTMLInputElement> ) => {
        dispatch({ key: "AllDay", value: e.target.checked})
        disableCheckboxes(e.target.checked) 
    }

    const handleSubmit = ( e: FormEvent ) => {
        e.preventDefault();

        axios.post(
            'http://localhost:5000/post/subject',
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
            <Button variant="contained" onClick={handleOpen} disabled={typeof props.studentId == "undefined"}>Input Subject</Button>
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
                            onChange={e => dispatch({key:'Title', value: e.target.value})}
                            id="subject-input-field"
                            label="Subject"
                            placeholder="Emath2200"
                            multiline
                            required
                        />
                        <TextField style={{ marginTop: 20 }}
                            onChange={e => dispatch({key:'StartTime', value: e.target.value})}
                            id="subject-timeslot-start-input-field"
                            label="Timeslot Start Time"
                            placeholder="10:00:00"
                            multiline
                            required
                        />
                        <TextField style={{ marginTop: 20 }}
                            onChange={e => dispatch({key:'EndTime', value: e.target.value})}
                            id="subject-timeslot-end-input-field"
                            label="Timeslot End Time"
                            placeholder="12:00:00"
                            multiline
                            required
                        // helperText="Incorrect entry."
                        //^included error and helperText here idk how it'll be implemented yet
                        />

                        {/* Days Check Box */}
                        <FormControl sx={{mt:1}}>
                            <FormLabel id="demo-row-radio-buttons-group-label">Days</FormLabel>
                            <FormGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                            >
                                <FormControlLabel control={<Checkbox value={0} onChange={handleDayCheck} disabled={allDay}  />} label="Sun" />
                                <FormControlLabel control={<Checkbox value={1} onChange={handleDayCheck} disabled={allDay}  />} label="Mon" />
                                <FormControlLabel control={<Checkbox value={2} onChange={handleDayCheck} disabled={allDay}  />} label="Tue" />
                                <FormControlLabel control={<Checkbox value={3} onChange={handleDayCheck} disabled={allDay}  />} label="Wed" />
                                <FormControlLabel control={<Checkbox value={4} onChange={handleDayCheck} disabled={allDay}  />} label="Thurs" />
                                <FormControlLabel control={<Checkbox value={5} onChange={handleDayCheck} disabled={allDay}  />} label="Fri" />
                                <FormControlLabel control={<Checkbox value={6} onChange={handleDayCheck} disabled={allDay} />} label="Sat" />
                                <FormControlLabel control={<Checkbox onChange={handleAllDayCheck} /> } label="Everyday" />
                            </FormGroup>
                        </FormControl>
                    


                        <Button style={{ marginLeft: 20, marginTop: 25 }} variant="contained" type="submit" >Submit</Button>
                        {/*^button just for testing */}
                    </div>

                </Box>
            </Modal>
            </form>
        </div>
    );
}




