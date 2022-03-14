import React, {useState, useEffect, Dispatch, SetStateAction} from "react";
import {  FormControl, Select, SelectChangeEvent, InputLabel, MenuItem, Button  } from "@mui/material";
import axios from "axios";
import { Student, Subject, SubjectCard, SubjectRow } from "../../objects/objects";
import { mapSubjects, mapToCards, mapSubjectRow  } from "../../helper/helpers";
import SubjectList from "../SubjectList/SubjectList";
import StudentSchedule from "./StudentSchedule";



export default function View(props: {students: Student[], setSchedule: Dispatch<SetStateAction<SubjectCard[]>>}){
    const [studentId, setStudentId] = useState<number>(0);
    const [disableButton, activateButton] = useState(true)
    const [studentSubjects, setSubjects] = useState<Subject[]>([])
    const [enrolledRows, setRow] = useState<SubjectRow[]>([]);


    const studentOptions = props.students.map((student) => {
        let name = `${student.firstName}  ${student.lastName}`
        
        return (
            <MenuItem value={student.id}>{name}</MenuItem>
        )
    });
    
    // Sets the Id to the Student selected in the dropdown //
    const handleStudentChange = (e: SelectChangeEvent) => {
        setStudentId(Number(e.target.value))
        activateButton(false);


        console.log(studentId)
    };


    // fetches the subject of the selected student // 
    useEffect(() => {
        if (studentId > 0){
            axios.get(`http://localhost:5000/get/studentSubjects`, { params:{ id: studentId}})
                .then(res => setSubjects(mapSubjects(res.data[0].Subject)))
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
        
    }, [studentId])

   const handleOnClick = () => {
        props.setSchedule(mapToCards(studentSubjects))
    }

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel >
                    <em>Student</em>
                </InputLabel>
                <Select autoWidth label="Student" onChange={handleStudentChange}>
                    <MenuItem></MenuItem>
                    {studentOptions}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <SubjectList student={studentId} disabled={disableButton}/>
            </FormControl>
            <Button  
            variant="contained" 
            onClick={handleOnClick}
            disabled={disableButton}
            >
            View
            </Button>
        </>
    )
}