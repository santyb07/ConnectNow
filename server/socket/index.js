import { Server } from "socket.io"
import dotenv from "dotenv"

dotenv.config()

const SocketConnection = async()=>{
    const io = new Server(9000,{
        cors:{
            origin:process.env.CLIENT_URL,
            methods:['GET','POST']
        }
    })
    
    let users =[];
    
    const addUser = (userData,socketId)=>{
        !users.some(user=> user.id === userData.id) && users.push({...userData,socketId});
    }

    const getUser = (userId)=>{
        return users.find(user=> user.id === userId)
    }
    const removeUser = (socketId)=>{
        return users.find(user=> user.socketId===socketId) && users.pop({socketId})
    }

    io.on('connection',(socket)=>{
        console.log('user connected')

        socket.on("login",userData=>{
            addUser(userData,socket.id);
            io.emit('getUsers',users)
        })

        socket.on('sendMessage',data=>{
            const user = getUser(data.receiverId)
            io.to(user.socketId).emit('getMessage',data);
        })

        socket.on('logout',()=>{
            const user = removeUser(socket.id)
            // console.log(user)
            socket.disconnect(true);
            socket.broadcast.emit('loggedOut',users)
            console.log('user disconnected')
        })
        // socket.on('disconnect',()=>{
        //     const user = removeUser(socket.id)
        //     socket.broadcast.emit('disconnected',users)
        // })
    })
}
export default SocketConnection
