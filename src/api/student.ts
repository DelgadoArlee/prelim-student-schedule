import express, { Router, Request, Response, NextFunction } from "express";
import  { createStudent }  from "../controllers/student";

const router: Router = express.Router();

router.post('/createStudent', async (req: Request, res: Response, next: NextFunction) => {
    const  student =  req.body;

    return createStudent( student )
            .then(data => res.send("Student Added"))
            .catch((err:any) => res.status(400).send(err));
});





export default router;