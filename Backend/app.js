import express from 'express'
import http from 'http'
import connectdb from './config/MongoConnect.js'
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"
import auth from "./routes/authRoutes.js"
import room from "./routes/roomRoute.js"
import { Server } from 'socket.io'
import { setupSocketHandlers } from './controllers/socketController.js'

dotenv.config()

const app = express()
const frontend = "http://localhost:5173"

// Server create karo
export const server = http.createServer(app)

// Socket.IO setup
export const io = new Server(server, {
    cors: {
        origin: frontend,
        credentials: true
    }
})

// Socket handlers setup - EK BAAR YAHA PE
setupSocketHandlers(io)

// Database connect
connectdb()

// Middlewares
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ['GET', 'POST'],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.get('/', (req, res) => {
    res.send("Working app")
})

app.use("/api/auth", auth)
app.use("/api/room", room)

// Server start
server.listen(3000, () => {
    console.log("Server is running on port 3000")
})