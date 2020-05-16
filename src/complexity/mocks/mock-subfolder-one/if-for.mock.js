"use strict";
exports.__esModule = true;
var IfForMock = /** @class */ (function () {
    function IfForMock() {
    }
    IfForMock.prototype.ifAlone = function (data) {
        if (data === 'a') {
            data = 'b';
        }
        return { cyclomaticValue: 2, cognitiveValue: 1 };
    };
    IfForMock.prototype.ifElse = function (data) {
        if (data === 'a') {
            data = 'b';
        }
        else {
            data = 'c';
        }
        return { cyclomaticValue: 2, cognitiveValue: 2 };
    };
    IfForMock.prototype.ifIf = function (data) {
        if (data === 'a') {
            data = 'b';
            if (data === 'v') {
                data = 'c';
            }
        }
        return { cyclomaticValue: 2, cognitiveValue: 3 };
    };
    IfForMock.prototype.ifElseIfInside = function (data) {
        if (data === 'a') {
            data = 'b';
        }
        else {
            if (data === 'v') {
                data = 'c';
            }
        }
        return { cyclomaticValue: 2, cognitiveValue: 1 };
    };
    IfForMock.prototype.ifIfElseInside = function (data) {
        if (data === 'a') {
            data = 'b';
            if (data === 'v') {
                data = 'c';
            }
            else {
                data = 'f';
            }
        }
        return { cyclomaticValue: 2, cognitiveValue: 4 };
    };
    IfForMock.prototype.ifAnd = function (a, b) {
        if (a && b) {
            console.log(a);
        }
        return { cyclomaticValue: 3, cognitiveValue: 2 };
    };
    IfForMock.prototype.ifOr = function (a, b) {
        if (a || b) {
            console.log(a);
        }
        return { cyclomaticValue: 3, cognitiveValue: 2 };
    };
    IfForMock.prototype.ifAndAnd = function (a, b, c) {
        if (a && b && c) {
            console.log(a);
        }
        return { cyclomaticValue: 4, cognitiveValue: 2 };
    };
    IfForMock.prototype.ifAndOr = function (a, b, c) {
        if (a && b || c) {
            console.log(a);
        }
        return { cyclomaticValue: 4, cognitiveValue: 3 };
    };
    IfForMock.prototype.ifAndAndOrAnd = function (a, b, c, d, e, f) {
        if (a && b && c || d && e && f) {
            console.log(a);
        }
        return { cyclomaticValue: 7, cognitiveValue: 4 };
    };
    IfForMock.prototype.ifAndAndOrAndAndOrOr = function (a, b, c, d, e, f) {
        if (a && b && c || d && e && f || a || b) {
            console.log(a);
        }
        return { cyclomaticValue: 9, cognitiveValue: 5 };
    };
    IfForMock.prototype.ifIfIf = function (data) {
        if (data > 2) {
            if (data > 3) {
                if (data > 4) {
                    console.log('data > 4');
                }
            }
        }
        return { cyclomaticValue: 4, cognitiveValue: 6 };
    };
    IfForMock.prototype.ifIfIfElse = function (data) {
        if (data > 2) {
            if (data > 3) {
                if (data > 4) {
                    console.log('data > 4');
                }
                else {
                    console.log('data <= 4');
                }
            }
        }
        return { cyclomaticValue: 4, cognitiveValue: 6 };
    };
    IfForMock.prototype.forMethod = function (data) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var elt = data_1[_i];
            console.log(elt);
        }
        return { cyclomaticValue: 1, cognitiveValue: 1 };
    };
    IfForMock.prototype.forEachMethod = function (data) {
        data.forEach(function (e) {
            console.log(e);
        });
        return { cyclomaticValue: 1, cognitiveValue: 1 };
    };
    IfForMock.prototype.forForFor = function (max) {
        var total = 0;
        for (var i = 1; i < max; ++i) {
            for (var j = 2; j < i; ++j) {
                for (var k = 2; k < 10; ++k) {
                    console.log("k = " + k);
                }
            }
            total += i;
        }
        return { cyclomaticValue: 4, cognitiveValue: 6 };
    };
    return IfForMock;
}());
