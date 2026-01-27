import roomModel from "../models/roomModel.js"
import userModel from "../models/userModel.js"
import axios from "axios"


export async function createRoom(req,res){
   try{
   const userId=req.userId
   
   if(!userId){
    return res.status(401).json({message:"Unauthorised user"})
   }

   const {roomName}=req.body
   if(typeof roomName!=="string"){
    return res.status(400).json({message:"Invalid type of room name"})
   }

   let roomCode;
   let roomExists

   do{
       roomCode=Math.floor(100000 + Math.random() * 900000).toString();
       roomExists=await roomModel.findOne({code:roomCode})
   }while(roomExists)

   const createRoom=await roomModel.create({
    owner:userId,
    roomName:roomName,
    code:roomCode,
    members:[userId]
   })

   if(!createRoom){
    return res.status(400).json({message:"Room creation unsuccessful"})
   }

   const userRooms=await userModel.findOneAndUpdate({_id:userId},{
     $push:{
        rooms:createRoom._id
     }
   },{new:true})
    
   if(!userRooms){
      return res.status(400).json({message:"Room joining unsuccessful"})
   }


   return res.status(201).json({message:`Room Created Successfully , your room code is ${roomCode}`})

}catch(err){
    return res.status(500).json({message:err})
}
}

export async function joinRoom(req,res){
   try{
       const userId=req.userId
       if(!userId){
           return res.status(401).json({message:"Unauthorised Used"})
       }
   
       const {enteredCode}=req.body
       if(typeof enteredCode !== "string"){
          return res.status(400).json({message:"Invalid type of Code"})
       }
   
       const foundRoom=await roomModel.findOneAndUpdate({code:enteredCode},{
             $addToSet:{
              members:userId
            }
        },{new:true}
   )
       if(!foundRoom){
           return res.status(404).json({message:"Either room not found or room does not exist"})
       }

       const userRooms = await userModel.findOneAndUpdate({_id:userId},{
        $addToSet:{
            rooms:foundRoom._id
        }
       },{new:true})

       if(!userRooms){
        return res.status(400).json({message:"User room joining unsuccessful"})
       }

       return res.status(200).json({message:"Room joined successfully"})
   }catch(err){
    return res.status(500).json({message:err})
   }
}

export async function leaveRoom(req,res){
    try{

       const userId=req.userId
       if(!userId){
           return res.status(401).json({message:"Unauthorised Used"})
        }

        const roomId=req.params.roomId
       if(!roomId){
         return res.status(404).json({message:"Room not found"})
       }
       
       const findRoom=await roomModel.findOneAndUpdate({_id:roomId},{
        $pull:{
            members:userId
        }
       },{new:true})

       const userRoom=await userModel.findOneAndUpdate({_id:userId},{
        $pull:{
            rooms:roomId
        }
       },{new:true})
        
       if(!findRoom){
        return res.status(400).json({message:"Unsuccessful to leave the room"})
       }
       return res.status(200).json({message:"Room left successfully"})


    }catch(err){
       return res.status(500).json({message:err})
    }
}

export async function removeRoom(req,res){
    try{
        const userId=req.userId
        if(!userId){
            return res.status(401).json({message:"Unauthorised Used"})
         }
 
         const roomId=req.params.roomId
        if(!roomId){
          return res.status(404).json({message:"Room not found"})
        }

        const findRoom=await roomModel.findOne({_id:roomId})

        if(!findRoom){
        return res.status(400).json({message:"Cannot find the room"})
       }

        if(findRoom.owner.toString()===userId){
            await roomModel.findOneAndDelete({_id:roomId})
        }
        else{
            const user=await userModel.findOneAndUpdate({_id:userId},{
                $pull:{
                    rooms:roomId
                }
            },{new:true})
          
            if(!user){
                return res.status(400).json({message:"Room deletion unsuccesfull"})
            }
            
            await roomModel.findByIdAndUpdate(
                roomId,
                { $pull: { members: userId } },
                { new: true }
            );

            return res.status(200).json({message:"Room deleted successfully"})

        }


    }catch(err){
        return res.status(500).json({message:err})
    }

}