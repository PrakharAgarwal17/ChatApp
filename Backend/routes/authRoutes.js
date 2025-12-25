import express from "express"
import { SignUp } from "../controllers/Auth.js"
import { VerifyOtp , SignIn} from "../controllers/Auth.js";

const router=express.Router();

router.post("/signup",SignUp)
router.post("/verifyotp",VerifyOtp)
router.post("/signin",SignIn)

export default router