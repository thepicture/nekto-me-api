import Api from "./Api";
import Bot from "./Bot";
import HasApi from "./HasApi";

export default abstract class ApiBot implements HasApi, Bot {
    abstract startSearch(): void;
    abstract stopSearch(): void;
    abstract read(): void;
    abstract startTyping(): void;
    abstract stopTyping(): void;
    abstract send(message: string): void;
    abstract closeDialog(): void;
    abstract api: Api;
}