import EventBus from "./EventBus";

export default class SimpleEventBus implements EventBus {
    functions: any = {};

    subscribe(event: string, callback: Function): void {
        if (!this.functions[event]) {
            this.functions[event] = [];
        }
        this.functions[event].push(callback);
    }

    notifyAll(event: string, arg: any): void {
        const functionsToNotify: Array<Function> = this.functions[event];
        if (!functionsToNotify || functionsToNotify.length === 0)
            return;
        functionsToNotify.forEach(foo => {
            foo(arg);
        });
    }
}