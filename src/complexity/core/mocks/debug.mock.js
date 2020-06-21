"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMock = void 0;
class DebugMock {
    methodWithCallback(a, callback) {
        callback(3);
    }
}
exports.DebugMock = DebugMock;
