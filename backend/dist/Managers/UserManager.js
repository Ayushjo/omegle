import { RoomManager } from "./RoomManager.js";
export class UserManager {
    users;
    queue;
    roomManager;
    constructor() {
        this.users = [];
        this.queue = [];
        this.roomManager = new RoomManager();
    }
    addUser(name, socket) {
        this.users.push({ name, socket });
        this.queue.push(socket.id);
        this.clearQueue();
        this.initHandlers(socket);
    }
    removeUser(socketId) {
        this.users = this.users.filter(user => user.socket.id !== socketId);
        this.queue = this.queue.filter(id => id !== socketId);
    }
    clearQueue() {
        while (this.queue.length >= 2) {
            const user1Id = this.queue.shift();
            const user2Id = this.queue.shift();
            const user1 = this.users.find(user => user.socket.id === user1Id);
            const user2 = this.users.find(user => user.socket.id === user2Id);
            if (user1 && user2) {
                const room = this.roomManager.createRoom(user1, user2);
                // logic to connect two users
            }
        }
    }
    initHandlers(socket) {
        socket.on("offer", ({ sdp, roomId }) => {
            this.roomManager.onOffer(roomId, sdp);
        });
        socket.on("answer", ({ sdp, roomId }) => {
            this.roomManager.onAnswer(roomId, sdp);
        });
    }
}
//# sourceMappingURL=UserManager.js.map