"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonService = void 0;
const tools_service_1 = require("../../../core/services/tools.service");
class JsonService {
    /**
     * Converts a javascript object into a prettified Json with break lines
     * @param obj       // The javascript object
     * @param indent    // The initial indentation of the object
     */
    static prettifyJson(obj, indent = '') {
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
    static addProperties(obj, indentation, json) {
        for (const key of Object.keys(obj)) {
            json = `${json}${indentation}"${key}": `;
            switch (typeof obj[key]) {
                case 'number':
                case 'bigint':
                case 'boolean':
                    json = `${json}${obj[key]}${JsonService.comma(obj, key)}\n`;
                    break;
                case 'string':
                    json = JsonService.getStringProperty(obj, key, json);
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
    static deleteUndefinedProperties(obj) {
        for (const key of Object.keys(obj)) {
            if (obj[key] === undefined) {
                delete obj[key];
            }
        }
        return obj;
    }
    static getStringProperty(obj, key, json) {
        const text = key === 'text' ? obj[key].replace(/"/g, '\"') : obj[key];
        return `${json}"${text}"${JsonService.comma(obj, key)}\n`;
    }
    /**
     * Returns a comma at the end of a line if this line is the last one of a given object
     * @param key       // The key to check if it's the last one
     * @param obj       // The object to check
     */
    static comma(obj, key) {
        return tools_service_1.isLastKey(key, obj) ? '' : ',';
    }
    /**
     * If a property of a given object is an array, it adds to the corresponding json all the lines corresponding to the elements of this array
     * @param obj           // The object with a key which is an array
     * @param key           // The key where obj[key] is an array
     * @param indentation   // The current indentation of the json object
     * @param json          // The corresponding json object
     */
    static jsonArray(obj, key, indentation, json) {
        json = `${json}[\n`;
        for (let i = 0; i < obj[key].length; i++) {
            json = `${json}${indentation}\t${JsonService.prettifyJson(obj[key][i], `${indentation}\t`)}`;
            json = tools_service_1.isLastIndex(i, obj[key]) ? `${json}\n` : `${json},\n`;
        }
        return `${json}${indentation}]${JsonService.comma(obj, key)}\n`;
    }
    /**
     * If a property of a given object is an object, it adds to the corresponding json all the lines corresponding to the elements of this object
     * @param obj          // The object with a key which is an object
     * @param key           // The key where obj[key] is an object
     * @param indentation   // The current indentation of the json object
     * @param json          // The corresponding json object
     */
    static jsonObject(obj, key, indentation, json) {
        return `${json}${JsonService.prettifyJson(obj[key], indentation)}${JsonService.comma(obj, key)}\n`;
    }
    static astPropertyNames(obj) {
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
            }
        }
        return obj;
    }
}
exports.JsonService = JsonService;
