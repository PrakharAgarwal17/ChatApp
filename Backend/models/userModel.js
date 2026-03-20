import mongoose from "mongoose";

const UserAuth=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    rooms:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room"
    }]
})

export default mongoose.model("User",UserAuth)