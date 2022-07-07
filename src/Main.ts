import ApiBot from "./ApiBot";
import SimpleEventBus from "./SimpleEventBus";
import SocketableTokenableApi from "./SocketableApi";
import SearchRequest from "./WhoIsHere/Requests/SearchRequest";
import WhoIsHereApi from "./WhoIsHere/WhoIsHereApi";
import WhoIsHereBot from "./WhoIsHere/WhoIsHereBot";

setInterval(() => document.body.scrollIntoView(false), 1000);

const bus = new SimpleEventBus();

const token1 = 'df3dc540-6d8a-48bf-98b2-d2ee6d8c814c';
const token2 = 'df3dc540-6d8a-48bf-98b2-d2ee6d8c814c';

const api1: SocketableTokenableApi = new WhoIsHereApi(token1, 'first', bus, true);
const api2: SocketableTokenableApi = new WhoIsHereApi(token2, 'second', bus, false);

api1.connect();
api2.connect();

const bot1: ApiBot = new WhoIsHereBot(new SearchRequest(api1.socket, api1.token, 0, 0));
const bot2: ApiBot = new WhoIsHereBot(new SearchRequest(api2.socket, api1.token, 0, 0));

bot1.api = api1;
bot2.api = api2;

bus.subscribe('firstapimessage', (message: string) => {
    bot2.send(message);
});

bus.subscribe('secondapimessage', (message: string) => {
    bot1.send(message);
});

bus.subscribe('firstapiwriting', () => {
    bot2.startTyping();
});

bus.subscribe('secondapiwriting', () => {
    bot1.startTyping();
});

(<any>Window).bus = bus;

const buttonDisconnectOne: HTMLElement = document.querySelector('#btn-disconnect-1') as HTMLElement;
const buttonDisconnectTwo: HTMLElement = document.querySelector('#btn-disconnect-2') as HTMLElement;

const buttonSearchOne: HTMLElement = document.querySelector('#btn-start-searching-1') as HTMLElement;
const buttonSearchTwo: HTMLElement = document.querySelector('#btn-start-searching-2') as HTMLElement;

const originalSend = WebSocket.prototype.send;
(<any>window).sockets = [];
WebSocket.prototype.send = function (...args) {
    if ((<any>window).sockets.indexOf(this) === -1)
        (<any>window).sockets.push(this);
    return originalSend.call(this, ...args);
};

const chat = document.createElement('article');
chat.setAttribute('id', 'chat');
document.body.append(chat);

buttonDisconnectOne.addEventListener('click', () => {
    api1.disconnect();
});
buttonDisconnectTwo.addEventListener('click', () => {
    api2.disconnect();
});
buttonSearchOne.addEventListener('click', () => {
    bot1.startSearch();
});
buttonSearchTwo.addEventListener('click', () => {
    bot2.startSearch();
});