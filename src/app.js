const express=require("express")

const app=express()

const connectDb=require("./config/database")
const User=require("./nodejs/user")

// app.use("/",(err,req,res,next)=>{
//   if(err){
//     res.status(500).send("something went wrong");
//   }
// })

app.post("/signup",async(req,res)=>{
  const userObj={
    firstName:"Kushagra",
    lastName:"batra",
    emailId:"kushagradiwan@gmail.com",
    password:"kushagra@123",
  }
  // creating a new instance os User model 
  const user=new User(userObj);
  await user.save();
  res.json({message:"user added successfully",user:user});

})
connectDb()
  .then(()=>{
    console.log("connected to database")
    app.listen(7777,()=>{
      console.log("server is successfullt listening to port 7777")
    });
  })
    .catch((err)=>{
      console.log(err)
    });
  
