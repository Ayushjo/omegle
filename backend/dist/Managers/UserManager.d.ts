import type { Socket } from "socket.io";
export interface User {
    socket: Socket;
    name: string;
}
export declare class UserManager {
    private users;
    private queue;
    private roomManager;
    constructor();
    addUser(name: string, socket: Socket): void;
    removeUser(socketId: Socket["id"]): void;
    clearQueue(): void;
    initHandlers(socket: Socket): void;
}
//# sourceMappingURL=UserManager.d.ts.map