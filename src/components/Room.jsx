import { useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../websocket";
export default function Room() {
    useEffect(()=>{
        socket.emit("ENTER_ROOM",{roomId})
        socket.emit("GET_CONNECTED_SOCKETS",{roomId})
        socket.on("ROOM_SOCKETS",({roomSockets})=>{
            console.log(roomSockets);
        })
        return () => {
            socket.emit("LEAVE_ROOM",{roomId})
        }
    })
    const {roomId} = useParams();
    return <div>
        {roomId}
    </div>
}