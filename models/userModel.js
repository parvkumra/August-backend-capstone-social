import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
       type:String,
       enum:['male','female'],
    },
    password:{
        type:String
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    saved:[{
           type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
    }],
    followers:[
        {
             type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    following:[
        {
          type:mongoose.Schema.Types.ObjectId,
           ref:'User'
        }
    ]
},{timestamps:true});

const User=mongoose.model('User',userSchema);

export default User;