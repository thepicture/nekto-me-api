import Action from "./Action";

export default class DialogSetTypingAction implements Action {
    socket: WebSocket;
    dialogId: number;
    isTyping: boolean;
    constructor(socket: WebSocket, dialogId: number, isTyping: boolean) {
        this.socket = socket;
        this.dialogId = dialogId;
        this.isTyping = isTyping;
    }
    execute(): void {
        let array = ["action",
            {
                action: "dialog.setTyping",
                dialogId: this.dialogId,
                typing: this.isTyping,
            }];
        this.socket.send('42' + JSON.stringify(array));
    }
}