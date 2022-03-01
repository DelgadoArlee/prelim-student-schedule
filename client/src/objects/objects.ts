interface Student{
    id?: number
    firstName:string
    lastName: string
    course:string
    year: number
}

interface Subject{
    studentId?: number
    title: string
    startTime: string
    endTime: string
    days: number[]
    allDay: boolean
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