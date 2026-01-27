import roomModel from "../models/roomModel";
import chatModel from "../models/chatModel";

export async function sendchat(req,res){
    try{
    const userId=req.userId
    if(!userId){
        return res.status(401).json({message:"Unauthorised User"})
    }
    const roomId=req.params.roomId
    
    const roomDetails=await roomModel.findOne({_id:roomId})

    if(!roomDetails){
        return res.status(400).json({message:"Room not found"})
    }

    if(!roomDetails.members.includes(userId)){
        return res.status(400).json({message:"User not in the room"})
    }

    const {chatEntered}=req.body

    if (!chatEntered || typeof chatEntered !== "string") {
         return res.status(400).json({ message: "Invalid chat message" });
    }
     
   const chatSend= await chatModel.findOneAndUpdate({roomId},{
       $push:{
           chat:{
                senderId:userId,
                chatEntered:enteredChat,
                time:Date.now()
           }
       }
    },{upsert:true,new:true})

    if(!chatSend){
        return res.status(400).json({message:"Something went wrong"})
    }
    
    return res.status(200).json({message:"Successfully send"})

}catch(err){
    return res.status(500).json({message:err})
}
} 