const validator = require("validator");

const validateSignUpData=(req)=>{
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
};
module.exports={
    validateSignUpData:validateSignUpData
}