import { useEffect, useRef, useState } from "react"
import { Link, Router } from "react-router-dom"

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
        videoRef.current!.srcObject = stream
        videoRef.current!.play()
    }
    useEffect(()=>{
        if (videoRef && videoRef.current){
            getCam()
        }

    })
    return (
        <>
        <video ref={videoRef} autoPlay  className="w-64 h-64 " />
        
        
        </>
        
    
    )
}