"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMock = void 0;
class CallbacksMock {
    constructor(obj) {
    }
}
class DebugMock {
    hyperComplex(object, path = '', value) {
        path = path.toString().match(/[^.[\]]+/g);
        path.slice(0, -1).reduce((acc, curr, index) => {
            const arg = Math.round(index) % 3;
            return Object(acc[curr]) === acc[curr + arg][0];
        }, object)[path[path.length - 1]] = value;
        return new CallbacksMock(object);
    }
}
exports.DebugMock = DebugMock;
