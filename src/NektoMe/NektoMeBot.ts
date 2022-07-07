import Bot from "../Bot";
import Searcher from "../Searcher";
import AnonLeaveDialogAction from "./Actions/AnonLeaveDialogAction";
import AnonMessageAction from "./Actions/AnonMessageAction";
import AnonReadsMessagesAction from "./Actions/AnonReadsMessagesAction";
import DialogSetTypingAction from "./Actions/DialogSetTypingAction";
import SearchRunAction from "./Actions/SearchRunAction";
import SearchSendOutAction from "./Actions/SearchSendOutAction";
import NektoMeApi from "./NektoMeApi";

export default class NektoMeBot implements Bot, Searcher {
    api!: NektoMeApi;

    read(): void {
        const action: AnonReadsMessagesAction = new AnonReadsMessagesAction(this.api.socket,
            this.api.dialogOpenedNotice.dialogId,
            123);
        action.execute();
    }

    startTyping(): void {
        const action: DialogSetTypingAction = new DialogSetTypingAction(this.api.socket,
            this.api.dialogOpenedNotice.dialogId,
            true);
        action.execute();
    }

    stopTyping(): void {
        const action: DialogSetTypingAction = new DialogSetTypingAction(this.api.socket,
            this.api.dialogOpenedNotice.dialogId,
            false);
        action.execute();
    }

    send(message: string): void {
        const action: AnonMessageAction = new AnonMessageAction(this.api.socket,
            this.api.dialogOpenedNotice.dialogId,
            message,
            this.api.dialogOpenedNotice.selfInterlocutor + '_' + (new Date()).getTime() + Math.random());
        action.execute();
    }

    closeDialog(): void {
        const action: AnonLeaveDialogAction = new AnonLeaveDialogAction(this.api.socket,
            this.api.dialogOpenedNotice.dialogId);
        action.execute();
    }

    startSearch(): void {
        const action: SearchRunAction = new SearchRunAction(this.api.socket);
        //action.myAge = [98, 99];
        //action.mySex = 'M';
        //action.wishSex = 'M';
        //action.wishAge = [[0, 17]];
        action.execute();
    }

    stopSearch(): void {
        const action: SearchSendOutAction = new SearchSendOutAction(this.api.socket);
        action.execute();
    }
}