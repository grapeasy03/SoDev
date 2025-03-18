const express=require("express")

const app=express()



app.use("/hello",(req,res)=>{
    res.send("Hello from hello")
})

// app.use("/test",(req,res)=>{
//     res.send("Hello from server")
// })
//only handlles get call
app.get("/user",(req,res)=>{
    res.send({firstName:"badri"})
})

app.post("/user",(req,res)=>{
    console.log("Data saved to db")
    res.send("Data saved to db")

})

app.delete("/user",(req,res)=>{
    console.log("Data deleted from db")
    res.send("Data deleted from db")
})
app.listen(7777,()=>{
    console.log("server is successfully to port 7777")
})