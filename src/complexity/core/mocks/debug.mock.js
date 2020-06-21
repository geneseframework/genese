"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMock = void 0;
class DebugMock {
    ifNestedIf(a, b) {
        if (a) {
            if (b) {
                return 'c';
            }
            return 'b';
        }
    }
}
exports.DebugMock = DebugMock;
