import prisma from "../services/database";
import { Student } from "@prisma/client";


//inserts a student
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

//gets all students
const getStudents = async () => prisma.student.findMany();

export { createStudent, getStudents };