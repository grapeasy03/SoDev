const mongoose=require("mongoose");


const connectDb=async()=>{
    await mongoose.connect(
        "mongodb+srv://kushagradiwan:kushagra@cluster0.diws7.mongodb.net/socialDev"
    );
    console.log("connected")

}
module.exports=connectDb;
