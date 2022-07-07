import SocketRequest from "../SocketRequest";

export default class SearchRequest implements SocketRequest {
    socket: WebSocket;
    token: string;
    interlocutorGenderCode: number;
    myGenderCode: number;

    constructor(socket: WebSocket, token: string,
        myGenderCode: number = 0, interlocutorGenderCode: number = 0) {
        this.socket = socket;
        this.token = token;
        this.myGenderCode = myGenderCode;
        this.interlocutorGenderCode = interlocutorGenderCode;
    }
    send(): void {
        const array = ["start_chat",
            this.myGenderCode,
            this.interlocutorGenderCode,
            "",
            false,
            this.token,
            [13, 65],
            this.token]
        this.socket.send(`423${JSON.stringify(array)}`);
    }
}