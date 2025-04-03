const mongoose = require("mongoose");
const connReqSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["ignore","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        },
    }},
{
    timestamps:true
},)
const connectionRequestModel=new mongoose.model("ConnectionRequest",connReqSchema);
module.exports=connectionRequestModel