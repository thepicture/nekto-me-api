import Action from "./Action";

export default class AnonLeaveDialogAction implements Action {
    socket: WebSocket;
    dialogId: number;
    constructor(socket: WebSocket, dialogId: number) {
        this.socket = socket;
        this.dialogId = dialogId;
    }
    execute(): void {
        let array = ["action",
            {
                action: "anon.leaveDialog",
                dialogId: this.dialogId,
            }];
        this.socket.send('42' + JSON.stringify(array));
    }
}