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

app.get("/user",async(req,res)=>{
  const email=req.body.emailId;
  try{
   const user= await User.find({emailId:req.body.emailId});
   res.send(user);
  }
  catch(err){
    res.status(400).send("something went wrong"+err.message)
  }
})

app.delete("/user",async(req,res)=>{
  const userId=req.body.userId;
  try{
    const user=await User.findByIdAndDelete(userId);
    res.send("User deleted successfully")

  }catch(err){
    res.status(400).send("something went wrong"+err.message)
  }
})

app.patch("/user",async(req,res)=>{
  const uId=req.body.userId;
  const data=req.body;
  try{
    await User.findByIdAndUpdate(uId,data);
    res.send("User updated successfully")
    

  }catch(err){
    res.status(400).send("something went wrong"+err.message)
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
  
