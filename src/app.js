const express=require("express")
const app=express()
const connectDb=require("./config/database")
const User=require("./nodejs/user")
const {validateSignUpData}=require("./utils/validation")
const bcrypt=require("bcrypt")
const validate=require("validator")
// app.use("/",(err,req,res,next)=>{
//   if(err){
//     res.status(500).send("something went wrong");
//   }
// })
app.use(express.json());


// signup API
app.post("/signup",async(req,res)=>{
  // creating a new instance os User model 
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
app.post("/login",async(req,res)=>{
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
    const isPassValid= await bcrypt.compare(password,user.password)

    if(isPassValid){
      res.send("Login Successful!")

    }
    else{
      throw new Error("Password is incorrect");
    }
  }
  catch(err){
    res.status(400).send("ERROR: "+err.message);

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

app.delete("/user/:userId",async(req,res)=>{
  const userId=req.body.userId;
  const data=req.body;
  try{
    const user=await User.findByIdAndDelete(userId);
    res.send("User deleted successfully")

  }catch(err){
    res.status(400).send("something went wrong"+err.message)
  }
})

app.patch("/user/:userId",async(req,res)=>{
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
  
