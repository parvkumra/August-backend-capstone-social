import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    hashtags:[
        {
            type:String
        }
    ],
    pauthor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});

const Post=mongoose.model('Post',postSchema);

export default Post;