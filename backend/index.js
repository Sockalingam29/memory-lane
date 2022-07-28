import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js"

const app=express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());    

app.use("/posts",postRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/postsDB")
    .then(()=>app.listen(process.env.PORT || 5000,()=>console.log("Port running")))
    .catch((err)=>console.log(err));
