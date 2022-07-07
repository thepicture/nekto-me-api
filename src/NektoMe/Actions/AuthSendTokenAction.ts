import Action from "./Action";

export default class AuthSendTokenAction implements Action {
    socket: WebSocket;
    token: string;
    constructor(socket: WebSocket, token: string) {
        this.socket = socket;
        this.token = token;
    }
    execute(): void {
        let array = ["action",
            {
                "action": "auth.sendToken",
                "token": this.token,
            }];
        this.socket.send('42' + JSON.stringify(array));
    }
}