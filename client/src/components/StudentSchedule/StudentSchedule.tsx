import React, { useState, useEffect, Dispatch, SetStateAction} from 'react';
import { AppBar, FormControl, Select, SelectChangeEvent, MenuItem, Toolbar, InputLabel, Button } from "@mui/material";
import axios from "axios";
import { Student,  SubjectCard } from '../../objects/objects';
import View from "./View";
import Compare from "./Compare";
import Calendar from "../Calendar/Calendar";
import UserInputButton from '../InputButtons/UserInputButton';



export default function StudentSchedule() {
    const [students, setStudents] = useState<Student[]>([]);
    const [scheduleView, setScheduleView] = useState<JSX.Element>();
    const [schedule, setSchedule] = useState<SubjectCard[]>([]);


    // Gets all Studnets from db //
    useEffect(() => {
        axios.get("http://localhost:5000/get/students")
        .then(res => setStudents(res.data))
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
      ;
    }, [])

    // Options for Dropdown menus //
    const studentOptions = students.map((student) => {
            let name = `${student.firstName}  ${student.lastName}`
        
                return (
                    <MenuItem value={student.id}>{name}</MenuItem>
                )
        })
   
    //Changes the Calender View // 
    const handleOptionChange = (e: SelectChangeEvent) => {
        const value = e.target.value
        setSchedule([])

        switch (value) {
            case "view":
                setScheduleView(<View options={studentOptions} setSchedule={setSchedule}/>);
                break;
            case "compare":
                setScheduleView(<Compare options={studentOptions} setSchedule={setSchedule}/>);
                break;
        }

    }
   

    
 
    return (
        <>
            <AppBar position="static" color='transparent'>
                <Toolbar>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>
                            <em>Options</em>
                        </InputLabel>
                        <Select autoWidth label="Options" onChange={handleOptionChange}  >
                            <MenuItem></MenuItem>
                            <MenuItem value="view">View Schedule</MenuItem>
                            <MenuItem value="compare">Compare Schedule</MenuItem>
                        </Select>
                    </FormControl>
                    {scheduleView}
                    <UserInputButton/>
                {/* <SubjectInputButton studentId={studentA} /> */}

                </Toolbar>
            </AppBar>

            <Calendar schedule={schedule} />
        </>

    )

}