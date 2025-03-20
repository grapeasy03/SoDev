const express=require("express")

const app=express()
const {adminAuth,userAuth}=require("./middlewares/auth")


// app.get("/ab?c", (req, res) => {
//     res.send("hello")
//   })

//   app.get("/a(bc)?d", (req, res) => {
//     res.send("hello")
//   })
// //   bc is optional
// app.get("/a(bc)+d", (req, res) => {
//     res.send("hello")
//   })

//   app.get(/.*fly$/, (req, res) => {
//     res.send("hello" )
//   })

// app.get("/user",(req,res)=>{
//     console.log(req.query)
//     res.send("hello")
// })
// //   we can write any number of times bc in between a and d
app.use("/admin",adminAuth)
app.get("/user",userAuth,(req,res)=>{
  res.send("user data send")
})
app.get("/admin/getAllData",(req,res)=>{
  res.send("admin data send")
  })

app.get("/admin/deleteAllData",(req,res)=>{
  res.send("admin data deleted")
  })

app.listen(7777,()=>{
    console.log("server is successfully to port 7777")
})