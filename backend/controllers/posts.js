import express from 'express';
import mongoose from 'mongoose';

import Post from "../models/postModel.js";

const router = express.Router();

export const getPosts = async (req,res)=>{
    try{
        const PostMessages=await Post.find();
        res.status(200).json(PostMessages);
    }catch(err){
        return res.status(500).json({
            message:err,
            success:false
        });
    }
}

export const createPost=async (req,res)=>{
   
        const { title, content, author, tags, selectedFile} = req.body;

        const newPost = new Post({ title, content, author, tags, selectedFile })
    try {
        await newPost.save();
        return res.status(201).json({newPost});
    } catch (error) {
        return res.status(500).json({
            message: "Error creating post - " + error ,
            success:"false"
        });
    }
}

export const deletePost = async(req,res)=>{ 
    try{
        const {id}=req.params;
        await Post.findByIdAndRemove(id)
        .then(console.log("Deleted "+id))
        .catch(err=>console.log(err));
        res.status(200).json({
            message:"Post deleted successfully",
            success:"true"
        });
    }catch(err){
        return res.status(500).json({
            message:err,
            success:false
        });
    }
}

export const likePost = async (req,res) =>{
    try{
        const {id}=req.params;
        const userId=req.userId
        if(!userId){
            res.status(400).json({message:'Unauthenticated user'})
        }
        const post =await Post.findById(id);
        const index = post.likes.findIndex((id) => id === String(userId));
        if(index===-1){
            post.likes.push(userId)
        }
        else{
            post.likes = post.likes.filter((id) => id !== String(userId));
        }
        const updatedPost=await Post.findByIdAndUpdate(id,post,{new:true});
        res.status(200).json({updatedPost})
    }catch(err){
        res.status(500).json({
            message:err,
            success:"false"
        });
    }
}

export const updatePost = async (req,res) =>{
    try{
        const {id}=req.params;
        const {title,content,author,tags,selectedFile}=req.body;
        const updatedPost=await Post.findByIdAndUpdate(id,{title,content,author,tags,selectedFile},{new:true});
        res.status(200).json({updatedPost})
    }catch(err){
        res.status(500).json({
            message:err,
            success:"false"
        });
    }
}

export default router;