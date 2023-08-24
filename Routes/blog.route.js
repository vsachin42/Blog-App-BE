const express = require("express");
const { blogModel } = require("../Model/blog.model");

const blogRouter = express.Router();


blogRouter.get("/blogs", async(req,res) => {
      try{
        const {title, category} = req.query;
        if(title){
         const titleBlogs = await blogModel.find({title});
         res.status(200).json({titleBlogs});
        }else if(category){
            const catBlogs = await blogModel.find({category});
            res.status(200).json({catBlogs});
        }else{
            const blogs = await blogModel.find();
            res.status(200).json({blogs});
        }
      }catch(err){
        res.status(400).json({error:err});
      }
})

blogRouter.get("/blogs/:id", async(req,res) => {
    try{
        const id = req.params.id;
        const blog = await blogModel.findOne({_id:id});
        res.status(200).json({blog});
    }catch(err){
        res.status(400).json({err});
    }
})


blogRouter.post("/blogs", async(req,res) => {
    try{
      const {title, content, category, date, userName} = req.body;
      const blog = new blogModel({title, content, category, date, likes:0, userName});
      await blog.save();
      res.status(201).json({msg: "Blog has been added"});
    }catch(err){
        res.status(200).json({error:err});
    }
})


blogRouter.patch("/blogs/:id", async(req,res) => {
    try{
        const id = req.params.id;
        const blog = await blogModel.findOne({_id:id});
        if(blog){
            await blogModel.findByIdAndUpdate({_id:id}, req.body);
            res.status(200).json({msg: "Blog has been updated"});
        }else{
            res.status(404).json({msg: "Blog not found"});
        }
    }catch(err){
        res.status(400).json({error:err});
    }
})


blogRouter.delete("/blogs/:id", async(req,res) => {
    try{
       const id = req.params.id;
       const blog = await blogModel.findOne({_id:id});
       if(blog){
           await blogModel.findByIdAndDelete({_id:id});
           res.status(200).json({msg: "Blog has been deleted"});
       }else{
           res.status(404).json({msg: "Blog not found"});
       }
    }catch(err){
        res.status(400).json({error:err});
    }
})


blogRouter.patch("/blogs/:id/like", async(req,res) => {
     try{
       const id = req.params.id;
       const blog = await blogModel.findOne({_id:id});
       if(blog){
           blog.likes = blog.likes+1;
           await blog.save();
           res.status(200).json({msg: "Likes Updated"});
       }else{
           res.status(404).json({msg: "Blog not found"});
       }
     }catch(err){
        res.status(400).json({error:err});
     }
})









module.exports = {
    blogRouter
}