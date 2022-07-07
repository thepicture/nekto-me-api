import StringGenerator from "./StringGenerator";

export default class UuidV4Generator implements StringGenerator {
    generate(): string {
        return ("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,
            function (e) {
                var t = 16 * Math.random() | 0;
                return ("x" == e ? t : 3 & t | 8).toString(16);
            }));
    }
}