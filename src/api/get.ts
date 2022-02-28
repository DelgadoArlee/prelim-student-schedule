import express, { Router, Request, Response, NextFunction } from "express";
import { getStudents } from "../controllers/student"
import { getStudentSubjects } from "../controllers/subject";


const router: Router = express.Router();

//sends all students from db
router.get('/students', (req: Request, res: Response, next: NextFunction) => [
    getStudents()
    .then( students => res.send(students))
    .then(err => err.status(400).send(err))
])

//sends a specific student subjects from db
router.get('/student/subjects', (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    getStudentSubjects(id)
    .then(subjects => res.send(subjects))
    .then(err => err.status(400).send(err));
})


export default router;