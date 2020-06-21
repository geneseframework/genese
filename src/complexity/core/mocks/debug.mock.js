"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMock = void 0;
class DebugMock {
    methodWithCallback(a) {
        const z = [];
        return z[a[0]];
    }
}
exports.DebugMock = DebugMock;
