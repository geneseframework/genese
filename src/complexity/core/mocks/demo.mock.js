"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMock = void 0;
const callbacks_mock_1 = require("./mocks-subfolder/callbacks.mock");
class DebugMock {
    ifAlone(a) {
        if (a) {
            return 'b';
        }
    }
    twoIfs(a, b) {
        if (a) {
            return 'b';
        }
        if (b) {
            return 'c';
        }
    }
    ifNestedIf(a, b) {
        if (a) {
            if (b) {
                return 'c';
            }
            return 'b';
        }
    }
    ifIfIf(a, b, c) {
        if (a) {
            if (b) {
                if (c) {
                    return 'd';
                }
                return 'c';
            }
            return 'b';
        }
    }
    switchCase(a) {
        switch (a) {
            case 1:
                return 'one';
            case 2:
                return 'two';
            case 3:
                return 'three';
            default:
                return 'other';
        }
    }
    recursion(a) {
        this.recursion(a);
    }
    methodWithCallback(a, callback) {
        callback(a);
    }
    hyperComplex(object, path = '', value) {
        path = path.toString().match(/[^.[\]]+/g);
        path.slice(0, -1).reduce((acc, curr, index) => {
            const arg = Math.round(index) % 3;
            return Object(acc[curr]) === acc[curr + arg][0];
        }, object)[path[path.length - 1]] = value;
        return new callbacks_mock_1.CallbacksMock(object);
    }
}
exports.DebugMock = DebugMock;
