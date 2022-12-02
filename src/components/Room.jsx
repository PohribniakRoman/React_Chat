import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {FaPaperPlane} from "react-icons/fa";
import socket from "../websocket";




export default function Room() {
    const [participants,updatePartisipants] = useState([])
    const [message,updateMessage] = useState("")
    const [history,updateHistory] = useState([]);
    const {roomId} = useParams();
    const navigate  = useNavigate();

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));  
        if(user===null){return navigate("/")}

        socket.emit("ENTER_ROOM",{roomId,participant:user.name})

        socket.emit("GET_CONNECTED_SOCKETS",{roomId})

        socket.on("ROOM_SOCKETS",({roomParticipants})=>{
            updatePartisipants(roomParticipants);
        })
        socket.on("MESSAGE_HISTORY",(messages)=>{
            updateHistory(messages);
        })
        
        socket.on("NEW_MESSAGE",(message)=>{
            updateHistory((prevState)=>{return [...prevState,message]});
        })

        return () => {
            socket.emit("LEAVE_ROOM",{roomId})
        }
    },[])

    const {name} = JSON.parse(localStorage.getItem("user"));

    return <section className="chat">
        <div className="chat__main">
            <div className="chat__main--history">
                {history.map((message,ind)=>{
                    return <div key={ind} className={`chat__main--message ${name===message.sender?"my":""}`}>
                                <div className="chat__main--box">
                                    <h3 className="chat__main--sender">{message.sender}</h3>
                                    <p className="chat__main--txt">{message.txt}</p>
                                </div>
                            </div>
                })}
            </div>
            <form onSubmit={(event)=>{
                event.preventDefault();
                socket.emit("MESSAGE",{sender:name,txt:message,roomId})
                updateMessage('');
            }}>
                <input type="text" className="chat__main--text" onInput={(event)=>{updateMessage(event.target.value)}} value={message}/>
                <button type="submit" className="chat__main--submit">
                    <FaPaperPlane/>
                </button>
            </form>
        </div>
        <div className="chat__users">
            <div className="chat__id">{roomId}</div>
            {participants.map(e=>{
                return <div className="chat__users--participant" key={e}>{e}</div>
            })}
        </div>
    </section>
}