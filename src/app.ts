import "dotenv/config";
import express, { json } from "express";
import cors from "cors";


//Routes
import helloRouter from "./api/hello";
import studentRouter from "./api/student";




const app = express();




//middleware
app.use(cors());
app.use(json())

//Routers
app.use("/api", helloRouter)
app.use("/student", studentRouter);


export default app;