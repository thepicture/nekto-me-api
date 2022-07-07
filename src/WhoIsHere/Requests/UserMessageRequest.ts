import SocketRequest from "../SocketRequest";

export default class UserMessageRequest implements SocketRequest {
    socket: WebSocket;
    message: string;
    index: number;

    constructor(socket: WebSocket, message: string, index: number) {
        this.socket = socket;
        this.message = message;
        this.index = index;
    }
    send(): void {
        this.socket.send(`42["user message","${this.message}",${this.index}]`);
    }
}