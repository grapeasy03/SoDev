const mongoose=require("mongoose");
const validate=require("validator");

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        validate:[validate.isEmail,"invalid email"]
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number
    },
    gender: { 
        type: String, 
        enum: ["male", "female", "others"], 
        message: "Gender Data is not valid"
    },
    photoUrl:{
        type:String,
        default:"https://www.flaticon.com/free-icon/profile_3135715",
        validate:[validate.isURL,"invalid url"]
    },
    about:{
        type:String,
        default:"This is a defaulty info about the user"
    },
    skills:{
        type:[String]
    }
},{timestamps:true});

const userModel=mongoose.model("User",userSchema);
module.exports=userModel;