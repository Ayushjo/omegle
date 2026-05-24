import { Socket } from "socket.io";
interface User{
    socket:Socket;
    name:string;
}
interface Room {
    user1:User;
    user2:User;

}
let GLOBAL_ROOM_ID = 1;
export class RoomManager{
    private rooms:Map<string,Room>
    
    constructor(){
        this.rooms = new Map<   string,Room>()

    }

    createRoom(user1:User, user2:User){
        const roomId = this.generateRoomId().toString()
        this.rooms.set(roomId,{
            user1,user2
        }) 
        user1.socket.emit("send-offer",{
            roomId
        })
    }
    onIceCandidate(roomId:string,candidate:any,socket:Socket){
        const room = this.rooms.get(roomId)
        if(room){
            const otherUser = room.user1.socket.id === socket.id ? room.user2 : room.user1
            otherUser.socket.emit("ice-candidate",{
                candidate,
                roomId
            })
            
        }
    }

    onOffer(roomId:string,sdp:string){
        const user2 = this.rooms.get(roomId)?.user2
        user2?.socket.emit("offer",{
            sdp,
            roomId
        })
    }
    onAnswer(roomId:string,sdp:string){
        const user1 = this.rooms.get(roomId)?.user1
        user1?.socket.emit("answer",{
            sdp
            ,roomId
        })
    }
    generateRoomId(){
        return GLOBAL_ROOM_ID++;
    }
    deleteRoom(roomId:string){
        const room  = this.rooms.get(roomId)
        
    }
}