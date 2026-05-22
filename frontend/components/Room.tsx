import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { io,Socket } from "socket.io-client"
const URL = "http://localhost:3000"
export const Room = ()=>{
    const [searchParams,setSearchParams] = useSearchParams()
    const name = searchParams.get("name")
    const [socket,setSocket] = useState<Socket|null>(null)
    const [connected,setConnected] =  useState(false)
    const [lobby,setLobby] = useState(true)
    const [pc,setPc] = useState<RTCPeerConnection|null>(null)
    useEffect(()=>{
        const socket = io(URL,{
            autoConnect:false
        })
        socket.connect()
        socket.on("connect",()=>{
            alert("connected")
            setConnected(true)
        })
        const peerConnection = new RTCPeerConnection()
        setPc(peerConnection)

        socket.on("send-offer",async({roomId}:{roomId:string})=>{
            alert("send offer please")
            setLobby(false)
            const offer = await peerConnection.createOffer()
            await peerConnection.setLocalDescription(offer)
            socket.emit("offer",{
                roomId,
                sdp:offer
            })
        })
        socket.on("lobby",()=>{
            setLobby(true)
            
        })

        socket.on("offer",async ({roomId,sdp})=>{
            alert("send answer")
            setLobby(false)
            const answer = await peerConnection.createAnswer()
            await peerConnection.setLocalDescription(answer)
            socket.emit("answer",{
                roomId,sdp:answer
            })
        })
        socket.on("answer",async ({roomId,sdp})=>{
            setLobby(false)
            await peerConnection.setRemoteDescription(sdp)
            alert("Connection Done")

        })
        setSocket(socket)

    },[name])
    console.log(lobby)
    if(lobby){
        return <div>
            Waiting to connect you to someone...
        </div>
    }
    return (
        <>
        <h1>Hi {name}</h1>
        <video width={400} height={300}/>
        <video width={400} height={300}/>

        </>
    )
}