import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
    title:String,
    content:String,
    author:String,
    noOfLikes:{
        type:Number,
        default:0
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