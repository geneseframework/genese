export class JsonService {

    static prettifyJson(obj: object, indent = ''): string {
        const indentation = `${indent}\t`;
        let json = `{\n`;
        obj = JsonService.deletePropertiesWithUndefinedValues(obj)
        for (const key of Object.keys(obj)) {
            // if (obj[key]) {
            json = `${json}${indentation}"${key}": `;
            switch (typeof obj[key]) {
                case 'number':
                case 'bigint':
                case 'boolean':
                    json = `${json}${obj[key]}`;
                    json = JsonService.isLastKey(key, obj) ? `${json}\n` : `${json},\n`;
                    break;
                case 'string':
                    json = `${json}"${obj[key]}"`;
                    json = JsonService.isLastKey(key, obj) ? `${json}\n` : `${json},\n`;
                    break;
                case 'object':
                    obj[key] = JsonService.deletePropertiesWithUndefinedValues(obj[key]);
                    if (Array.isArray(obj[key])) {
                        json = `${json}[\n`;
                        let index = 0;
                        for (const element of obj[key]) {
                            index++;
                            json = `${json}${indentation}\t${JsonService.prettifyJson(element, `${indentation}\t`)}`;
                            json = (index === obj[key].length) ? `${json}\n` : `${json},\n`;
                        }
                        json = `${json}${indentation}]`;
                        json = (key === Object.keys(obj).slice(-1)[0]) ? `${json}\n` : `${json},\n`;
                    } else {
                        json = `${json}${JsonService.prettifyJson(obj[key], indentation)}`;
                        break;
                    }
                    break;
                default:
                    console.log('KEY', key, obj[key])
                    json = `${json}${obj[key]},\n`;
                    break;
            }
            // }
        }
        json = `${json}${indentation.slice(0, -1)}}`;
        // console.log('PRETTIFIED JSONNNN', json);
        return json;
    }


    private static deletePropertiesWithUndefinedValues(obj: object): object {
        for (const key of Object.keys(obj)) {
            if (obj[key] === undefined) {
                delete obj[key];
            }
        }
        return obj;
    }

    private static isLastKey(key, obj: object): boolean {
        return (key === Object.keys(obj).slice(-1)[0]);
    }

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
