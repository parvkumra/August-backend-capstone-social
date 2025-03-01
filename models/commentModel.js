import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    text:{
        type:String
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});

const Comment=mongoose.model('Comment',commentSchema);

export default Comment;