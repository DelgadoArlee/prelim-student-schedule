import React, {   
    useReducer, 
    ChangeEvent, 
    FormEvent, 
    Dispatch, 
    SetStateAction 
} from 'react';
import { 
    Box,
    Divider,
    Stack, 
    Button, 
    Modal, 
    TextField, 
    FormControl, 
    FormLabel,
    FormGroup,
    FormControlLabel,
    Radio,
    RadioGroup,
    Checkbox,

} from "@mui/material"
import axios from 'axios';
import { Student, Subject, SubjectCard } from '../../objects/objects';



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
    key: "Lecture"
    value: boolean
} | {
    key: "Lab"
    value: boolean
};




export default function SubjectForm(props: { studentId?: number, setSchedule?: Dispatch<SetStateAction<SubjectCard[]>>}) {
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
            <Button variant="contained" onClick={handleOpen} >Create Subject</Button>
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
                        <Divider sx={{my: 2}}/>
                        <FormControl required>
                            <FormLabel color="info">Type</FormLabel>
                            <RadioGroup row>
                                <FormControlLabel value="Lecture"control={<Radio size="small"  />} label="Lecture" />
                                <FormControlLabel value="Lab" control={<Radio size="small" />} label="Lab" />
                            </RadioGroup>
                        </FormControl>
                        <TextField sx={{ mt: 1 }}
                            onChange={e => dispatch({key:'Title', value: e.target.value})}
                            id="subject-stub-input-field"
                            variant="standard"
                            label="Stub Code"
                            size="small"
                            placeholder="Emath2200"
                            fullWidth
                            multiline
                            required
                        />
                        <TextField sx={{ mt: 2 }}
                            onChange={e => dispatch({key:'Title', value: e.target.value})}
                            id="subject-input-field"
                            variant="standard"
                            label="Subject"
                            size="small"
                            placeholder="Emath2200"
                            fullWidth
                            multiline
                            required
                        />

                        <TextField  sx={{ mt: 2 }}
                            onChange={e => dispatch({key:'StartTime', value: e.target.value})}
                            id="subject-timeslot-start-input-field"
                            variant="standard"
                            label="Timeslot Start Time"
                            placeholder="10:00:00"
                            size="small"
                            fullWidth
                            multiline
                            required
                        />

                        <TextField  sx={{ mt: 2 }}
                            onChange={e => dispatch({key:'EndTime', value: e.target.value})}
                            id="subject-timeslot-end-input-field"
                            variant="standard"
                            label="Timeslot End Time"
                            placeholder="12:00:00"
                            size="small"
                            fullWidth
                            multiline
                            required
                        // helperText="Incorrect entry."
                        //^included error and helperText here idk how it'll be implemented yet
                        />

                        {/* Days Check Box */}
                        <Divider sx={{mt: 3}}/>
                        <Stack direction="row" >
                            <FormControl sx={{mt:1}} >
                                <FormLabel id="demo-row-radio-buttons-group-label" >Days</FormLabel>
                                <FormGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    
                                >
                                    <FormControlLabel control={<Checkbox value={0} onChange={handleDayCheck}  />} label="Sun" />
                                    <FormControlLabel control={<Checkbox value={1} onChange={handleDayCheck}  />} label="Mon" />
                                    <FormControlLabel control={<Checkbox value={2} onChange={handleDayCheck}  />} label="Tue" />
                                    <FormControlLabel control={<Checkbox value={3} onChange={handleDayCheck}  />} label="Wed" />
                                    <FormControlLabel control={<Checkbox value={4} onChange={handleDayCheck}  />} label="Thurs" />
                                    <FormControlLabel control={<Checkbox value={5} onChange={handleDayCheck}  />} label="Fri" />
                                    <FormControlLabel control={<Checkbox value={6} onChange={handleDayCheck}  />} label="Sat" />
                                </FormGroup>
                            </FormControl>
                        </Stack>
                        <Stack>
                            <Button style={{ marginLeft: 20, marginTop: 25 }} variant="contained" onClick={() => console.log(formState)} >Submit</Button>
                        </Stack>
                        {/*^button just for testing */}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}




