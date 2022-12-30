import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
    title:String,
    content:String,
    author:String,
    likes:{
        type:[String],
        default:[]
    },
    tags:[String],
    selectedFile:String,
    createdAt:{
        type:Date,
        default:new Date()
    }
})

const Post=mongoose.model("Post",postsSchema);

export default Post;