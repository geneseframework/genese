"use strict";
exports.__esModule = true;
var DICTIONARY;
var AstMock = /** @class */ (function () {
    function AstMock() {
    }
    AstMock.prototype.ifElse = function (data) {
        if (data === 'a') {
            data = 'b';
        }
        else {
            data = 'c';
        }
        return { cyclomaticValue: 2, cognitiveValue: 2 };
    };
    return AstMock;
}());
exports.AstMock = AstMock;
