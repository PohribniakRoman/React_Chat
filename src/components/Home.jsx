import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../websocket";
import {v4} from "uuid";

export default function Home() {
    const [roomList,updateRoomList] = useState([]);
    const navigate = useNavigate()
    const [participant,updatePartisipant] = useState("")
    const userName = JSON.parse(localStorage.getItem("user"));
    useEffect(()=>{
        socket.emit("GET_ROOMS");
        
        socket.on("ROOM_LIST",({rooms})=>{ 
            updateRoomList(rooms)    
        })
    },[])
    return(  
        <div>
            {roomList.map(room=>{
                return <div key={room.id} onClick={()=>{
                    navigate(room.id);
                }}>{room.id} {room.sockets.length}/4</div>
            })}
            <form onSubmit={(event)=>{
                event.preventDefault();
                const roomId = v4();
                if(userName === null){
                    socket.emit("CREATE_ROOM",{roomId,participant})
                    localStorage.setItem("user",JSON.stringify({name:participant}))
                }else{
                    socket.emit("CREATE_ROOM",{roomId,participant:userName})
                }
                navigate(roomId);
            }}>
                {userName != null ?<input type="text" placeholder="Enter name" name="" value={participant} onInput={(event)=>{updatePartisipant(event.target.value)}} />:""}
                <button type="submit">create room</button>
            </form>
        </div>
    )
}