import React, { useState, useEffect } from 'react';
import { AppBar, FormControl, Select, SelectChangeEvent, MenuItem, Toolbar, InputLabel, Button } from "@mui/material";
import { students, Subject, Student } from "../../fakedata/students";
import Calendar from "../Calendar/Calendar";
import colors from "../../styles/colors";
import SubjectInputButton from '../InputButtons/SubjectInputButton';
import UserInputButton from '../InputButtons/UserInputButton';

const getStudentsFromLS = () => {
    const data = localStorage.getItem('students');
    if (data) {
        return JSON.parse(data);
    }
    else {
        return []
    }
}

// var localStorageHasBeenRun = false;

export default function StudentSchedule() {

    // to be used as a prop for SubjectInputButton
    const [currentStudent, setCurrentStudent] = useState<Student>(
        {
            firstName: "Arlee",
            lastName: "Delgado",
            course: "BSSE",
            year: 3,
            schedule: [
                {
                    title: "Emath2200",
                    startTime: '10:00:00',
                    endTime: "12:00:00",
                    daysOfWeek: [5]
                },
                {
                    title: "SE2221 - Lec",
                    startTime: '10:00:00',
                    endTime: "11:00:00",
                    daysOfWeek: [1, 2]
                },
                {
                    title: "SE2221 - Lab",
                    startTime: '10:00:00',
                    endTime: "13:00:00",
                    daysOfWeek: [4]
                },
                {
                    title: "SE2222 - Lec",
                    startTime: '7:00:00',
                    endTime: "9:00:00",
                    daysOfWeek: [4]
                },
                {
                    title: "SE2222 - Lab",
                    startTime: '7:00:00',
                    endTime: "10:00:00",
                    daysOfWeek: [5]
                },
                {
                    title: "SE2223 - Lec",
                    startTime: '7:00:00',
                    endTime: "10:00:00",
                    daysOfWeek: [1]
                },
                {
                    title: "SE2223 - Lab",
                    startTime: '7:00:00',
                    endTime: "10:00:00",
                    daysOfWeek: [2]
                },
                {
                    title: "SE2224 - Lec",
                    startTime: '19:00:00',
                    endTime: "20:30:00",
                    daysOfWeek: [1, 4]
                },
                {
                    title: "SE2224 - Lab",
                    startTime: '13:00:00',
                    endTime: "16:00:00",
                    daysOfWeek: [6]
                },
                {
                    title: "SE2225 - Lec",
                    startTime: '16:00:00',
                    endTime: "17:30:00",
                    daysOfWeek: [1, 5]
                },
                {
                    title: "SE2225 - Lab",
                    startTime: '16:00:00',
                    endTime: "17:30:00",
                    daysOfWeek: [2, 4]
                },
                {
                    title: "SE2226 - Lec",
                    startTime: '14:00:00',
                    endTime: "16:00:00",
                    daysOfWeek: [5]
                },
                {
                    title: "SE2226 - Lec",
                    startTime: '13:00:00',
                    endTime: "16:00:00",
                    daysOfWeek: [2]
                }
            ]
        }
    ); //^ placeholder value so it won't be undefined

    //fake student data saved to ls
    // localStorage.setItem('students', JSON.stringify(students))
    // if (!localStorageHasBeenRun) {
    //     localStorage.setItem('students', JSON.stringify(students))
    //     localStorageHasBeenRun = true;
    // }

    const [studentArray, setStudentArray] = useState<Student[]>([...getStudentsFromLS()]);


    useEffect(() => {
        localStorage.setItem('students', JSON.stringify(studentArray));
    }, [studentArray])


    const [view, setView] = useState<string>("");

    const [schedule, setSchedule] = useState<Subject[]>([]);
    const [studentA, setStudentA] = useState<Student>();
    const [studentB, setStudentB] = useState<Student>();

    const studentOptions = studentArray.map((student, index) => {
        let name = `${student.firstName}  ${student.lastName}`

        return (
            <MenuItem value={index}>{name}</MenuItem>
        )
    })

    const setTitleAndColor = (subjects: Subject[], student: Student, color?: string, borderColor?: string) => {

        return [...subjects].map((subject: Subject, index: number) => {
            subject.color = (typeof color !== "undefined") ? color : colors[index]
            subject.title = ''
            subject.title = `${subject.title} - ${student.firstName}  ${student.lastName}`

            if (borderColor) {
                subject.borderColor = borderColor
            }

            return subject;
        })


    };


    const handleOptionChange = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event

        switch (value) {
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

        const student = studentArray[index];

        setSchedule(setTitleAndColor([...student.schedule], student));

        setCurrentStudent(student); // sets a value for the prop to be used for the subjectInputButton

        console.log(studentArray) // added this for testing to be removed
        console.log(student)
        console.log([...getStudentsFromLS()]) // added this for testing to be removed
    };


    const updateStudentArray = () => {
        setStudentArray([...getStudentsFromLS()])
        return ''
    }

    // handles input to paased to usernInput component

    const handleStudentInput = (input?: Student) => {
        setStudentArray([...studentArray, input!]);
    }


    const handleStudentAChange = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;

        const index: number = parseInt(value);

        setStudentA(studentArray[index])
    }

    const handleStudentBChange = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;

        const index: number = parseInt(value);

        setStudentB(studentArray[index])
    }

    const compare = () => {
        const scheduleA: Subject[] = setTitleAndColor([...studentA!.schedule], studentA!, "", "red")
        const scheduleB: Subject[] = setTitleAndColor([...studentB!.schedule], studentB!, "black", "red")

        setSchedule([...scheduleA, ...scheduleB])
    }

    const scheduleView = () => {
        let element: JSX.Element = <></>

        switch (view) {
            case "view":
                element =
                    <>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel >
                                <em>Student</em>
                            </InputLabel>
                            <Select autoWidth label="Student" onChange={handleStudentChange} onMouseOver={updateStudentArray}>
                                {studentOptions}
                            </Select>
                        </FormControl>
                        <UserInputButton />
                        <SubjectInputButton student={currentStudent} />
                    </>
                break;
            case "compare":
                element =
                    <>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>
                                <em>StudentA</em>
                            </InputLabel>
                            <Select autoWidth label="StudentA" onChange={handleStudentAChange}>
                                {studentOptions}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>
                                <em>StudentB</em>
                            </InputLabel>
                            <Select autoWidth label="StudentB" onChange={handleStudentBChange} >
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
            <AppBar position="static" color='transparent'>
                <Toolbar>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
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