"use strict";
exports.__esModule = true;
var CallbacksMock = /** @class */ (function () {
    function CallbacksMock() {
    }
    CallbacksMock.prototype.caller = function (a) {
        this.methodWithCallback(a, function (b) {
            if (a < 2) {
                console.log(b);
            }
        });
        return { cyclomaticValue: 3, cognitiveValue: 3 };
    };
    CallbacksMock.prototype.callerFunction = function (a) {
        this.methodWithCallback(a, function (b) {
            if (b < 6) {
                console.log('b', b);
            }
        });
        return { cyclomaticValue: 3, cognitiveValue: 3 };
    };
    CallbacksMock.prototype.methodWithCallback = function (a, callback) {
        callback(a + 3);
        return { cyclomaticValue: 0, cognitiveValue: 0 };
    };
    return CallbacksMock;
}());
exports.CallbacksMock = CallbacksMock;
