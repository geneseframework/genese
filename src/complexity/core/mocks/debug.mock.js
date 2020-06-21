"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMock = void 0;
class DebugMock {
    orBetweenTwoBinaries(a, b, c, d) {
        if (a && b || c) {
            console.log('b');
        }
    }
}
exports.DebugMock = DebugMock;
