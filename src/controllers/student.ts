import prisma from "../services/database";
import { Student, Subject } from "@prisma/client";



const createStudent = ({ lastName, firstName, course, year,  }: Student ) => {

    return prisma.student.create({
        data:{
            lastName,
            firstName,
            course,
            year,
        }
    })
}

export { createStudent };