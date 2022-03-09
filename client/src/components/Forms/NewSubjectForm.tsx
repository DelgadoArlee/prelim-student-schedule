import React, { 
    useState,  
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
    InputLabel,
    Radio,
    RadioGroup,
    Checkbox,
    Select,
    MenuItem,
    SelectChangeEvent

} from "@mui/material"
import axios from 'axios';
import { Student, SubjectForm, SubjectCard } from '../../objects/objects';
import { isNumberObject } from 'util/types';



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
    key: "Id"
    value: number
} | {
    key: "StudentId"
    value: number | undefined
} | {
    
    key: 'Title'
    value: string
} | {
    key: "Type"
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
};


export default function NewSubjectForm(
    props: { 
        student?: number, 
        setSchedule?: Dispatch<SetStateAction<SubjectCard[]>>
    }) {
    console.log(props.student)
    //Form Reducer
    const subjectFormReducer = (state: SubjectForm, action: FormAction ) => {
        console.log(state)
        switch(action.key){
            case "Id":
                return{
                    ...state,
                    id: action.value
                }
                case "StudentId":
                return {
                    ...state,
                    studentId: action.value
                }
            case 'Title':
                return {
                    ...state,
                    title: action.value.toUpperCase()
                }
            case "Type":
                return {
                    ...state,
                    type: action.value == "lec"? "LEC" : "LAB"
                }
            case 'StartTime':
                return {
                    ...state,
                    startTime: action.value
                }
            case 'EndTime':
                return {
                    ...state,
                    endTime: action.value
                }
            case 'Days':
                return {
                    ...state,
                    days: action.value
                }
            default:
                return state
    
        };
    }
    
    const [ formState, dispatch ] = useReducer(subjectFormReducer, {
        id: 0,
        studentId: 0,
        title: '',
        type: '',
        startTime: '',
        endTime: '',
        days: [],
    })

    //Modal Window
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        console.log(props.student)
        setOpen(true)
        dispatch({key: "StudentId", value: props.student})
    };
    const handleClose = () => setOpen(false);
    

    //TIme Select Options
    const time = () => {
        const options: JSX.Element[] = [];

        for (let i = 1; i < 24; i++){
            for (let j = 0; j < 2; j++){
                const minutes = (j == 1)? 30 : "00";
                options.push( <MenuItem value={`${i}:${minutes}`}>{i}:{minutes}</MenuItem>)
            }
            
        }

        return options
    }

    const [startTimeOptions, setStartOptions] = useState(time())
    const [endTimeOptions, setEndOptions] = useState(time())

    //Time Select
    const handleTimeSelect = (value: string, key: string) => {
        

        switch (key) {
            case "start":
                dispatch({key:'StartTime', value: value})
                setEndOptions(startTimeOptions.filter(option => option.props.value !== value))
                break;
            case "end":
                dispatch({key:'EndTime', value: value})
                setStartOptions(startTimeOptions.filter(option => option.props.value !== value))
                break;
            default:
                break;
        }
    }

    //Checkbox Event Handler
    const handleDayCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        if(formState.days.includes(value)){
            dispatch({
                key: "Days", 
                value: [...formState.days, value] 
            })
        }
        
        
    
    }

    //Form Submit Event Handler
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
        
        handleClose()
      
    }

   

    return (
        <div>
            <Button variant="contained" onClick={handleOpen} >New Subject</Button>
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
                    <Stack>
                        Input the Subject's Details Here:
                        <Divider sx={{my: 2}}/>
                        <FormControl required>
                            <FormLabel color="info">Type</FormLabel>
                            <RadioGroup 
                            row 
                            onChange={e => dispatch({key: "Type", value: e.target.value})}
                            >
                                <FormControlLabel value="lec"control={<Radio size="small"  />} label="Lecture" />
                                <FormControlLabel value="lab" control={<Radio size="small" />} label="Lab" />
                            </RadioGroup>
                        </FormControl>
                        <TextField sx={{ mt: 1 }}
                            onChange={
                                e => dispatch({key:"Id", value: Number(e.target.value)})
                            }
                            id="subject-stub-input-field"
                            variant="standard"
                            label="Stub Code"
                            size="small"
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
                        <Stack sx={{ mt:1, gap:3, minWidth: 150}} direction="row">
                        <FormControl sx={{mt:2, width: 150, textAlign: "center"}}>
                            <InputLabel id="start-time-select-label">Start Time</InputLabel>
                                <Select
                                    labelId="start-time-select-label"
                                    id="start-time-select"
                                    label="Year"
                                    variant="standard"
                                    value={formState.startTime}
                                    onChange={e => handleTimeSelect(e.target.value, "start")}
                                    fullWidth
                                    required
                                >
                                    {startTimeOptions}
                                </Select>
                        </FormControl>
                        <FormControl sx={{mt:2, width: 150, textAlign: "center"}}>
                            <InputLabel id="end-time-select-label">End Time</InputLabel>
                                <Select
                                    labelId="end-time-select-label"
                                    id="end-time-select"
                                    label="Year"
                                    variant="standard"
                                    value={formState.endTime}
                                    onChange={e => handleTimeSelect(e.target.value, "end")}
                                    fullWidth
                                    required
                                >
                                    {endTimeOptions}
                                </Select>


                        </FormControl>
                        </Stack>
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
                            <Button style={{ marginLeft: 20, marginTop: 25 }} variant="contained" type="submit" >Submit</Button>
                        </Stack>
                        {/*^button just for testing */}
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}




