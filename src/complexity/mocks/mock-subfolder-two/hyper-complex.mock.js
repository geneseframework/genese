"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HyperComplexMock {
    hyperComplex(object, path = '', value) {
        if (!object) {
            return undefined;
        }
        if (!Array.isArray(path)) {
            path = path.toString().match(/[^.[\]]+/g) || [];
        }
        path.slice(0, -1).reduce((acc, curr, index) => {
            return Object(acc[curr]) === acc[curr] ? acc[curr] : (acc[curr] = isNaN(+path[index + 1]) ? {} : []);
        }, object)[path[path.length - 1]] = value; // Finally assign the value to the last key
        return object; // Return the top-level object to allow chaining
    }
}
exports.HyperComplexMock = HyperComplexMock;
