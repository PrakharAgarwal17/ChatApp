import express from 'express'
import http from 'http'
import connectdb from './config/MongoConnect.js'
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"
import auth from "./routes/authRoutes.js"
import room from "./routes/roomRoute.js"
import { Server } from 'socket.io'

const app=express()

const server=http.createServer(app)
const io=new Server(server,{
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  }
})


dotenv.config()

connectdb()

app.use(cors({
    origin:["http://localhost:5173","http://localhost:3000"],
    methods:['GET','POST'],
    credentials:true
}))

io.on("connection",(socket)=>{
     socket.on("join-room",(roomId)=>{
        socket.join(roomId)
        socket.to(roomId).emit("user-joined",{
            socketId:socket.id
        })
     })
     socket.on("leave-room",(roomId)=>{
        socket.leave(roomId)
        socket.to(roomId).emit("user-left",{
            socketId:socket.id
        })
     })
     socket.on("delete-room",(roomId)=>{
        io.socketsLeave(roomId)
        socket.to(roomId).emit("room-deleted",{
            socketId:socket.id
        })
     })
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send("Working app");
})

app.use("/api/auth",auth)
app.use("/api/room",room)

server.listen(3000,console.log("Server is running on port 3000"))