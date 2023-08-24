const express = require("express");
const { userModel } = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const userRouter = express.Router();


userRouter.post("/register", async(req,res) => {
      try{
          const {name, avatar, email, password} = req.body;
          const existingUser = await userModel.findOne({email});
          if(existingUser){
            res.status(400).json({msg: "User already exists Please Login!!"});
          }else{
            bcrypt.hash(password, 5, async(err,hash) => {
                if(hash){
                  const user = new userModel({name, avatar, email, password:hash});
                  await user.save();
                  res.status(200).json({msg: "User successfully register", user:req.body});
                }else{
                    res.status(400).json({error:err});
                }
            })
          }
      }catch(err){
        res.status(400).json({error:err});
      }
})


userRouter.post("/login", async(req,res) => {
      try{
         const {email, password} = req.body;
         const user = await userModel.findOne({email});
         if(user){
            bcrypt.compare(password, user.password, async(err, decode) => {
              if(decode){
               const token = jwt.sign({id:user._id}, process.env.secretKey);
               res.status(200).json({msg: "Logged In", token, id:user._id, name:user.name, avatar:user.avatar});
              }else{ 
                res.status(404).json({msg: "Wrong Credentials", err});
              }
            })
         }else{
            res.status(404).json({msg: "User not found"});
         }
      }catch(err){
        res.status(400).json({error:err});
      }
})





module.exports = {
    userRouter
}