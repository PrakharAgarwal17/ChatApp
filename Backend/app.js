
import express from 'express'
import connectdb from './config/MongoConnect.js'
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"
import auth from "./routes/authRoutes.js"

const app=express()

dotenv.config()

connectdb()

app.use(cors({
    origin:["http://localhost:5173","http://localhost:3000"],
    methods:['GET','POST'],
    credentials:true
}))


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send("Working app");
})

app.use("/api/auth",auth)

app.listen(3000)