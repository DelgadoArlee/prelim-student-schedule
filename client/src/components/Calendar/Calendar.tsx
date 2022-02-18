
import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AppBar, FormControl, Select, SelectChangeEvent, MenuItem, Toolbar, InputLabel } from "@mui/material";
import { students, Subject } from "../../fakedata/students";


export default function Calendar(){
    const [index, setIndex] = useState(0);

    const studentOptions = students.map((student, index) => {
        let name = `${student.firstName}  ${student.lastName}`
        return (
            <MenuItem value={index}>{name}</MenuItem>
        )
    })

    const handleChange = (event: SelectChangeEvent<typeof index>) => {
        const {
          target: { value },
        } = event;
        setIndex(
          typeof value === 'string' ? parseInt(value) : value,
        );
      };

   

        return (
            <>
                <AppBar position= "static" color='transparent'>
                    <Toolbar>
                        <FormControl sx={{m: 1, minWidth: 120}}>
                            <InputLabel>
                                <em>Student</em>
                            </InputLabel>
                            <Select autoWidth label="Student" onChange={handleChange} >
                                {studentOptions}
                            </Select>
                        </FormControl>
                    </Toolbar>
                </AppBar>
                <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                allDaySlot={false}
                slotEventOverlap
                dayHeaderFormat={{weekday: 'long'}}
                headerToolbar={{start:'', center: '', end: '' }}
                events={students[index].schedule} //removes the today and left, right scrollers
            />
            </>
           
        )
    
}