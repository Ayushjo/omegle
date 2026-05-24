import { useEffect, useRef, useState } from "react"
import { Link, Router } from "react-router-dom"
import { Room } from "./Room"

export const Landing = () => {
    const [name,setName] = useState("")
    const [joined,setJoined] = useState(false)
    const [localVideoTrack,setLocalVideoTrack] = useState<MediaStreamTrack|null>(null)
     const [localAudioTrack,setLocalAudioTrack] = useState<MediaStreamTrack|null>(null)
     const videoRef = useRef<HTMLVideoElement>(null)
    const getCam  =async()=>{
        const stream = await window.navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        })
        const videoTracks = stream.getVideoTracks()[0]
        const audioTracks = stream.getAudioTracks()[0]
        setLocalVideoTrack(videoTracks)
        setLocalAudioTrack(audioTracks)
        videoRef.current!.srcObject = new MediaStream([videoTracks])
        videoRef.current!.play()
    }
    useEffect(()=>{
        if (videoRef && videoRef.current){
            getCam()
        }

    })
    if (!joined){
        return (
        <>
        <video ref={videoRef} autoPlay  className="w-64 h-64 " />
        <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)} className="border p-2 m-2" />
        <Link to={`/room?name=${name}`} className="bg-blue-500 text-white p-2 rounded" onClick={()=>setJoined(true)}>Join</Link>
        
        
        </>
        
    
    )

    }
    return <Room name={name} localVideoTrack={localVideoTrack} localAudioTrack={localAudioTrack}/>
    
}