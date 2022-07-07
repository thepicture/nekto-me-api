import SocketRequest from "../SocketRequest";

export default class ValidateRequest implements SocketRequest {
    socket: WebSocket;

    constructor(socket: WebSocket) {
        this.socket = socket;
    }
    send(): void {
        this.socket.send('420["validate"]');
    }
}