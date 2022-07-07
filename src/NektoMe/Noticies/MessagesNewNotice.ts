import Notice from "./Notice";

export default class MessagesNewNotice implements Notice {
    messageId: number;
    dialogId: number;
    senderId: number;
    randomId: string;
    message: string;
    createTime: number;
    isRead: boolean;
    constructor(data: any) {
        this.messageId = data.id;
        this.dialogId = data.dialogId;
        this.senderId = data.senderId;
        this.randomId = data.randomId;
        this.message = data.message;
        this.createTime = data.createTime;
        this.isRead = data.read;
    }
}