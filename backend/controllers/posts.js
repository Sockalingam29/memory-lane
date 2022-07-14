import Post from "../models/postModel.js";

export const getPosts = async(req,res)=>{
    try{
        const PostMessages=await Post.find();
        res.status(200).json(PostMessages);
    }catch(err){
        console.log(err);
    }
}

export const createPost=async (req,res)=>{
    const { title, content, author, tags, selectedFile} = req.body;

    const newPost = new Post({ title, content, author, tags, selectedFile })
    try {
        await newPost.save();
        res.status(201);
    } catch (error) {
        console.log(err);
    }
}