import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

export const Room = ()=>{
    const [searchParams,setSearchParams] = useSearchParams()
    const name = searchParams.get("name")
    useEffect(()=>{
//logic to initlaize room
    },[name])
    return (
        <>
        <h1>Hi {name}</h1>
        </>
    )
}