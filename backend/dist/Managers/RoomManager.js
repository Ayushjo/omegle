import { Socket } from "socket.io";
let GLOBAL_ROOM_ID = 1;
export class RoomManager {
    rooms;
    constructor() {
        this.rooms = new Map();
    }
    createRoom(user1, user2) {
        const roomId = this.generateRoomId().toString();
        this.rooms.set(roomId, {
            user1, user2
        });
        user1.socket.emit("send-offer", {
            roomId
        });
    }
    onOffer(roomId, sdp) {
        const user2 = this.rooms.get(roomId)?.user2;
        user2?.socket.emit("offer", {
            sdp,
            roomId
        });
    }
    onAnswer(roomId, sdp) {
        const user1 = this.rooms.get(roomId)?.user1;
        user1?.socket.emit("answer", {
            sdp,
            roomId
        });
    }
    generateRoomId() {
        return GLOBAL_ROOM_ID++;
    }
}
//# sourceMappingURL=RoomManager.js.map