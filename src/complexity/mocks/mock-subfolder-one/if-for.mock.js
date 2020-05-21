"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IfForMock {
    constructor() {
    }
    ifAlone(data) {
        if (data === 'a') {
            data = 'b';
        }
        return { cyclomaticValue: 2, cognitiveValue: 1 };
    }
    ifElse(data) {
        if (data === 'a') {
            data = 'b';
        }
        else {
            data = 'c';
        }
        return { cyclomaticValue: 2, cognitiveValue: 2 };
    }
    ifIf(data) {
        if (data === 'a') {
            data = 'b';
            if (data === 'v') {
                data = 'c';
            }
        }
        return { cyclomaticValue: 2, cognitiveValue: 3 };
    }
    ifElseIfInside(data) {
        if (data === 'a') {
            data = 'b';
        }
        else {
            if (data === 'v') {
                data = 'c';
            }
        }
        return { cyclomaticValue: 2, cognitiveValue: 1 };
    }
    ifIfElseInside(data) {
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
    }
    ifAnd(a, b) {
        if (a && b) {
            console.log(a);
        }
        return { cyclomaticValue: 3, cognitiveValue: 2 };
    }
    ifOr(a, b) {
        if (a || b) {
            console.log(a);
        }
        return { cyclomaticValue: 3, cognitiveValue: 2 };
    }
    ifAndAnd(a, b, c) {
        if (a && b && c) {
            console.log(a);
        }
        return { cyclomaticValue: 4, cognitiveValue: 2 };
    }
    ifAndOr(a, b, c) {
        if (a && b || c) {
            console.log(a);
        }
        return { cyclomaticValue: 4, cognitiveValue: 3 };
    }
    ifAndAndOrAnd(a, b, c, d, e, f) {
        if (a && b && c || d && e && f) {
            console.log(a);
        }
        return { cyclomaticValue: 7, cognitiveValue: 4 };
    }
    ifAndAndOrAndAndOrOr(a, b, c, d, e, f) {
        if (a && b && c || d && e && f || a || b) {
            console.log(a);
        }
        return { cyclomaticValue: 9, cognitiveValue: 5 };
    }
    ifIfIf(data) {
        if (data > 2) {
            if (data > 3) {
                if (data > 4) {
                    console.log('data > 4');
                }
            }
        }
        return { cyclomaticValue: 4, cognitiveValue: 6 };
    }
    ifIfIfElse(data) {
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
    }
    forMethod(data) {
        for (const elt of data) {
            console.log(elt);
        }
        return { cyclomaticValue: 1, cognitiveValue: 1 };
    }
    forEachMethod(data) {
        data.forEach(e => {
            console.log(e);
        });
        return { cyclomaticValue: 1, cognitiveValue: 1 };
    }
    forForFor(max) {
        let total = 0;
        for (let i = 1; i < max; ++i) {
            for (let j = 2; j < i; ++j) {
                for (let k = 2; k < 10; ++k) {
                    console.log(`k = ${k}`);
                }
            }
            total += i;
        }
        return { cyclomaticValue: 4, cognitiveValue: 6 };
    }
}
