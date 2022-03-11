interface Student{
    id?: number
    firstName:string
    lastName: string
    course:string
    year: number
}

// interface Subject{
//     studentId?: number
//     title: string
//     startTime: string
//     endTime: string
//     days: number[]
//     allDay: boolean
// }

interface Subject {
    id: number
    studentId?: number
    type: string
    title: string
    startTime: string
    endTime: string
    days: number[]

}

interface SubjectRow {
    id: number
    title: string
    lecStart: string
    lecEnd: string
    lecDays: string[]
    labStart?: string
    labEnd?: string
    labDays?: string[]

}

interface SubjectCard {
    title: string
    startTime: string
    endTime: string
    daysOfWeek: number[]
    color?: string
    borderColor?: string
}


export type { Student, Subject, SubjectCard, SubjectRow };