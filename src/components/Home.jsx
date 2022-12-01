import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../websocket";
import {v4} from "uuid";

export default function Home() {
    const [roomList,updateRoomList] = useState([]);
    const navigate = useNavigate()
    useEffect(()=>{
        socket.emit("GET_ROOMS");
        socket.on("ROOM_LIST",({rooms})=>{ 
            console.log(rooms)
            updateRoomList(rooms)    
        })
    },[])
    return(  
        <div>
            {roomList.map(e=>{
                return <div key={e} data-roomid={e} onClick={()=>{
                    navigate(e);
                }}>{e}</div>
            })}
            <button onClick={()=>{
                const roomId =v4();
                socket.emit("CREATE_ROOM",{roomId})
                navigate(roomId);
            }}>create room</button>
        </div>
    )
}