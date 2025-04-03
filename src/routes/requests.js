const express=require("express")
const requestsRouter=express.Router()
const User=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {validateSignUpData}=require("../utils/validation")

const cookieParser=require("cookie-parser")
const validate=require("validator")

const{ userAuth}=require("../middlewares/auth")


//sendConnectionRequest
requestsRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    console.log("SENDING CONNECTION REQUEST")
    res.send("connection request sent by kushu")
    const user=req.user;
    console.log(user.firstName)
    })

module.exports=requestsRouter;