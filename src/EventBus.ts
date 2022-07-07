export default interface EventBus {
    subscribe(event: string, callback: Function): void;
    notifyAll(event: string, arg: any): void;
}