import Action from "./Action";

export default class SearchRunAction implements Action {
    socket: WebSocket;
    myAge: Array<number> | undefined
    mySex: string | undefined
    wishSex: string | undefined
    wishAge: Array<Array<number>> | undefined
    constructor(socket: WebSocket) {
        this.socket = socket;
    }

    execute(): void {
        let array: any = ["action",
            {
                action: "search.run",
            }];
        this.myAge && (array[1].myAge = this.myAge);
        this.mySex && (array[1].mySex = this.mySex);
        this.wishSex && (array[1].wishSex = this.wishSex);
        this.wishAge && (array[1].wishAge = this.wishAge);
        this.socket.send('42' + JSON.stringify(array));
    }
}