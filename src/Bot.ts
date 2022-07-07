export default interface Bot {
    read(): void;
    startTyping(): void;
    stopTyping(): void;
    send(message: string): void;
    closeDialog(): void;
    startSearch(): void;
    stopSearch(): void;
}