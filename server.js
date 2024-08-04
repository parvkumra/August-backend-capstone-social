import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbconnect from "./config/dbconnect";

dotenv.config({});
dbconnect();
const PORT=process.env.PORT || 3000;
const app=express();
app.use(express.json());
app.use(cookieParser());

app.listen(PORT,()=>{
    console.log(`server running ${PORT}`)
})