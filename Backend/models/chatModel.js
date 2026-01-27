import mongoose from "mongoose"

const chatModel=new mongoose.Schema({
    roomId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"room",
        required:true
    },
    chat:{
        type:[{
            senderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            chatEntered:{
                type:String,
                required:true
            },
            time:{
                type:Date,
                default:Date.now
            }
        }]
    }
})

export default mongoose.model("chat",chatModel)