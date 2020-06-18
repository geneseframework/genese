import { isLastIndex, isLastKey } from '../../../core/services/tools.service';

export class JsonService {

    /**
     * Converts a javascript object into a prettified Json with break lines
     * @param obj       // The javascript object
     * @param indent    // The initial indentation of the object
     */
    static prettifyJson(obj: object, indent = ''): string {
        const indentation = `${indent}\t`;
        let json = `{\n`;
        obj = JsonService.deleteUndefinedProperties(obj);
        json = JsonService.addProperties(obj, indentation, json);
        json = `${json}${indentation.slice(0, -1)}}`;
        return json;
    }


    /**
     * Adds properties to a json object
     * @param obj               // The javascript object
     * @param indentation       // The previous indentation
     * @param json              // The initial json object
     */
    private static addProperties(obj: object, indentation: string, json: string): string {
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
                    json = Array.isArray(obj[key])
                        ? JsonService.jsonArray(obj, key, indentation, json)
                        : JsonService.jsonObject(obj, key, indentation, json);
                    break;
            }
        }
        return json;
    }


    /**
     * Removes all properties with undefined values
     * @param obj       // The object to clean
     */
    private static deleteUndefinedProperties(obj: object): object {
        for (const key of Object.keys(obj)) {
            if (obj[key] === undefined) {
                delete obj[key];
            }
        }
        return obj;
    }


    /**
     * Returns a comma at the end of a line if this line is the last one of a given object
     * @param key       // The key to check if it's the last one
     * @param obj       // The object to check
     */
    private static comma(key: string, obj: object): string {
        return isLastKey(key, obj) ? '' : ',';
    }


    /**
     * If a property of a given object is an array, it adds to the corresponding json all the lines corresponding to the elements of this array
     * @param obj           // The object with a key which is an array
     * @param key           // The key where obj[key] is an array
     * @param indentation   // The current indentation of the json object
     * @param json          // The corresponding json object
     */
    private static jsonArray(obj: object, key: string, indentation: string, json: string): string {
        json = `${json}[\n`;
        for (let i = 0; i < obj[key].length; i++) {
            json = `${json}${indentation}\t${JsonService.prettifyJson(obj[key][i], `${indentation}\t`)}`;
            json = isLastIndex(i, obj[key]) ? `${json}\n` : `${json},\n`;
        }
        return `${json}${indentation}]${JsonService.comma(key, obj)}\n`;
    }


    /**
     * If a property of a given object is an object, it adds to the corresponding json all the lines corresponding to the elements of this object
     * @param obj          // The object with a key which is an object
     * @param key           // The key where obj[key] is an object
     * @param indentation   // The current indentation of the json object
     * @param json          // The corresponding json object
     */
    private static jsonObject(obj: object, key: string, indentation: string, json: string): string {
        return `${json}${JsonService.prettifyJson(obj[key], indentation)}${JsonService.comma(key, obj)}\n`;
    }


    static astPropertyNames(obj: object): object {
        for (const key of Object.keys(obj)) {
            switch (key) {
                case 'tsFiles':
                    obj['astFiles'] = JsonService.astPropertyNames(obj[key]);
                    delete obj[key];
                    break;
                case 'tsNode':
                    obj['astNode'] = JsonService.astPropertyNames(obj[key]);
                    delete obj[key];
                    break;
                default:
                    obj[key] = typeof obj[key] === 'object' ? JsonService.astPropertyNames(obj[key]) : obj[key];
                    // obj[key] = k;
                    // obj[key] = JsonService.astPropertyNames(obj[key]);
            }
        }
        return obj;
    }
}
