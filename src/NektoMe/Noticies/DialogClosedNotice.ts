import Notice from "./Notice";

export default class DialogClosedNotice implements Notice {
    dialogId: number;
    whoClosedId: number;
    constructor(data: any) {
        this.dialogId = data.id;
        this.whoClosedId = data.close;
    }
}