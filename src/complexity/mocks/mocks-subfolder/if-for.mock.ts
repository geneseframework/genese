class IfForMock {

    constructor() {
    }



    ifAlone(data) {
        if (data === 'a') {
            data = 'b';
        }
    }


    ifElse(data) {
        if (data === 'a') {
            data = 'b';
        } else {
            data = 'c';
        }
    }


    ifNestedIf(data) {
        if (data === 'a') {
            data = 'b';
            if (data === 'v') {
                data = 'c';
            }
        }
    }


    ifElseIfInside(data) {
        if (data === 'a') {
            data = 'b';
        } else {
            if (data === 'v') {
                data = 'c';
            }
        }
    }


    ifIfElseInside(data) {
        if (data === 'a') {
            data = 'b';
            if (data === 'v') {
                data = 'c';
            } else {
                data = 'f';
            }
        }
    }


    ifAnd(a, b) {
        if (a && b) {
            console.log(a);
        }
    }


    ifOr(a, b) {
        if (a || b) {
            console.log(a);
        }
    }


    ifAndAnd(a, b, c) {
        if (a && b && c) {
            console.log(a);
        }
    }


    ifAndOr(a, b, c) {
        if (a && b || c) {
            console.log(a);
        }
    }


    ifAndAndOrAnd(a, b, c, d, e, f) {
        if (a && b && c || d && e && f) {
            console.log(a);
        }
    }


    ifAndAndOrAndAndOrOr(a, b, c, d, e, f) {
        if (a && b && c || d && e && f || a || b) {
            console.log(a);
        }
    }


    ifIfIf(data: number) {
        if (data > 2) {
            if (data > 3) {
                if (data > 4) {
                    console.log('data > 4');
                }
            }
        }
    }


    ifIfIfElse(data: number) {
        if (data > 2) {
            if (data > 3) {
                if (data > 4) {
                    console.log('data > 4');
                } else {
                    console.log('data <= 4');
                }
            }
        }
    }


    forMethod(data) {
        for (const elt of data) {
            console.log(elt);
        }
    }


    forEachMethod(data) {
        data.forEach(e => {
            console.log(e);
        })
    }


    forForFor(max: number) {
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
