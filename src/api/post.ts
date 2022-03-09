import express, { Router, Request, Response, NextFunction } from "express";
import  { createStudent }  from "../controllers/student";
import { createLecture, createLab } from "../controllers/subject";
import { SubjectForm } from "../types/types";

const router: Router = express.Router();

router.post('/student', async (req: Request, res: Response, next: NextFunction) => {
    const  student =  req.body;

    return createStudent( student )
            .then( data => res.send("Student Added" ))
            .catch( err => res.status(400).send(err) );
});



router.post('/subject', async (req: Request, res: Response, next: NextFunction) => {
    const  {id, studentId, type, title, startTime, endTime, days} =  req.body;


    switch(type){
        case "LEC":
            return createLecture({id, studentId, title, startTime, endTime, days})
                    .then( data => res.send("Subject Added" ))
                    .catch( err => {
                        res.status(400).send(err)
                        console.log(err)
                    } );

        case "LAB":
            return createLab({id, studentId, title, startTime, endTime, days})
                    .then( data => res.send("Subject Added" ))
                    .catch( err => {
                        res.status(400).send(err)
                        console.log(err)
                    } );
    }
});



export default router;