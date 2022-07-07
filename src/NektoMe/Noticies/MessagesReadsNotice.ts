import Notice from "./Notice";

export default class MessagesReadsNotice implements Notice {
    dialogId: number;
    reads: Array<number>;
    constructor(data: any) {
        this.dialogId = data.dialogId;
        this.reads = data.reads;
    }
}