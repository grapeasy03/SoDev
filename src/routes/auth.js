const express=require("express")
const User=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {validateSignUpData}=require("../utils/validation")
const cookieParser=require("cookie-parser")
const validate=require("validator")
const{ userAuth}=require("../middlewares/auth")
const router=express.Router()

// signup API
router.post("/signup",async(req,res)=>{
  // creating a new instance of User model 
 try{
  console.log(req.body)
  validateSignUpData(req)
  const {firstName,lastName,emailId,password}=req.body;
  // encrypting user passwords
  const passHash=await bcrypt.hash(req.body.password,10);
  console.log(passHash);
  const user=new User({
    firstName,lastName,emailId,password:passHash
  });
  await user.save();
  res.json({message:"user added successfully",user:user});
 }
 catch(err){
  res.status(400).send("ERROR:"+err.message)
 }
})
// Login API
router.post("/login",async(req,res)=>{
  try{
    const {emailId,password}=req.body;
    if(!validate.isEmail(emailId)){
      return res.status(400).send("Please enter a valid email");
    }
    //check if user is present
    const user=await User.findOne({emailId});
    if(!user){
      throw new Error("Email Id is not present in DB")
    }
    // const isPassValid= await bcrypt.compare(password,user.password)
    const isPassValid=await user.validatePassword(password);//schema method cming from auth.js
    if(isPassValid){
      // create a jwt token
      const token=await jwt.sign({_id:user._id},"secret",{expiresIn:"7d"});
      console.log(token);
      // add the token to cookie and send the response back to user
      res.cookie("token",token);
      res.send("Login Successful");
    }
    else{
      throw new Error("Password is incorrect");
    }
  }
  catch(err){
    res.status(400).send("ERROR: "+err.message);
  }
})
//logout api
router.get("/logout",async(req,res)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
  });
  res.send("Logged Out")
})
// get through email  API
router.get("/user",async(req,res)=>{
 
    const email=req.body.emailId;
    try{
     const user= await User.find({emailId:req.body.emailId});
     res.send(user);
    }
    catch(err){
      res.status(400).send("something went wrong"+err.message)
    }
  })
  
  //delete API
  router.delete("/user/:userId",async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    try{
      const user=await User.findByIdAndDelete(userId);
      res.send("User deleted successfully")
  
    }catch(err){
      res.status(400).send("something went wrong"+err.message)
    }
  })

//update API
router.patch("/user/:userId",async(req,res)=>{
  
    const uId=req.params?.userId;
    const data=req.body;
    // selectively updating instead of allowing it to update evrything
    try{
      const ALLOWED_UPDATES=[
        "userId",
        "photoUrl",
        "about",
        "age",
        "skills"
        ];
      const isUpdateAllowed=Object.keys(data).every((k)=>
      ALLOWED_UPDATES.includes(k)
      );
      if(!isUpdateAllowed){
        return res.status(400).send("update is not allowed")}
      const user=await User.findByIdAndUpdate(uId,data,{
        returnDocument:"after",
        runValidators:true
      });
      console.log(user);
      res.send("User updated successfully")
    }catch(err){
      res.status(400).send("update failed"+err.message)
    }
    });
  

module.exports=router;