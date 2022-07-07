import EventBus from "./EventBus";
import EventBusInjector from "./EventBusInjector";
import DialogOpenedNotice from "./NektoMe/Noticies/DialogOpenedNotice";
import MessagesNewNotice from "./NektoMe/Noticies/MessagesNewNotice";
import Socketable from "./Socketable";

export default class MockApi implements Socketable, EventBusInjector {
    alias: string | undefined;
    bus: EventBus | undefined;
    socket!: WebSocket;

    dialogOpenedNotice: DialogOpenedNotice = new DialogOpenedNotice(JSON.parse(`["notice",{"data":{"id":${+new Date()},"interlocutors":[20625327,23896723],"messages":[],"createTime":1645607583,"updateTime":1645607583,"adult":false},"notice":"dialog.opened"}]`)[1].data);
    messagesNewNotice!: MessagesNewNotice

    connect(token: string): void {

    }

    enablePingPong() {

    }

    performHandshake(token: string): void {

    }

    disconnect(): void {

    }

    parseResponse(response: string) {
        const json = JSON.parse(`["notice",
        {"data":{"id":8203105961,"dialogId":567498246,"senderId":20625327,"randomId":"-2853111241407224327","message":"${this.alias}_${+new Date()}","createTime":1645607597,"read":false},"notice":"messages.new"}]`);
        this.messagesNewNotice = new MessagesNewNotice(json[1].data);
        document.dispatchEvent(new CustomEvent('messagesnew', {
            detail: {
                notice: this.messagesNewNotice,
            }
        }));
        if (this.bus) {
            this.bus.notifyAll(`${this.alias}botmessage`, this.messagesNewNotice);
        }
    }
}