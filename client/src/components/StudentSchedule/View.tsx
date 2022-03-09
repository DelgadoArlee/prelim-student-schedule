import React, {useState, useEffect, Dispatch, SetStateAction} from "react";
import {  FormControl, Select, SelectChangeEvent, InputLabel, MenuItem  } from "@mui/material";
import axios from "axios";
import { Student, Subject, SubjectCard } from "../../objects/objects";
import { mapToCards } from "../../helper/helpers";
import SubjectList from "../SubjectList/SubjectList";



export default function View(props: {students: Student[], setSchedule: Dispatch<SetStateAction<SubjectCard[]>>}){
    const [studentId, setStudentId] = useState<number>();
    const [disableButton, activateButton] = useState(true)


    const studentOptions = props.students.map((student) => {
        let name = `${student.firstName}  ${student.lastName}`
        
        return (
            <MenuItem value={student.id}>{name}</MenuItem>
        )
    });
    
    // Sets the Id to the Student selected in the dropdown //
    const handleStudentChange = (e: SelectChangeEvent) => {
        activateButton(false);
        const id: number = Number(e.target.value)

        setStudentId(id)
    };


    // fetches the subject of the selected student // 
    useEffect(() => {
        axios.get(`http://localhost:5000/get/studentSubjects`, { params:{ id: studentId}})
        .then(res => props.setSchedule(mapToCards(res.data)))
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
    }, [studentId])



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
            
        </>
    )
}