import React, {useState, useEffect, Dispatch, SetStateAction} from "react";
import {  FormControl, Select, SelectChangeEvent, InputLabel, MenuItem  } from "@mui/material";
import axios from "axios";
import {  Subject, SubjectCard } from "../../objects/objects";
import { mapToCards } from "../../helper/helpers";


export default function View(props: {options: JSX.Element[], setSchedule: Dispatch<SetStateAction<SubjectCard[]>>}){
    const [student, setStudent] = useState<number>();
    

    const handleStudentChange = (e: SelectChangeEvent) => {
        const id: number = Number(e.target.value)

        setStudent(id)
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/get/studentSubjects`, { params:{ id: student}})
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
    }, [student])



    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel >
                    <em>Student</em>
                </InputLabel>
                <Select autoWidth label="Student" onChange={handleStudentChange}>
                    <MenuItem></MenuItem>
                    {props.options}
                </Select>
            </FormControl>

        </>
    )
}