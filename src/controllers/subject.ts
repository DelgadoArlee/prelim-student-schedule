import prisma from "../services/database";
import { SubjectForm } from "../types/types";



// //creates subject
const createLecture = ( {id, studentId, title, startTime, endTime, days}: SubjectForm ) => {
    return prisma.subject.upsert({
        where: { id },
        create: {
            id,
            title,
            students:{
                connect:{
                    id: studentId
                }
            },
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
            students:{
                connect:{
                    id: studentId
                }
            },
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





// //gets subject
// const getStudentSubjects = async ( id: number) => {
//     return await prisma.subject.findMany({
//         where:{
//             studentId: id
//         }
//     })
    
// }

export { createLecture, createLab };