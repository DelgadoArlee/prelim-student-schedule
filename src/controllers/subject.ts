import prisma from "../services/database";
import { SubjectForm } from "../types/types";

const createLecture = ( {id, studentId, title, startTime, endTime, days}: SubjectForm ) => {
    return prisma.subject.upsert({
        where: { id },
        create: {
            id,
            title,
            Lecture: {
                create:{
                    startTime,
                    endTime,
                    days
                }
            }
        },
        update:{
            Lecture: {
                create:{
                    startTime,
                    endTime,
                    days
                }
            }
        }  
    })
}


const createLab = ( {id, studentId, title, startTime, endTime, days}: SubjectForm ) => {
    return prisma.subject.upsert({
        where: { id: id },
        create: {
            id,
            title,
            Lab: {
                create:{
                    startTime,
                    endTime,
                    days
                }
            }
        },
        update:{
            Lab: {
                create:{
                    startTime,
                    endTime,
                    days
                }
            }
        }  
    })
}

//Gets Subjects Available to the student
const getAvailableSubjects = async ( id: number) => {
    return prisma.subject.findMany({
        where:{
            students:{
                every:{
                    NOT:{
                        id
                    }
                }
            }
        },
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
    })
}



// //gets subject
const getStudentSubjects = async ( id: number) => {
    return await prisma.subject.findUnique({
        where:{
            id
        },
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
    })
    
}

export { createLecture, createLab, getAvailableSubjects, getStudentSubjects };