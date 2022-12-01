import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { render } from 'react-dom'
import socket from "../websocket";

import { PaperPlaneOutline } from 'react-ionicons'



export default function Room() {
    const [participants,updatePartisipants] = useState([])
    useEffect(()=>{
        socket.emit("ENTER_ROOM",{roomId})
        socket.emit("GET_CONNECTED_SOCKETS",{roomId})
        socket.on("ROOM_SOCKETS",({roomSockets})=>{
            updatePartisipants(roomSockets);
        })
        return () => {
            socket.emit("LEAVE_ROOM",{roomId})
        }
    },[])
    const {roomId} = useParams();
    return <section className="chat">
        <div className="chat__main">
            <form>
                <input type="text" className="chat__main--text" />
                <button type="submit" className="chat__main--submit">
                <PaperPlaneOutline
                    color={'#28b4f0'} 
                    height="20px"
                    width="20px"/>
                </button>
            </form>
        </div>
        <div className="chat__users">
            
        </div>
    </section>
}