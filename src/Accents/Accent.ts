export default interface Accent {
    transpile(message: string): Promise<string>;
}