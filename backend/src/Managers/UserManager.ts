import type { Socket } from "socket.io";
import { RoomManager } from "./RoomManager.js";

export interface User{
    socket:Socket;
    name:string;
}

export class UserManager{
    private users:User[];
    private queue:string[];
    private roomManager:RoomManager;
    constructor(){
        this.users = []
        this.queue = []
        this.roomManager = new RoomManager()

    }
    
    addUser(name:string,socket:Socket){
        this.users.push({name,socket})
        this.queue.push(socket.id)
        socket.emit("lobby")
        this.clearQueue()
        this.initHandlers(socket)

    }

    removeUser(socketId:Socket["id"]){
        const user = this.users.find(user => user.socket.id === socketId)
        this.users = this.users.filter(user => user.socket.id !== socketId)
        this.queue = this.queue.filter(id => id !== socketId)
        

    }
    clearQueue(){
        while(this.queue.length >= 2){
            const user1Id = this.queue.shift()!
            const user2Id = this.queue.shift()!
            const user1 = this.users.find(user => user.socket.id === user1Id)
            const user2 = this.users.find(user => user.socket.id === user2Id)
            if(user1 && user2){
                const room = this.roomManager.createRoom(user1,user2)
            
                
                // logic to connect two users
            }
        }
    }

    initHandlers(socket:Socket){
        socket.on("offer",({sdp,roomId}:{sdp:string,roomId:string})=>{
            this.roomManager.onOffer(roomId,sdp)
        })
        socket.on("answer",({sdp,roomId}:{sdp:string,roomId:string})=>{
            this.roomManager.onAnswer(roomId,sdp)
        })
        socket.on("ice-candidate",({candidate,roomId}:{candidate:any,roomId:string})=>{
            this.roomManager.onIceCandidate(roomId,candidate,socket)
        })
    }
    
}