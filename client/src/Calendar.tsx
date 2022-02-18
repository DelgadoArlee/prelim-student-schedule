import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';

export default class Calendar extends React.Component {
    render() {
        return (
            <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                allDaySlot={false}
                slotEventOverlap={false}
                titleFormat={{ // Removes the month, year, and day in the title
                    month: undefined,
                    year: undefined,
                    day: undefined,
                    weekday: 'long'
                }}
                dayHeaderFormat={{
                    weekday: 'long'
                }}
                headerToolbar={{ end: '' }} //removes the today and left, right scrollers
            />
        )
    }
}