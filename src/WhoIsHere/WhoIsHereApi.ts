import EventBus from "../EventBus";
import EventBusInjector from "../EventBusInjector";
import Parser from "../Parser";
import SimpleEventBus from "../SimpleEventBus";
import SocketableApi from "../SocketableApi";
import AliveRequest from "./Requests/AliveRequest";
import LeaveRequest from "./Requests/LeaveRequest";
import SearchRequest from "./Requests/SearchRequest";
import ValidateRequest from "./Requests/ValidateRequest";

export default class WhoIsHereApi extends SocketableApi implements Parser, EventBusInjector {
    socket!: WebSocket;
    isValidated: boolean = false;
    bus: EventBus | undefined;
    alias: string | undefined;
    currentChatGuid!: number;

    PING_PONG_INTERVAL_MS: number = 15000;
    SEARCH_INTERVAL_MS: number = 2000;
    TIMEOUT_BEFORE_LEAVE_MS: number = 4000;
    ARTIFICIAL_THROTTLE_MS: number = 500;

    token: string;
    isSelf: boolean | undefined;

    constructor(token: string, alias?: string, bus?: SimpleEventBus, isSelf?: boolean) {
        super();
        this.token = token;
        this.alias = alias;
        this.bus = bus;
        this.isSelf = isSelf;
    }

    connect(): void {
        if (this.socket && this.socket.readyState === 1)
            this.disconnect();
        this.socket = new WebSocket('INSERT_SOCKET_LINK_HERE=' + (+ Math.random()));
        this.socket.addEventListener('open', () => {
            this.informImAlive();
        });
        this.socket.addEventListener('message', (event: MessageEvent) => {
            if (!this.isValidated) {
                new ValidateRequest(this.socket).send();
                this.isValidated = true;
            }
            this.parse(event.data);
        });
    }
    informImAlive() {
        if (!this.socket)
            return;
        if (this.socket.readyState !== 1)
            return;
        new AliveRequest(this.socket).send();
        setTimeout(() => this.informImAlive(), this.PING_PONG_INTERVAL_MS);
    }

    disconnect(): void {
        if (!this.socket)
            return;
        new LeaveRequest(this.socket).send();
        this.socket.close();
    }

    isSearching: boolean = false;

    async parse(data: any): Promise<void> {
        let array: Array<any>;
        const jsonRegex = /\d+(({|\[).+)/;
        if (jsonRegex.test(data)) {
            array = JSON.parse((jsonRegex.exec(data) as RegExpExecArray)[1]);
        } else {
            return;
        }
        if (array[0] === 'user write') {
            if (this.bus && this.alias) {
                this.bus.notifyAll(`${this.alias}apiwriting`, null);
            }
        } else if (array[0] === 'user message' && array[1] !== 'service') {
            console.log(`${this.alias}: ${array[2]}`);
            if (this.bus && this.alias) {
                this.bus.notifyAll(`${this.alias}apimessage`, array[2]);
            }

            const div: HTMLElement = document.createElement('div');
            const p: HTMLElement = document.createElement('p');
            p.innerText = array[2];
            p.classList.add('message');
            p.classList.add(this.isSelf ? 'self' : 'anon');
            p.style.backgroundColor = `#${Number((this.currentChatGuid * 2) % 256).toString(16)}${Number((this.currentChatGuid * 3) % 256).toString(16)}${Number((this.currentChatGuid * 4) % 256).toString(16)}`;
            div.appendChild(p);
            (document.querySelector(`#chat`) as HTMLElement).append(div);

        } else if (array[0] === 'announcement') {
            console.log(`${this.alias} interlocutor quit.`);
            new LeaveRequest(this.socket).send();
            await new Promise(resolve => {
                return setTimeout(resolve,
                    Math.floor(this.TIMEOUT_BEFORE_LEAVE_MS * Math.random()));
            });
            new ValidateRequest(this.socket).send();
            await new Promise(resolve => {
                return setTimeout(resolve, this.ARTIFICIAL_THROTTLE_MS);
            });
            new SearchRequest(this.socket, this.token).send();
        } else if (array[0] === 'challenge'.replace('e', 'a')) {
            console.log('You must solve captcha');
        } else if (array[0] === 'nicknames' && Object.getOwnPropertyNames(array[1]).length === 2) {
            this.currentChatGuid = + new Date();
            console.log(`${this.alias}: Connected to the dialogue`);
        }
    }
}