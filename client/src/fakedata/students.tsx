
export interface Subject{
    title?: string
    startTime?: string
    endTime?: string
    allDay?: boolean
    daysOfWeek?: number[]
    color?: string
}

export interface Student{
    firstName:string
    lastName: string
    course:string
    year: number
    schedule:Subject[]
}

export const students: Student[] = [
    {
        firstName: "Arlee", 
        lastName: "Delgado", 
        course: "BSSE", 
        year: 3, 
        schedule:[
            {
                title: "Emath2200",
                startTime: '10:00:00', 
                endTime:"12:00:00", 
                daysOfWeek: [5]
            },
            {
                title: "SE2221 - Lec",
                startTime: '10:00:00', 
                endTime:"11:00:00", 
                daysOfWeek: [1, 2]
            },
            {
                title: "SE2221 - Lab",
                startTime: '10:00:00', 
                endTime:"13:00:00", 
                daysOfWeek: [4]
            },
            {
                title: "SE2222 - Lec",
                startTime: '7:00:00', 
                endTime:"9:00:00", 
                daysOfWeek: [4]
            },
            {
                title: "SE2222 - Lab",
                startTime: '7:00:00', 
                endTime:"10:00:00", 
                daysOfWeek: [5]
            },
            {
                title: "SE2223 - Lec",
                startTime: '7:00:00', 
                endTime:"10:00:00", 
                daysOfWeek: [1]
            },
            {
                title: "SE2223 - Lab",
                startTime: '7:00:00', 
                endTime:"10:00:00", 
                daysOfWeek: [2]
            },
            {
                title: "SE2224 - Lec",
                startTime: '19:00:00', 
                endTime:"20:30:00", 
                daysOfWeek: [1, 4]
            },
            {
                title: "SE2224 - Lab",
                startTime: '13:00:00', 
                endTime:"16:00:00", 
                daysOfWeek: [6]
            },
            {
                title: "SE2225 - Lec",
                startTime: '16:00:00', 
                endTime:"17:30:00", 
                daysOfWeek: [1, 5]
            },
            {
                title: "SE2225 - Lab",
                startTime: '16:00:00', 
                endTime:"17:30:00", 
                daysOfWeek: [2, 4]
            },
            {
                title: "SE2226 - Lec",
                startTime: '14:00:00', 
                endTime:"16:00:00", 
                daysOfWeek: [5]
            },
            {
                title: "SE2226 - Lec",
                startTime: '13:00:00', 
                endTime:"16:00:00", 
                daysOfWeek: [2]
            }
        
        ]
    },
    {
        firstName: "Von Jiktor", 
        lastName: "Ratossa", 
        course: "BSSE", 
        year: 1, 
        schedule:[
            {
                title: "Engg 1001",
                startTime: '7:00:00', 
                endTime:"9:00:00", 
                daysOfWeek: [1,5]
            },
            {
                title: "EMath 1101",
                startTime: '9:00:00', 
                endTime:"11:00:00", 
                daysOfWeek: [1,5]
            },
            {
                title: "EMath 1102",
                startTime: '13:30:00', 
                endTime:"15:30:00", 
                daysOfWeek: [1,5]
            },
            {
                title: "SE 1121",
                startTime: '15:30:00', 
                endTime:"17:30:00", 
                daysOfWeek: [1,5]
            },
            {
                title: "GESocSci 2",
                startTime: '8:30:00', 
                endTime:"10:00:00", 
                daysOfWeek: [2,4]
            },
            {
                title: "GEMath 1",
                startTime: '13:00:00', 
                endTime:"14:30:00", 
                daysOfWeek: [2,4]
            }, 
        ]
    },
    {
        firstName: "jaja", 
        lastName: "Delgado", 
        course: "BSSE", 
        year: 3, 
        schedule:[
            {
                title: "Emath2200",
                startTime: '10:00:00', 
                endTime:"12:00:00", 
                daysOfWeek: [5]
            },
            {
                title: "SE2221 - Lec",
                startTime: '10:00:00', 
                endTime:"11:00:00", 
                daysOfWeek: [1, 2]
            },
        
        
        ]
    }
]
