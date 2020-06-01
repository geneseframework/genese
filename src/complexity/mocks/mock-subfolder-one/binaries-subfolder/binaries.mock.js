"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BinariesMock {
    binary(a, b) {
        if (a && b) {
            console.log('b');
        }
    }
    differentLogicDoor(a, b, c) {
        if (a && b || c) {
            console.log('b');
        }
    }
    differentLogicDoorWithBrackets(a, b, c) {
        if ((a && b) || c) {
            console.log('b');
        }
    }
    orBetweenTwoBinaries(a, b, c, d) {
        if ((a && b) || (c && d)) {
            console.log('b');
        }
    }
    differentLogicDoorBetweenBinaries(a, b, c, d) {
        if ((a && b) || (c && d) && a) {
            console.log('b');
        }
    }
    forIfAndAndOrAndAndOrOr(a, b, c, d, e, f) {
        for (let i = 0; i < 10; i++) {
            if (b && c || d && f || a) {
                console.log(a);
            }
        }
        return { cyclomaticValue: 7, cpxIndex: 5 };
    }
    forForIfAndAndOrAndAndOrOr(a, b, c, d, e, f) {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (b && c || d && f || a) {
                    console.log(a);
                }
            }
        }
        if (a > b) {
            console.log(b);
        }
        return { cyclomaticValue: 9, cpxIndex: 11 };
    }
    ternary(a) {
        const result = a > 10 ? 5 : 3;
        return { cyclomaticValue: 2, cpxIndex: 0 };
    }
    ternaries(a) {
        const result = a > 10 ? 5 : ((a < 5) ? 3 : 2);
        return { cyclomaticValue: 2, cpxIndex: 0 };
    }
}
exports.BinariesMock = BinariesMock;
