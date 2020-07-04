"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMock = void 0;
class DebugMock {
    recursion(a) {
        this.recursion(a);
    }
}
exports.DebugMock = DebugMock;
