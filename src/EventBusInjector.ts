import EventBus from "./EventBus";

export default interface EventBusInjector {
    bus: EventBus | undefined;
    alias: string | undefined;
}