import React, { useState, useEffect, Dispatch, SetStateAction} from 'react';
import { AppBar, FormControl, Select, SelectChangeEvent, MenuItem, Toolbar, InputLabel, Button } from "@mui/material";
import axios from "axios";
import { Student,  SubjectCard } from '../../objects/objects';
import View from "./View";
import Compare from "./Compare";
import Calendar from "../Calendar/Calendar";
import AddStudentForm from '../Forms/AddStudentForm';
import AddSubjectForm from '../Forms/AddSubjectForm';




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
        });
    }, [scheduleView]);

   
    //Changes the Calender View // 
    const handleOptionChange = (e: SelectChangeEvent) => {
        const value = e.target.value
        setSchedule([])

        switch (value) {
            case "add":
                setScheduleView(
                    <>
                        <AddStudentForm/> 
                        <AddSubjectForm/>
                    </>
                
                );
                break;
            case "view":
                setScheduleView(<View students={students} setSchedule={setSchedule}/>);
                break;
            case "compare":
                setScheduleView(<Compare students={students} setSchedule={setSchedule}/>);
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
                            <MenuItem value="add">Add Student</MenuItem>
                            <MenuItem value="view">View Schedule</MenuItem>
                            <MenuItem value="compare">Compare Schedule</MenuItem>
                        </Select>
                    </FormControl>
                    {scheduleView}
                </Toolbar>
            </AppBar>

            <Calendar schedule={schedule} />
        </>

    )

}