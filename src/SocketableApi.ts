import Api from "./Api";
import Socketable from "./Socketable";
import Tokenable from "./Tokenable";

export default abstract class SocketableTokenableApi implements Socketable, Api, Tokenable {
    abstract token: string;
    abstract connect(): void;
    abstract disconnect(): void;
    abstract socket: WebSocket;
}