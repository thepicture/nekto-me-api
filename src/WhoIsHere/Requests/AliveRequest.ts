import SocketRequest from "../SocketRequest";

export default class AliveRequest implements SocketRequest {
    socket: WebSocket;

    constructor(socket: WebSocket) {
        this.socket = socket;
    }
    send(): void {
        this.socket.send('2');
    }
}