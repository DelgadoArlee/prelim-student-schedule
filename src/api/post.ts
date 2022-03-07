import express, { Router, Request, Response, NextFunction } from "express";
import  { createStudent }  from "../controllers/student";
// import { createSubject } from "../controllers/subject";

const router: Router = express.Router();

router.post('/student', async (req: Request, res: Response, next: NextFunction) => {
    const  student =  req.body;

    return createStudent( student )
            .then( data => res.send("Student Added" ))
            .catch( err => res.status(400).send(err) );
});



// router.post('/subject', async (req: Request, res: Response, next: NextFunction) => {
//     const  subject =  req.body;

//     return createSubject( subject )
//             .then(data => res.send("Student Added"))
//             .catch((err:any) => res.status(400).send(err));
// });



export default router;