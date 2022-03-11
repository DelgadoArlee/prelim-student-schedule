import prisma from "../services/database";
import { Student } from "@prisma/client";
import { connect } from "http2";



//inserts a student
const createStudent = ({id, lastName, firstName, course, year,  }: Student ) => {

    return prisma.student.create({
        data:{
            id,
            lastName,
            firstName,
            course,
            year,
        }
    })
}

//gets all students
const getStudents =  () => prisma.student.findMany();

const getSubjects = async ( id: number) => {
    return prisma.student.findMany({
        where:{
            id: id
        },
        select:{
            Subject: {
                select:{
                    id: true,
                    title: true,
                    Lecture:{
                        select:{
                            startTime: true,
                            endTime: true,
                            days: true
                        }
                    },
                    Lab:{
                        select:{
                            startTime: true,
                            endTime: true,
                            days: true
                        }
                    }
                }
            }
        },
    })
}

const addSubjects = (studentId: number, subjectIds:any ) => {
    
    return prisma.student.update({
        where:{
            id:studentId
        },
        data:{
            Subject:{
                connect:subjectIds
              
            }
        }
    })

}

const removeSubjects = (studentId: number, subjectIds:any ) => {
    
    return prisma.student.update({
        where:{
            id:studentId
        },
        data:{
            Subject:{
                disconnect:subjectIds
              
            }
        }
    })

}

export { createStudent, getStudents, getSubjects, addSubjects, removeSubjects};