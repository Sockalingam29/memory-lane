import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js"
import dotenv from "dotenv";

const app=express();
dotenv.config();

app.use(bodyParser.json({ limit: '200KB', extended: true }))
app.use(bodyParser.urlencoded({ limit: '200KB', extended: true }))
app.use(cors());    

app.use("/posts",postRoutes);

app.get("/",(req,res)=>{
    res.send("Hello!");
});

mongoose.connect(process.env.CONNECTION_URL)
    .then(()=>app.listen(process.env.PORT || 5000,()=>console.log("Port running")))
    .catch((err)=>console.log(err));
