import SocketRequest from "../SocketRequest";

export default class UserWriteRequest implements SocketRequest {
    socket: WebSocket;

    constructor(socket: WebSocket) {
        this.socket = socket;
    }
    send(): void {
        this.socket.send('42["user write"]');
    }
}