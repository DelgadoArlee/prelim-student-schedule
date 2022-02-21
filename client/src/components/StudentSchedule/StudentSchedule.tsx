import React, {useState} from 'react';
import { AppBar, FormControl, Select, SelectChangeEvent, MenuItem, Toolbar, InputLabel, Button } from "@mui/material";
import { students, Subject, Student } from "../../fakedata/students";
import Calendar from "./Calendar";
import colors from "../../styles/colors";


export default function StudentSchedule(){
    const [view, setView] = useState<string>("");
    const [studentArray, setStudentArray] = useState<Student[]>([...students]);
    const [schedule, setSchedule] = useState<Subject[]>([]); 
    const [studentA, setStudentA] = useState<Student>();
    const [studentB, setStudentB] = useState<Student>();

    const studentOptions = studentArray.map((student, index) => {
        let name = `${student.firstName}  ${student.lastName}`
        return (
            <MenuItem value={index}>{name}</MenuItem>
        )
    })

    const setColor = (subject:Subject, index: number) =>  {
    
        subject.color = (view === "compare")? "red":colors[index] 
        return subject;
    };


    const handleOptionChange = (event: SelectChangeEvent) => {
        const {
            target: { value },
          } = event

        switch (value){
            case "view":
                setView("view");
                break;
            case "compare":
                setView("compare");
                break;
        }
       
    }

    const handleStudentChange = (event: SelectChangeEvent) => {
        
        const {
          target: { value },
        } = event;
        
        const index: number = parseInt(value);

        const subjects: Subject[] = [...studentArray[index].schedule].map(setColor)
        
        setSchedule(subjects);
    };

    const handleStudentCompareChange = (event: SelectChangeEvent) => {
        const {
            target: { value },
          } = event;
        
        const index: number = parseInt(value);

        if (typeof studentA !== "undefined" ){
            setStudentB(studentArray[index]);
        }else{
            setStudentA(studentArray[index]);
        }
    }

    const compare = () => {
       const scheduleA: Subject[] = [...studentA!.schedule].map( subject => {
        subject.color = "blue";
        return subject
        });
       const scheduleB: Subject[] = [...studentB!.schedule].map( subject => {
           subject.color = "red";
           return subject
       });

        setSchedule([...scheduleA,...scheduleB])
    }

    const scheduleView = () => {
        let element: JSX.Element = <></>

        switch(view){
            case "view":
                element =
                <>
                    <FormControl sx={{m: 1, minWidth: 120}}>
                            <InputLabel>
                                <em>Student</em>
                            </InputLabel>
                            <Select autoWidth label="Student" onChange={handleStudentChange} >
                                {studentOptions}
                            </Select>
                    </FormControl>
                </>   
                break;
            case "compare":
                element =
                    <>
                        <FormControl sx={{m: 1, minWidth: 120}}>
                                <InputLabel>
                                    <em>StudentA</em>
                                </InputLabel>
                                <Select autoWidth label="StudentA" onChange={handleStudentCompareChange} >
                                    {studentOptions}
                                </Select>
                        </FormControl>
                        <FormControl sx={{m: 1, minWidth: 120}}>
                            <InputLabel>
                                <em>StudentB</em>
                            </InputLabel>
                            <Select autoWidth label="StudentB" onChange={handleStudentCompareChange} >
                                {studentOptions}
                            </Select>
                        </FormControl>
                        <Button variant="contained" onClick={compare}>Compare</Button>
                    </>
                break;
        }

        return element;
    }

   

        return (
            <>
                <AppBar position= "static" color='transparent'>
                    <Toolbar>
                    <FormControl sx={{m: 1, minWidth: 120}}>
                            <InputLabel>
                                <em>Options</em>
                            </InputLabel>
                            <Select autoWidth label="Options" onChange={handleOptionChange} >
                                <MenuItem value="view">View Schedule</MenuItem>
                                <MenuItem value="compare">Compare Schedule</MenuItem>
                            </Select>
                        </FormControl>
                        {scheduleView()}
                    </Toolbar>
                </AppBar>
                
                <Calendar subjects={schedule} />
            </>
           
        )
    
}