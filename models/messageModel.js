import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    msg:{
        type:String
    },
   
});
const Message=mongoose.model('Message',messageSchema);

export default Message;