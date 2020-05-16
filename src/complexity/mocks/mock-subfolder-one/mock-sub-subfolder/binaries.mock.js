"use strict";
exports.__esModule = true;
var BinariesMock = /** @class */ (function () {
    function BinariesMock() {
    }
    BinariesMock.prototype.forIfAndAndOrAndAndOrOr = function (a, b, c, d, e, f) {
        for (var i = 0; i < 10; i++) {
            if (b && c || d && f || a) {
                console.log(a);
            }
        }
        return { cyclomaticValue: 7, cognitiveValue: 5 };
    };
    BinariesMock.prototype.forForIfAndAndOrAndAndOrOr = function (a, b, c, d, e, f) {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                if (b && c || d && f || a) {
                    console.log(a);
                }
            }
        }
        if (a > b) {
            console.log(b);
        }
        return { cyclomaticValue: 9, cognitiveValue: 11 };
    };
    BinariesMock.prototype.ternary = function (a) {
        var result = a > 10 ? 5 : 3;
        return { cyclomaticValue: 2, cognitiveValue: 0 };
    };
    BinariesMock.prototype.ternaries = function (a) {
        var result = a > 10 ? 5 : ((a < 5) ? 3 : 2);
        return { cyclomaticValue: 2, cognitiveValue: 0 };
    };
    return BinariesMock;
}());
exports.BinariesMock = BinariesMock;
