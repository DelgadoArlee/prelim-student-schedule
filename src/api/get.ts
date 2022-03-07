import express, { Router, Request, Response, NextFunction } from "express";
import { getStudents } from "../controllers/student"
import { getStudentSubjects } from "../controllers/subject";


const router: Router = express.Router();

//sends all students from db
router.get('/students', (req: Request, res: Response, next: NextFunction) => [
    getStudents()
    .then( students => res.send(students))
    .catch(err => err.status(400).send(err))
])

//sends a specific student subjects from db
// router.get('/studentSubjects', (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.query;
//     getStudentSubjects(Number(id))
//     .then(subjects => res.send(subjects))
//     .catch(err => err.status(400).send(err));
// })


export default router;