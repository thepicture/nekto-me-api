import Accent from "./Accent";

export default class DotAfterDotAccent implements Accent {
    async transpile(message: string): Promise<string> {
        if (message.length === 1) {
            return (<any>(message.toUpperCase() + ".")).replaceAll('..', '.');
        }
        if (message.length == 2 && /\p{Emoji}/gu.test(message)) return message;
        message = (<any>message).replaceAll(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g, '');
        if (message.trim().length == 0) {
            return "Угу.";
        }

        let parenthesisCounter: number = 0;
        let copy: any = String(message.trim())[0].toUpperCase() + String(message.trim()).substring(1);
        for (let i: number = 0; i < message.length; i++) {
            if (copy[i] === '(') {
                parenthesisCounter++;
                if (parenthesisCounter < 0) {
                    copy = copy.slice(0, i) + copy.slice(i + 1, copy.length);
                    i = 0;
                    parenthesisCounter = 0;
                }
            }
            if (copy[i] === ')') {
                parenthesisCounter--;
                if (parenthesisCounter < 0) {
                    copy = copy.slice(0, i) + copy.slice(i + 1, copy.length);
                    i = 0;
                    parenthesisCounter = 0;
                }
            }
        }

        copy = copy
            .trim()
            .replaceAll(/\s\s+/g, ' ')
            .replaceAll(/\?\?+/g, '?')
            .replaceAll(/\!\!+/g, '!')
            .replaceAll(' !', '!')
            .replaceAll(' ?', '?')
            .replaceAll('?', '.')
            .replaceAll('!', '.')
            .replaceAll(/,,+/g, ',')
            .replaceAll(' ,', ',')
            .replaceAll(' .', '.')
            .replaceAll(/\.\.+/g, '.');

        //copy = copy.toLowerCase();
        //copy = copy.replaceAll(/(?<=\s|^)парень(\?|\.)?(?=\s|$)/g, 'девушка');
        //copy = copy.replaceAll(/(?<=\s|^)мужчина(\?|\.)?(?=\s|$)/g, 'женщина');
        //copy = copy.replaceAll(/(?<=\s|^)м(\?|\.)?(?=\s|$)/g, 'ж');
        //copy = copy.replaceAll(/(?<=\s|^)пр(\?|\.)?(?=\s|$)/g, 'здравствуйте. Z');
        //copy = copy.replaceAll(/(?<=\s|^)превет(\?|\.)?(?=\s|$)/g, 'здравствуйте. Z');
        //copy = copy.replaceAll(/(?<=\s|^)превед(\?|\.)?(?=\s|$)/g, 'здравствуйте. Z');
        //copy = copy.replaceAll(/(?<=\s|^)привет(\?|\.)?(?=\s|$)/g, 'здравствуйте. Z');
        //copy = copy.replaceAll(/(?<=\s|^)нет(\?|\.)?(?=\s|$)/g, 'ответ отрицательный');
        //copy = copy.replaceAll(/(?<=\s|^)да(\?|\.)?(?=\s|$)/g, 'ответ положительный');
        //copy = copy.replaceAll(/(?<=\s|^)чё(\?|\.)?(?=\s|$)/g, 'что');
        //copy = copy.replaceAll(/(?<=\s|^)чо(\?|\.)?(?=\s|$)/g, 'что');
        //copy = copy.replaceAll(/(?<=\s|^)че(\?|\.)?(?=\s|$)/g, 'что');
        //copy = copy.replaceAll(/(?<=\s|^)шо(\?|\.)?(?=\s|$)/g, 'что');
        //copy = copy.replaceAll(/(?<=\s|^)ты(\?|\.)?(?=\s|$)/g, 'вы');
        //copy = copy.replaceAll(/шься/g, 'тесь');
        //copy = copy.replaceAll(/(?<=\s|^)тебе(\?|\.)?(?=\s|$)/g, 'вам');
        //copy = copy.replaceAll(/(?<=\s|^)тебя(\?|\.)?(?=\s|$)/g, 'вас');
        //copy = copy.replaceAll(/(?<=\s|^)твой(\?|\.)?(?=\s|$)/g, 'ваш');
        //copy = copy.replaceAll(/(?<=\s|^)твои(\?|\.)?(?=\s|$)/g, 'ваши');
        //copy = copy.replaceAll(/(?<=\s|^)почему(\?|\.)?(?=\s|$)/g, 'позвольте поинтересоваться: ');
        //copy = copy.replaceAll(/(?<=\s|^)как звать(\?|\.)?(?=\s|$)/g, 'позвольте узнать ваше имя в паспорте');
        //copy = copy.replaceAll(/(?<=\s|^)как зовут(\?|\.)?(?=\s|$)/g, 'позвольте узнать ваше имя в паспорте');
        //copy = copy.replaceAll(/(?<=\s|^)ск(\?|\.)?(?=\s|$)/g, 'сколько');
        //copy = copy.replaceAll(/(?<=\s|^)пон(\?|\.)?(?=\s|$)/g, 'понятно');
        //copy = copy.replaceAll(/(?<=\s|^)теб(\?|\.)?(?=\s|$)/g, 'вам');
        //copy = copy.replaceAll(/(?<=\s|^)поч(\?|\.)?(?=\s|$)/g, 'почему');
        //copy = copy.replaceAll(/(?<=\s|^)ясн(\?|\.)?(?=\s|$)/g, 'ясно');
        //copy = copy.replaceAll(/(?<=\s|^)прикольно(\?|\.)?(?=\s|$)/g, 'восхитительно');
        //copy = copy.trim();

        let hasToBeUpperCase = true;
        for (let i = 0; i < copy.length; i++) {
            if (hasToBeUpperCase && /[a-zA-Zа-яА-Я]/.test(copy[i])) {
                copy = copy.slice(0, i) + copy[i].toUpperCase() + copy.slice(i + 1, copy.length);
                hasToBeUpperCase = false;
            } else {
                copy = copy.slice(0, i) + copy[i].toLowerCase() + copy.slice(i + 1, copy.length);
            }
            if (copy[i] === '.') {
                hasToBeUpperCase = true;
            }
        }

        return (copy + '.').replace(/\s\s+/, ' ').replace(/\.\.+/, '.');
    }
}