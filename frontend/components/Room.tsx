import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { io,Socket } from "socket.io-client"
const URL = "http://localhost:3000"
export const Room = ({name,localVideoTrack,localAudioTrack}:{name:string,localVideoTrack:MediaStreamTrack|null,localAudioTrack:MediaStreamTrack|null})=>{
    const [searchParams,setSearchParams] = useSearchParams()
    
    const [socket,setSocket] = useState<Socket|null>(null)
    const [connected,setConnected] =  useState(false)
    const [lobby,setLobby] = useState(true)
   
   const [pc,setPc] = useState<RTCPeerConnection|null>(null)
    const [remoteVideoTrack,setRemoteVideoTrack] = useState<MediaStreamTrack|null>(null)
    
    const [remoteAudioTrack,setRemoteAudioTrack] = useState<MediaStreamTrack|null>(null)
   
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
        peerConnection.ontrack = (({track})=>{
            if(track.kind=="audio"){
                setRemoteAudioTrack(track)
            }
            if(track.kind=="video"){
                setRemoteVideoTrack(track)
            }
        })
        peerConnection.addTrack(localVideoTrack!)
        peerConnection.addTrack(localAudioTrack!)
        if (peerConnection){
            peerConnection.onicecandidate=async ({candidate})=>{
                if(candidate){
                    socket.emit("ice-candidate",{
                        candidate,
                        roomId:searchParams.get("roomId")
                    })
                }
            }
        }
  

        socket.on("send-offer",async({roomId}:{roomId:string})=>{
            alert("send offer please")
            setLobby(false)
            
            const offer = await peerConnection.createOffer()
            await peerConnection.setLocalDescription(offer)
            socket.emit("offer",{roomId,sdp:offer
            })
            
        
            
            
        })
        socket.on("lobby",()=>{
            setLobby(true)
            
        })
        socket.on("ice-candidate",async({candidate,roomId}:{candidate:any,roomId:string})=>{
            peerConnection.addIceCandidate(candidate)
        })
        socket.on("offer",async ({roomId,sdp})=>{
            alert("send answer")
            setLobby(false)
            peerConnection.setRemoteDescription({sdp:sdp,type:"offer"})
            
            const answer = await peerConnection.createAnswer()
            await peerConnection.setLocalDescription(answer)
             
            socket.emit("answer",{
                roomId,sdp:answer
            })
            
           
        })
        socket.on("answer",async ({roomId,sdp})=>{
            setLobby(false)
            await peerConnection.setRemoteDescription({sdp,type:"answer"})
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