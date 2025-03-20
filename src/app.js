const express=require("express")

const app=express()
const {adminAuth,userAuth}=require("./middlewares/auth")
require("./config/database")

app.use("/",(err,req,res,next)=>{
  if(err){
    res.status(500).send("something went wrong");
  }
})

app.listen(7777,()=>{
  console.log("server is successfullt listening to port 7777")
})