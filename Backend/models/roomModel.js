import mongoose from "mongoose";

const roomSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    roomName:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    members:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
    }],
})

export default mongoose.model("Room",roomSchema)