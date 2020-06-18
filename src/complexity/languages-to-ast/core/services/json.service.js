"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonService = void 0;
const tools_service_1 = require("../../../core/services/tools.service");
class JsonService {
    static prettifyJson(obj, indent = '') {
        const indentation = `${indent}\t`;
        let json = `{\n`;
        obj = JsonService.deleteUndefinedProperties(obj);
        json = JsonService.addProperties(obj, indentation, json);
        json = `${json}${indentation.slice(0, -1)}}`;
        return json;
    }
    static addProperties(obj, indentation, json) {
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
                        : `${json}${JsonService.prettifyJson(obj[key], indentation)}`;
                    break;
            }
        }
        return json;
    }
    static deleteUndefinedProperties(obj) {
        for (const key of Object.keys(obj)) {
            if (obj[key] === undefined) {
                delete obj[key];
            }
        }
        return obj;
    }
    static comma(key, obj) {
        return tools_service_1.isLastKey(key, obj) ? '' : ',';
    }
    static jsonArray(obj, key, indentation, json) {
        json = `${json}[\n`;
        for (let i = 0; i < obj[key].length; i++) {
            json = `${json}${indentation}\t${JsonService.prettifyJson(obj[key][i], `${indentation}\t`)}`;
            json = tools_service_1.isLastIndex(i, obj[key]) ? `${json}\n` : `${json},\n`;
        }
        return `${json}${indentation}]${JsonService.comma(key, obj)}\n`;
    }
}
exports.JsonService = JsonService;
