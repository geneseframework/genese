import { isLastElement, isLastIndex, isLastKey } from '../../../core/services/tools.service';

export class JsonService {

    static prettifyJson(obj: object, indent = ''): string {
        const indentation = `${indent}\t`;
        let json = `{\n`;
        obj = JsonService.deleteUndefinedProperties(obj)
        for (const key of Object.keys(obj)) {
            json = `${json}${indentation}"${key}": `;
            switch (typeof obj[key]) {
                case 'number':
                case 'bigint':
                case 'boolean':
                    json = `${json}${obj[key]}${JsonService.comma(key, obj)}\n`;
                    break;
                case 'string':
                    json = `${json}"${obj[key]}"${JsonService.comma(key, obj)}\n`;
                    break;
                case 'object':
                    obj[key] = JsonService.deleteUndefinedProperties(obj[key]);
                    if (Array.isArray(obj[key])) {
                        json = `${json}[\n`;
                        for (let i = 0; i < obj[key].length; i++) {
                            json = `${json}${indentation}\t${JsonService.prettifyJson(obj[key][i], `${indentation}\t`)}`;
                            json = isLastIndex(i, obj[key]) ? `${json}\n` : `${json},\n`;
                        }
                        json = `${json}${indentation}]`;
                        json = (key === Object.keys(obj).slice(-1)[0]) ? `${json}\n` : `${json},\n`;
                    } else {
                        json = `${json}${JsonService.prettifyJson(obj[key], indentation)}`;
                        break;
                    }
                    break;
            }
        }
        json = `${json}${indentation.slice(0, -1)}}`;
        return json;
    }


    private static deleteUndefinedProperties(obj: object): object {
        for (const key of Object.keys(obj)) {
            if (obj[key] === undefined) {
                delete obj[key];
            }
        }
        return obj;
    }


    private static comma(key: string, obj: object): string {
        return isLastKey(key, obj) ? '' : ',';
    }
}
