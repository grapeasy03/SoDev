const express=require("express")
const app=express()
const connectDb=require("./config/database")
const User=require("./models/user")
const {validateSignUpData}=require("./utils/validation")
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const validate=require("validator")
const jwt=require("jsonwebtoken")
const{ userAuth}=require("./middlewares/auth")


// app.use("/",(err,req,res,next)=>{
//   if(err){
//     res.status(500).send("something went wrong");
//   }
// })
app.use(express.json());
app.use(cookieParser());

const appRouter=require("./routes/auth")
const profileRouter=require("./routes/profile")
const reqRouter=require("./routes/requests")


app.use("/",appRouter);
app.use("/",profileRouter);
app.use("/",reqRouter);

// CONNECTION
  connectDb()
  .then(()=>{
    console.log("connected to database")
    app.listen(7777,()=>{
      console.log("server is successfully listening to port 7777")
    });
  })
    .catch((err)=>{
      console.log(err)
    });
  
