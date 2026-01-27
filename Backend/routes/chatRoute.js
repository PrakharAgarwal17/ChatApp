import {isloggedIn} from "../models/chatModel"
import { sendchat } from "../controllers/chatController"
import express from "express"

const router=express.Router()

router.post("/chatSection/:roomId",isloggedIn,sendchat)

export default router