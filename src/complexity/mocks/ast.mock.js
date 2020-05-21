"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let DICTIONARY;
class AstMock {
    ifElse(data) {
        if (data === 'a') {
            data = 'b';
        }
        else {
            data = 'c';
        }
        return { cyclomaticValue: 2, cognitiveValue: 2 };
    }
}
exports.AstMock = AstMock;
