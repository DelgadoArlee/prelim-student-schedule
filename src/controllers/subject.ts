import prisma from "../services/database";
import { Student, Subject } from "@prisma/client";

//creates subject
const createSubject = ({ studentId, title, startTime, endTime, days, allDay}: Subject ) => {
    
    return prisma.subject.create({
        data:{
            student:{
                connect:{
                    id: studentId
                }
            },
            title,
            startTime,
            endTime,
            days,
            allDay 
        }
    })
    
    
}

//gets subject
const getStudentSubjects = async ( id: number) => {
    return await prisma.subject.findMany({
        where:{
            id: id
        }
    })
    
}

export { createSubject, getStudentSubjects };