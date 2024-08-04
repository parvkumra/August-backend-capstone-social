import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({});

const dbconnect=async()=>{
try{
 const conn=await mongoose.connect(process.env.MONGO_URI);
 console.log(`db connected ${conn.connection.host}`);
}catch(e){
   console.error(`error : ${e.message}`)
   process.exit(1);
 }
}

export default dbconnect;