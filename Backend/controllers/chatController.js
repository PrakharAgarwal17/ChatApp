import roomModel from "../models/roomModel.js";
import chatModel from "../models/chatModel.js";

export async function sendchat(req,res){
    try{
    const userId=req.userId
    if(!userId){
        return res.status(401).json({message:"Unauthorised User"})
    }
    const roomCode=req.params.roomId
    
    const roomDetails=await roomModel.findOne({code:roomCode})

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
     
   const chatSend= await chatModel.findOneAndUpdate({roomId:roomDetails.id},{
       $push:{
           chat:{
                senderId:userId,
                chatEntered:chatEntered,
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

export async function getChat(req,res){
    try {
      const userId=req.userId
     
      if(!userId){
        return res.status(401).json({message:"Unauthorised User"})
    }

    const roomcode=req.params.roomcode

    if(!roomcode){
       return res.status(400).json({message:"Room not found "})
    }

    const roomDetails=await roomModel.findOne({code:roomcode})

    if(!roomDetails){
        return res.status(400).json({message:"Room not found"})
    }

      const getChat = await chatModel.find({roomId:roomDetails.id}).populate("chat.senderId" , "name")
  
      if(!getChat){
        return res.status(400).json({message:"Room not found"})
      }
       return res.status(200).send(getChat)
      }catch (err) {
        return res.status(500).json({message : "error in get data"})
    }
}