export class JsonService {


    static prettyJson(obj: object): string {
        if (!obj) {
            return '';
        }
        const json = JSON.stringify(obj);
        let prettifiedJson = '';
        let indent= '';
        for (const char of json) {
            switch (char) {
                case ':':
                    prettifiedJson = `${prettifiedJson}: `;
                    break;
                case '{':
                case '[':
                    prettifiedJson = `${prettifiedJson}${char}\n${indent}\t`;
                    indent = `${indent}\t`;
                    break;
                case ',':
                    prettifiedJson = `${prettifiedJson}${char}\n${indent}`;
                    break;
                case '}':
                case ']':
                    indent = `${indent.slice(0, -1)}`;
                    prettifiedJson = `${prettifiedJson}\n${indent}${char}`;
                    break;
                default:
                    prettifiedJson = `${prettifiedJson}${char}`;
            }
        }
        console.log('PRETTY JSONNNN', prettifiedJson);
        return prettifiedJson;
    }

}
