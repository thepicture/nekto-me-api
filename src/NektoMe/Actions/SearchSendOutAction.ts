import Action from "./Action";

export default class SearchSendOutAction implements Action {
    socket: WebSocket;
    myAge: Array<number> | undefined
    mySex: string | undefined
    wishSex: string | undefined
    wishAge: Array<Array<number>> | undefined
    constructor(socket: WebSocket) {
        this.socket = socket;
    }

    execute(): void {
        let array = ["action",
            {
                action: "search.sendOut",
            }];
        this.socket.send('42' + JSON.stringify(array));
    }
}