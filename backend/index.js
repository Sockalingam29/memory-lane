import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"
import dotenv from "dotenv";

const app=express();
dotenv.config();

app.use(bodyParser.json({ limit: '200KB', extended: true }))
app.use(bodyParser.urlencoded({ limit: '200KB', extended: true }))
app.use(cors());    


app.use("/posts",postRoutes);
app.use('/user',userRoutes);

app.get("/",(req,res)=>{
    res.send("Hello to memories api");
});

const PORT = process.env.PORT || 5000;

console.log("Port running");

mongoose.connect(process.env.CONNECTION_URL)
    .then(()=>app.listen(PORT,()=>console.log("Database connected")))
    .catch((err)=>console.log(err));
