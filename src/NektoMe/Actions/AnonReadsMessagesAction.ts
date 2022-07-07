import Action from "./Action";

export default class AnonReadsMessagesAction implements Action {
    socket: WebSocket;
    dialogId: number;
    lastMessageId: number;
    constructor(socket: WebSocket, dialogId: number, lastMessageId: number) {
        this.socket = socket;
        this.dialogId = dialogId;
        this.lastMessageId = lastMessageId;
    }
    execute(): void {
        let array = ["action",
            {
                action: "anon.readMessages",
                dialogId: this.dialogId,
                lastMessageId: this.lastMessageId,
            }];
        this.socket.send('42' + JSON.stringify(array));
    }
}