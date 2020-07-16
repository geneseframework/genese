"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMock = void 0;
const _ = require("lodash");
class DebugMock {
    method(a) {
        const b = [1, 2];
        const c = _.tail(b);
        console.log('C = ', c.toString());
        const d = b.reduce(() => {
            return;
        }, undefined);
        return a.slice(0);
    }
}
exports.DebugMock = DebugMock;
