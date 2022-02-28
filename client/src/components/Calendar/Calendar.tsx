import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import {  SubjectCard } from '../../objects/objects';





export default function Calendar(props: {schedule: SubjectCard[]}){
  
   return(
    <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        allDaySlot={false}
        slotEventOverlap
        dayHeaderFormat={{weekday: 'long'}}
        headerToolbar={{start:'', center: '', end: '' }}
        events={props.schedule} 
    />
   ) 
    
}