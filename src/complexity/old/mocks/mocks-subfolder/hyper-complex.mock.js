"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperComplexMock = void 0;
const callbacks_mock_1 = require("./callbacks.mock");
class HyperComplexMock {
    hyperComplex(object, path = '', value) {
        path = path.toString().match(/[^.[\]]+/g);
        path.slice(0, -1).reduce((acc, curr, index) => {
            const arg = Math.round(index) % 3;
            acc(0);
            return Object(acc[curr]) === acc[curr + arg][0];
        }, object)[path[path.length - 1]] = value;
        return new callbacks_mock_1.CallbacksMock(object);
    }
    ifIf(data) {
        if (data === 'a') {
            data = 'b';
            if (data === 'v') {
                data = 'c';
            }
        }
    }
    reducer(acc, curr, index, path) {
        return Object(acc[curr]) === acc[curr] ? acc[curr] : (acc[curr] = isNaN(+path[index + 1]) ? {} : []);
    }
}
exports.HyperComplexMock = HyperComplexMock;
