import express, { Router, Request, Response, NextFunction } from "express";
import { getStudents, getSubjects } from "../controllers/student";
import { getAvailableSubjects} from "../controllers/subject";


const router: Router = express.Router();

//sends all students from db
router.get('/students', (req: Request, res: Response, next: NextFunction) => {
    getStudents()
    .then( students => res.send(students))
    .catch(err => err.status(400).send(err))
})

//gets available subjects from db
router.get('/availableSubjects', (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    getAvailableSubjects(Number(id))
    .then(subjects => res.send(subjects))
    .catch(err => {
       
        console.log(err)
        console.log(id)
        err.status(400).send(err)
    });
})

router.get('/studentSubjects', (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    getSubjects(Number(id))
    .then(subjects => {
        console.log(subjects)
        res.send(subjects)
    })
    .catch(err => {
       
        console.log(err)
        console.log(id)
        err.status(400).send(err)
    });
})


export default router;