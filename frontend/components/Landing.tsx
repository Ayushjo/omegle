import { useState } from "react"
import { Link, Router } from "react-router-dom"

export const Landing = () => {
    const [name,setName] = useState("")
    return (
        <>
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl  font-bold mb-4">Welcome to the Landing Page</h1>
            <p className="text-lg">This is the landing page of the application.</p>
        </div>
        <input  className="border p-2 rounded" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
        <Link to={`/room/?name=${name}`}>Join</Link>
        
        </>
        
    
    )
}