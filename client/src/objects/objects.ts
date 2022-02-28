interface Student{
    id?: number
    firstName:string
    lastName: string
    course:string
    year: number
}

interface Subject{
    id?: string
    title: string
    startTime: string
    endTime: string
    days: number[]
    allDay: boolean
    color?: string
    borderColor?: string
}

interface SubjectCard {
    title: string
    startTime: string
    endTime: string
    daysOfWeek: number[]
    allDay: boolean
    color?: string
    borderColor?: string
}


export type { Student, Subject, SubjectCard };