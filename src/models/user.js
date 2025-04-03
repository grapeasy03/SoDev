const mongoose = require("mongoose");
const validate = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate: {
            validator: (v) => validate.isEmail(v, { allow_display_name: false }),
            message: "Invalid email format"
        }
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number
    },
    gender: { 
        type: String, 
        enum: {
            values: ["male", "female", "others"],
            message: "Gender Data is not valid",
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.flaticon.com/free-icon/profile_3135715",
        validate: {
            validator: (v) => validate.isURL(v),
            message: "Invalid URL"
        }
    },
    about: {
        type: String,
        default: "This is a default info about the user"
    },
    skills: {
        type: [String]
    }
}, { timestamps: true });

userSchema.methods.validatePassword = async function (password) {
    const user=this;
    const isPassValid = await bcrypt.compare(password, user.password);
    return isPassValid
}

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
