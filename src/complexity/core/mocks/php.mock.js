"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhpMock = void 0;
class PhpMock {
    ifMethod(a) {
        if (a > 0) {
            return 'a';
        }
        return 'none';
    }
    recursion(a) {
        if (0 <= a) {
            return 0;
        }
        return this.recursion(a - 10);
    }
    methodWithCallback(a, callback) {
        return callback(a);
    }
}
exports.PhpMock = PhpMock;
