import Action from "./Action";

export default class AuthSetFptAction implements Action {
    socket: WebSocket;
    token: string;
    fpt: string;
    constructor(socket: WebSocket, token: string, fpt: string) {
        this.socket = socket;
        this.token = token;
        this.fpt = fpt;
    }
    execute(): void {
        let array = [
            "action",
            {
                "action": "auth.setFpt",
                "token": this.token,
                "fpt": this.fpt,
            }
        ];
        this.socket.send('42' + JSON.stringify(array));
    }
}