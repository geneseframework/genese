"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMock = void 0;
const _ = require("lodash");
const callbacks_mock_1 = require("./mocks-subfolder/callbacks.mock");
class DebugMock {
    method(a) {
        const b = [1, 2];
        const c = _.tail(b);
        console.log('C = ', c);
        return a.slice(0);
    }
    hyperComplex(object, path = '', value) {
        path = path.toString().match(/[^.[\]]+/g);
        path.slice(0, -1)
            .reduce((acc, curr, index) => {
            const arg = Math.round(index) % 3;
            return Object(acc[curr]) === acc[curr + arg][0];
        }, object)[path[path.length - 1]] = value;
        return new callbacks_mock_1.CallbacksMock(object);
    }
}
exports.DebugMock = DebugMock;
