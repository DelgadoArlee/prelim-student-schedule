import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";


//Routes
import helloRouter from "./api/hello";



const app = express();

//middleware
app.use(cors());
app.use(json())

app.use("/api", helloRouter);

export default app;