import EventBus from "../EventBus";
import EventBusInjector from "../EventBusInjector";
import Socketable from "../Socketable";
import Action from "./Actions/Action";
import AuthSendTokenAction from "./Actions/AuthSendTokenAction";
import AuthSetFptAction from "./Actions/AuthSetFptAction";
import DialogClosedNotice from "./Noticies/DialogClosedNotice";
import DialogOpenedNotice from "./Noticies/DialogOpenedNotice";
import DialogTypingNotice from "./Noticies/DialogTypingNotice";
import MessagesNewNotice from "./Noticies/MessagesNewNotice";
import MessagesReadsNotice from "./Noticies/MessagesReadsNotice";
import SearchSuccessNotice from "./Noticies/SearchSuccessNotice";

export default class NektoMeApi implements Socketable, EventBusInjector {
    alias: string | undefined;
    bus: EventBus | undefined;
    socket!: WebSocket;

    dialogOpenedNotice!: DialogOpenedNotice;
    messagesNewNotice!: MessagesNewNotice

    TIMEOUT_BEFORE_LOGIN_MS: number = 2000;
    TIMEOUT_BEFORE_SEARCH_MS: number = 3000;
    PING_PONG_INTERVAL_MS: number = 10000;

    connect(token: string, fpt: string): void {
        if (this.socket) {
            this.disconnect();
        }
        this.socket = new WebSocket('wss://im.nekto.me/socket.io/?EIO=3&transport=websocket');
        this.socket.addEventListener('open', () => {
            this.performHandshake(token, fpt);
            this.enablePingPong();
        });
        this.socket.addEventListener('message', (event: MessageEvent) => {
            this.parseResponse(event.data);
        });
    }

    enablePingPong() {
        if (!this.socket) return;
        if (this.socket.readyState !== 1) return;
        this.socket.send('2');
        setTimeout(() => {
            this.enablePingPong();
        }, this.PING_PONG_INTERVAL_MS);
    }

    performHandshake(token: string, fpt: string): void {
        const action: Action = new AuthSendTokenAction(this.socket, token);
        action.execute();
        setTimeout(() => {
            const action: Action = new AuthSetFptAction(this.socket, token, fpt);
            action.execute();
        }, this.TIMEOUT_BEFORE_LOGIN_MS);
    }

    disconnect(): void {
        if (this.socket)
            this.socket.close();
    }

    parseResponse(response: string) {
        let json;
        if (response.startsWith('42')) {
            json = JSON.parse(response.substring(2));
            if (json[0] === 'notice') {
                switch (json[1].notice) {
                    case "search.success":
                        document.dispatchEvent(new CustomEvent('searchsuccess', {
                            detail: {
                                notice: new SearchSuccessNotice(),
                            }
                        }));
                        break;
                    case "dialog.opened":
                        this.dialogOpenedNotice = new DialogOpenedNotice(json[1].data);
                        document.dispatchEvent(new CustomEvent('dialogopened', {
                            detail: {
                                notice: new DialogOpenedNotice(json[1].data),
                            }
                        }));
                        break;
                    case "dialog.typing":
                        document.dispatchEvent(new CustomEvent('dialogtyping', {
                            detail: {
                                notice: new DialogTypingNotice(json[1].data),
                            }
                        }));
                        break;
                    case "messages.new":
                        if (json[1].data.senderId === this.dialogOpenedNotice.selfInterlocutor) {
                            console.log('Self message for ' + this.alias);
                            return;
                        }
                        this.messagesNewNotice = new MessagesNewNotice(json[1].data);
                        document.dispatchEvent(new CustomEvent('messagesnew', {
                            detail: {
                                notice: this.messagesNewNotice,
                            }
                        }));
                        if (this.bus) {
                            this.bus.notifyAll(`${this.alias}botmessage`, this.messagesNewNotice);
                        }
                        break;
                    case "messages.reads":
                        document.dispatchEvent(new CustomEvent('messagesreads', {
                            detail: {
                                notice: new MessagesReadsNotice(json[1].data),
                            }
                        }));
                        break;
                    case "dialog.closed":
                        document.dispatchEvent(new CustomEvent('dialogclosed', {
                            detail: {
                                notice: new DialogClosedNotice(json[1].data),
                            }
                        }));
                        break;
                }
            }
        }
    }
}