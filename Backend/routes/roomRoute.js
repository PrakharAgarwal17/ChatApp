import express from "express"
import { createRoom ,joinRoom,leaveRoom,removeRoom} from "../controllers/Room.js"
import {isloggedIn} from "../middleware/authMiddleWare.js"

const router=express.Router()

router.post("/createroom",isloggedIn,createRoom)
router.post("/joinroom",isloggedIn,joinRoom)
router.post("/leaveroom/:roomId",isloggedIn,leaveRoom)
router.post("/removeroom/:roomId",isloggedIn,removeRoom)

export default router