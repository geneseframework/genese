"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonService = void 0;
class JsonService {
    static prettifyJson(obj, indent = '') {
        const indentation = `${indent}\t`;
        let json = `{\n`;
        obj = JsonService.deletePropertiesWithUndefinedValues(obj);
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
                        for (const element of obj[key]) {
                            json = `${json}${indentation}\t${JsonService.prettifyJson(element, `${indentation}\t`)},\n`;
                        }
                        json = `${json}${indentation}]`;
                        json = (key === Object.keys(obj).slice(-1)[0]) ? `${json}\n` : `${json},\n`;
                    }
                    else {
                        json = `${json}${JsonService.prettifyJson(obj[key], indentation)}`;
                        // let keyIndex = 0;
                        // for (const keyChild of Object.keys(obj[key])) {
                        //     console.log('KEYCHILDDD', keyChild, Object.keys(obj[key]), Object.keys(obj[key]).slice(-1)[0])
                        //     if (keyIndex === 0) {
                        //         json = `${json}${JsonService.prettifyJson(obj[key], `${indentation}`)}`;
                        //     } else {
                        //         json = `${json}${indentation}${JsonService.prettifyJson(obj[key], `${indentation}`)}`;
                        //     }
                        //     json = (keyChild === Object.keys(obj[key]).slice(-1)[0]) ? `${json}\n` : `${json},\n`;
                        //     keyIndex ++;
                        // }
                        break;
                    }
                    break;
                default:
                    console.log('KEY', key, obj[key]);
                    json = `${json}${obj[key]},\n`;
                    break;
            }
            // }
        }
        json = `${json}${indentation.slice(0, -1)}}\n`;
        // console.log('PRETTIFIED JSONNNN', json);
        return json;
    }
    static deletePropertiesWithUndefinedValues(obj) {
        for (const key of Object.keys(obj)) {
            if (obj[key] === undefined) {
                delete obj[key];
            }
        }
        return obj;
    }
    static isLastKey(key, obj) {
        return (key === Object.keys(obj).slice(-1)[0]);
    }
    static prettyJson(obj) {
        if (!obj) {
            return '';
        }
        const json = JSON.stringify(obj);
        let prettifiedJson = '';
        let indent = '';
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
exports.JsonService = JsonService;
