import { Socket } from "socket.io";
interface User {
    socket: Socket;
    name: string;
}
export declare class RoomManager {
    private rooms;
    constructor();
    createRoom(user1: User, user2: User): void;
    onOffer(roomId: string, sdp: string): void;
    onAnswer(roomId: string, sdp: string): void;
    generateRoomId(): number;
}
export {};
//# sourceMappingURL=RoomManager.d.ts.map