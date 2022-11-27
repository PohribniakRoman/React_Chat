import { useEffect } from "react";
import { useState } from "react"
import socket from "../websocket";

export default function Home() {
    const [roomList,updateRoomList] = useState(["easdasdsa"]);
    useEffect(()=>{
        socket.emit("GET_ROOMS");
        socket.on("ROOM_LIST",(rooms)=>{
            console.log(rooms)
            // updateRoomList(rooms)    
        })
    },[])
    return(
        <div>
            {roomList.map(e=>{
                return <div key={e} data-roomid={e} onClick={()=>{
                    socket.emit("ENTER_ROOM",{roomid:e})
                }}>{e}</div>
            })}
        </div>
    )
}