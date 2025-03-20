const mongoose=require("mongoose");


const connectDb=async()=>{
    await mongoose.connect(
        "mongodb+srv://kushagradiwan:kushagra@cluster0.diws7.mongodb.net/"
    );
    console.log("connected")

}

connectDb()
    .then(()=>{
        console.log("connected to db")
    })
    .catch((err)=>{
        console.error(err)
    });