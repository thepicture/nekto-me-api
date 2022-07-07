import Accent from "./Accent";

export default class DotAfterDotAccent implements Accent {
    async transpile(message: string): Promise<string> {
        if (Math.random() > 0.05) {
            return await Promise.resolve(message);
        }
        return await fetch(
            'https://google-translate1.p.rapidapi.com/language/translate/v2',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    accept: 'application/json',
                    'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
                    'x-rapidapi-key':
                        '44aaaeef79msh75169124fb09b39p153dedjsnab8c1122a6a5',
                },
                body: new URLSearchParams({
                    q: message,
                    target: "en",
                    source: "ru",
                })
            },
        )
            .then(res => res.json())
            .catch(err => {
                return message;
            })
            .then(json => {
                return json.data.translations[0].translatedText;
            })
            .catch(err => {
                return message;
            });
    }
}