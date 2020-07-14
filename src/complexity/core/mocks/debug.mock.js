"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMock = void 0;
class DebugMock {
    recursion(a) {
        return a.slice(0);
    }
}
exports.DebugMock = DebugMock;
