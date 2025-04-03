const validator = require("validator");
const User=require("../models/user")


const validateSignUpData=(req)=>{
    try{
    const{firstName,lastName,emailId,password}=req.body;
    if(!firstName||!lastName||!emailId||!password){
        throw new Error("Please fill all the fields");
    }
    else if(firstName.length<3||firstName.length>50){
        throw new Error("First name should be between 3 to 50 characters");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password")

    }
}
catch(err){
    return { isValid: false, message: "An error occurred: " + err.message };
}};

const validateprofileEditData=async (req)=>{
    const uId=req.params?.userId;
    const data=req.body;
    const ALLOWED_UPDATES=[
            "firstName",
            "lastName",
            "emailId",
            "photoUrl",
            "about",
            "age",
            "skills"
            ];
    const isUpdateAllowed=Object.keys(data).every((k)=>
          ALLOWED_UPDATES.includes(k)
          );
    return isUpdateAllowed;
          
}

module.exports={
    validateSignUpData:validateSignUpData,
    validateprofileEditData:validateprofileEditData
}