const express=require("express")

const app=express()

app.use("/",(req,res)=>{
    res.send("Hello from main")
})

app.use("/hello",(req,res)=>{
    res.send("Hello from hello")
})

app.use("/test",(req,res)=>{
    res.send("Hello from server")
})

app.listen(7777,()=>{
    console.log("server is successfully to port 7787")
})