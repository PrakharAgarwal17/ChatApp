import {isloggedIn} from "../middleware/authMiddleWare.js"
import {sendchat,getChat} from "../controllers/chatController.js"
import express from "express"

const router=express.Router()

router.post("/chatSection/:roomId",isloggedIn,sendchat)
router.get("/getchat/:roomcode",isloggedIn,getChat)

export default router