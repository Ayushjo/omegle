import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { io,Socket } from "socket.io-client"
const URL = "http://localhost:3000"
export const Room = ()=>{
    const [searchParams,setSearchParams] = useSearchParams()
    const name = searchParams.get("name")
    const [socket,setSocket] = useState<Socket|null>(null)
    const [connected,setConnected] =  useState(false)
    useEffect(()=>{
        const socket = io(URL,{
            autoConnect:false
        })
        socket.connect()
        socket.on("connect",()=>{
            alert("connected")
            setConnected(true)
        })
        socket.on("send-offer",({roomId}:{roomId:string})=>{
            alert("send offer please")
            socket.emit("offer",{
                roomId,
                sdp:""
            })
        })
        socket.on("offer",({roomId,sdp})=>{
            alert("send answer")
            socket.emit("answer",{
                roomId,sdp:""
            })
        })
        socket.on("answer",({roomId,sdp})=>{
            alert("Connection Done")

        })
        setSocket(socket)
//logic to initlaize room
    },[name])
    return (
        <>
        <h1>Hi {name}</h1>
        </>
    )
}