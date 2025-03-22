const express=require("express")

const app=express()

const connectDb=require("./config/database")
const User=require("./nodejs/user")

// app.use("/",(err,req,res,next)=>{
//   if(err){
//     res.status(500).send("something went wrong");
//   }
// })
app.use(express.json());

app.post("/signup",async(req,res)=>{
  console.log(req.body)
  const user=new User(req.body);
  // creating a new instance os User model 
 try{
  await user.save();
  res.json({message:"user added successfully",user:user});
 }
 catch(err){
  res.status(400).send("Error saving the user"+err.message)
 }
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
  
