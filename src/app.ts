import "dotenv/config";
import express, { json } from "express";
import cors from "cors";


//Routes
import helloRouter from "./api/hello";
import postRouter from "./api/post";
import getRouter from "./api/get";




const app = express();




//middleware
app.use(cors());
app.use(json())

//Routers
app.use("/api", helloRouter);
app.use("/post", postRouter);
app.use("/get", getRouter);


export default app;