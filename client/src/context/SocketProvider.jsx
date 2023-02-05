

import { createContext, useState, useRef, useEffect } from "react";

import {io} from "socket.io-client"

export const SocketContext = createContext();


const SocketProvider = ({children})=>{
    const [activeUsers,setActiveUsers]=useState([]);
    const socket = useRef()

    useEffect(()=>{
        socket.current = io('ws://localhost:9000')
    },[])

    return (
        <SocketContext.Provider value={{
            socket,
            activeUsers,
            setActiveUsers
        }}>
            {children}
        </SocketContext.Provider>
    )
}
export default SocketProvider