import Notice from "./Notice";

export default class DialogOpenedNotice implements Notice {
    dialogId: number;
    selfInterlocutor: number;
    anonInterlocutor: number;
    messages: Array<any>;
    updateTime: number;
    createTime: number;
    isAdult: boolean;
    constructor(data: any) {
        this.dialogId = data.id;
        this.selfInterlocutor = data.interlocutors[0];
        this.anonInterlocutor = data.interlocutors[1];
        this.messages = data.messages;
        this.createTime = data.createTime;
        this.updateTime = data.updateTime;
        this.isAdult = data.adult;
    }
}