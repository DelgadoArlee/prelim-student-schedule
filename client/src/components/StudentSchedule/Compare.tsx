import React, {useState, useEffect, Dispatch, SetStateAction} from "react";
import {  FormControl, Select, SelectChangeEvent, InputLabel, Button } from "@mui/material";
import axios from "axios";
import { mapToCards } from "../../helper/helpers"
import {  Subject, SubjectCard } from "../../objects/objects";


export default function Compare(props: {options: JSX.Element[], setSchedule: Dispatch<SetStateAction<SubjectCard[]>>}){
    const [studentA, setStudentA] = useState<number>();
    const [studentB, setStudentB] = useState<number>();
    const [subjectsA, setSubjectsA] = useState<Subject[]>([]);
    const [subjectsB, setSubjectsB] = useState<Subject[]>([]);


    // handles the select of 1st dropdown //
    const handleStudentAChange = (e: SelectChangeEvent) => {
        const id: number = Number(e.target.value)

        setStudentA(id)
    }

    // handles the select of 2nd dropdown //
    const handleStudentBChange = (e: SelectChangeEvent) => {
        const id: number = Number(e.target.value)
  

        setStudentB(id)
    }

    //gets subjects of Student A //
    useEffect(() => {
        axios.get(`http://localhost:5000/get/studentSubjects`, { params:{ id: studentA}})
        .then(res => {

            setSubjectsA(res.data)
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
      ;
    }, [studentA])

   // gets subjects of Student B // 
    useEffect(() => {
        axios.get(`http://localhost:5000/get/studentSubjects`, { params:{ id: studentB}})
        .then(res => {

            setSubjectsB(res.data)
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
      ;
    }, [studentB])

    //Compare Button handler
    const handleOnClick = () => props.setSchedule([...mapToCards(subjectsA, undefined, "blue", "black"), ...mapToCards(subjectsB, undefined, "red", "black")])



    return (
            <>
                <form>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>
                            <em>StudentA</em>
                        </InputLabel>
                        <Select autoWidth label="StudentA" onChange={handleStudentAChange} required>
                            {props.options}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>
                            <em>StudentB</em>
                        </InputLabel>
                        <Select autoWidth label="StudentB" onChange={handleStudentBChange} required >
                            {props.options}
                        </Select>
                        
                    </FormControl>
                    <FormControl sx={{mt: 2, mx: 1, minWidth: 120 }}>
                        <Button  variant="contained" onClick={handleOnClick} >Compare</Button>
                    </FormControl>
                    
                </form>        
            </>
    )        

}
