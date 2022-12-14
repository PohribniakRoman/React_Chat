import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../websocket";
import {v4} from "uuid";

export default function Home() {
    const [roomList,updateRoomList] = useState([]);
    const navigate = useNavigate()
    const [participant,updatePartisipant] = useState("")
    const [roomId,updateRoomId] = useState("");
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
                if(userName === null){
                    if(participant.trim().length > 2){
                        localStorage.setItem("user",JSON.stringify({name:participant}))
                        navigate(roomId);
                    }
                    else{
                        alert("Please enter correct name")
                    }
                }else{
                    navigate(roomId);
                }
            }}>
                <input type="text" value={roomId} onInput={(event)=>{updateRoomId(event.target.value)}} />
                {userName === null ?<input type="text" placeholder="Enter name" name="" value={participant} onInput={(event)=>{updatePartisipant(event.target.value)}} />:""}
                <button type="submit">create room</button>
            </form>
        </div>
    )
}