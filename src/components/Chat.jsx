import { useEffect } from "react"
import socket from "../websocket"

export default function Chat() {
    useEffect(()=>{
        socket.emit();
        socket.on();
    },[])
    return <div>
        Chat
    </div>
}