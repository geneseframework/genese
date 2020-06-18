"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonService = void 0;
const tools_service_1 = require("../../../core/services/tools.service");
class JsonService {
    static prettifyJson(obj, indent = '') {
        const indentation = `${indent}\t`;
        let json = `{\n`;
        obj = JsonService.deleteUndefinedProperties(obj);
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
                        // let index = 0;
                        // for (const element of obj[key]) {
                        for (let i = 0; i < obj[key].length; i++) {
                            // index++;
                            json = `${json}${indentation}\t${JsonService.prettifyJson(obj[key][i], `${indentation}\t`)}`;
                            json = tools_service_1.isLastIndex(i, obj[key]) ? `${json}\n` : `${json},\n`;
                        }
                        json = `${json}${indentation}]`;
                        json = (key === Object.keys(obj).slice(-1)[0]) ? `${json}\n` : `${json},\n`;
                    }
                    else {
                        json = `${json}${JsonService.prettifyJson(obj[key], indentation)}`;
                        break;
                    }
                    break;
            }
        }
        json = `${json}${indentation.slice(0, -1)}}`;
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
}
exports.JsonService = JsonService;
