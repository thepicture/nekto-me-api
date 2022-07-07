import Notice from "./Notice";

export default class DialogTypingNotice implements Notice {
    isTyping: boolean;
    dialogId: number;
    constructor(data: any) {
        this.dialogId = data.dialogId;
        this.isTyping = data.isTyping;
    }
}