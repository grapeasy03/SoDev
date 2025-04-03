const express=require("express")
const requestsRouter=express.Router()
const User=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {validateSignUpData}=require("../utils/validation")

const cookieParser=require("cookie-parser")
const validate=require("validator")
const{ userAuth}=require("../middlewares/auth")
const connectionRequest=require("../models/connectionRequest")

//sendConnectionRequest
requestsRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const  status=req.params.status;
        const allowedStatus=["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status"+status })
        }

        const connReq=new connectionRequest({
            fromUserId,
            toUserId,
            status
        });
        const data=await connReq.save();
        res.json({
            message:"Connection Request sent successfully",
            data
        });
    }
    catch(err){
      res.status(400).send("ERROR: "+ err.message);
    }
    })

module.exports=requestsRouter;