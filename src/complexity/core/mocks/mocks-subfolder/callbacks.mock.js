"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbacksMock = void 0;
// @ts-ignore
class CallbacksMock {
    constructor(object) {
        console.log(object);
    }
    recursion(a) {
        this.recursion(a);
    }
    methodWithCallback(a, callback) {
        return callback(a);
    }
    caller(a) {
        this.methodWithCallback(a, (b) => {
            if (a < 2) {
                console.log(b);
            }
        });
    }
    callerFunction(a) {
        this.methodWithCallback(a, function (b) {
            if (b < 6) {
                console.log('b', b);
            }
        });
    }
}
exports.CallbacksMock = CallbacksMock;
