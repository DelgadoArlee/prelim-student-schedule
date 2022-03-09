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

interface SubjectForm {
    id: number
    studentId?: number
    type: string
    title: string
    startTime: string
    endTime: string
    days: number[]

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


export type { Student, Subject, SubjectForm, SubjectCard };