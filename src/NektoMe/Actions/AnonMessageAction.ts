import Action from "./Action";

export default class AnonMessageAction implements Action {
    socket: WebSocket;
    dialogId: number;
    message: string;
    randomId: string;
    constructor(socket: WebSocket, dialogId: number,
        message: string, randomId: string) {
        this.socket = socket;
        this.dialogId = dialogId;
        this.message = message;
        this.randomId = randomId;
    }
    execute(): void {
        let array = ["action",
            {
                action: "anon.message",
                dialogId: this.dialogId,
                message: this.message,
                randomId: this.randomId,
            }];
        this.socket.send('42' + JSON.stringify(array));
    }
}