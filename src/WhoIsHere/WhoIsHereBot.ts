import ApiBot from "../ApiBot";
import Searcher from "../Searcher";
import SocketableTokenableApi from "../SocketableApi";
import LeaveRequest from "./Requests/LeaveRequest";
import SearchRequest from "./Requests/SearchRequest";
import UserMessageRequest from "./Requests/UserMessageRequest";
import UserWriteRequest from "./Requests/UserWriteRequest";

export default class WhoIsHereBot implements ApiBot, Searcher {
    api!: SocketableTokenableApi;
    mySendMessagesIndexCounter: number = 0;
    searchRequest: SearchRequest | undefined;

    constructor(searchRequest?: SearchRequest) {
        this.searchRequest = searchRequest;
    }

    startSearch(): void {
        if (!this.searchRequest)
            new SearchRequest(this.api.socket, this.api.token).send();
        else
            this.searchRequest.send();
    }
    stopSearch(): void {
        throw new Error("Method not implemented.");
    }
    read(): void {
        throw new Error("Method not implemented.");
    }
    startTyping(): void {
        new UserWriteRequest(this.api.socket).send();
    }
    stopTyping(): void {
        throw new Error("Method not implemented.");
    }
    send(message: string): void {
        new UserMessageRequest(this.api.socket,
            message,
            this.mySendMessagesIndexCounter++)
            .send();
    }
    closeDialog(): void {
        new LeaveRequest(this.api.socket).send();
    }
}