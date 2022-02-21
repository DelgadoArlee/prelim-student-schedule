import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { students, Subject } from "../../fakedata/students";





export default function Calendar(props: {subjects: Subject[]}){
    const subjects = [...props.subjects]
  
    
   return(
    <FullCalendar
    plugins={[timeGridPlugin]}
    initialView="timeGridWeek"
    allDaySlot={false}
    slotEventOverlap
    dayHeaderFormat={{weekday: 'long'}}
    headerToolbar={{start:'', center: '', end: '' }}
    events={subjects} 
/>
   ) 
    
}