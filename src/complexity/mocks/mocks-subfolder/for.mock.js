"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ForMock {
    forMethod(a) {
        for (const elt of a) {
            console.log(elt);
        }
    }
    forEachMethod(a) {
        a.forEach(e => {
            console.log(e);
        });
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
    }
}
exports.ForMock = ForMock;
