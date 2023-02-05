import express from "express"
import cors from "cors"
import Connection from "./database/db.js"
import userRoutes from "./routes/userRoutes.js"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import mongoose from "mongoose"
import SocketConnection from "./socket/index.js"

const app = express();
dotenv.config()

app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.disable('x=powered-by');

app.use("/api/v1/user",userRoutes)


mongoose.set({'strictQuery':false})
Connection();

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is runing at port ${PORT}`)
})
SocketConnection();

// io.on('connection',(socket)=>{
//     console.log('user connected')
// })