const express=require("express")
const profileRouter=express.Router()
const User=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {validateSignUpData}=require("../utils/validation")
const {validateprofileEditData}=require("../utils/validation")
const cookieParser=require("cookie-parser")
const validate=require("validator")
const{ userAuth}=require("../middlewares/auth")
//get profile API

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
    const user=req.user;
    res.status(200).send("logged in user is    " +user);
    console.log("logged in user is "+user);
    }
    catch(err){
      res.status(400).send("ERROR: "+ err.message);
    }
  })
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try{
    if (!validateprofileEditData(req)){
      throw new Error("Invalid edit request");
    }
    const loggedInUser=req.user;
    // loggedInUser.firstName=req.body.firstName;
    // loggedInUser.lastName=req.body.lastName;
    Object.keys(req.body).forEach((k)=>{
      loggedInUser[k]=req.body[k];
    })
    console.log(loggedInUser);
    res.send(`Profile updated successfully for user ${loggedInUser.firstName} ${loggedInUser.lastName}`);
    await loggedInUser.save();
  }catch(err){
      res.status(400).send("ERROR: "+ err.message);  }
  });
  
  profileRouter.patch("/profile/view",userAuth,async(req,res)=>{
  });
  module.exports=profileRouter;