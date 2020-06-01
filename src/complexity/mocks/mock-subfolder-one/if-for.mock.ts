import { EvaluationValuesInterface } from '../../interfaces/evaluation-values.interface';

class IfForMock {

    constructor() {
    }



    ifAlone(data): EvaluationValuesInterface {
        if (data === 'a') {
            data = 'b';
        }
        return {cyclomaticValue: 2, cpxIndex: 1};
    }


    ifElse(data): EvaluationValuesInterface {
        if (data === 'a') {
            data = 'b';
        } else {
            data = 'c';
        }
        return {cyclomaticValue: 2, cpxIndex: 2};
    }


    ifIf(data): EvaluationValuesInterface {
        if (data === 'a') {
            data = 'b';
            if (data === 'v') {
                data = 'c';
            }
        }
        return {cyclomaticValue: 2, cpxIndex: 3};
    }


    ifElseIfInside(data): EvaluationValuesInterface {
        if (data === 'a') {
            data = 'b';
        } else {
            if (data === 'v') {
                data = 'c';
            }
        }
        return {cyclomaticValue: 2, cpxIndex: 1};
    }


    ifIfElseInside(data): EvaluationValuesInterface {
        if (data === 'a') {
            data = 'b';
            if (data === 'v') {
                data = 'c';
            } else {
                data = 'f';
            }
        }
        return {cyclomaticValue: 2, cpxIndex: 4};
    }


    ifAnd(a, b): EvaluationValuesInterface {
        if (a && b) {
            console.log(a);
        }
        return {cyclomaticValue: 3, cpxIndex: 2};
    }


    ifOr(a, b): EvaluationValuesInterface {
        if (a || b) {
            console.log(a);
        }
        return {cyclomaticValue: 3, cpxIndex: 2};
    }


    ifAndAnd(a, b, c): EvaluationValuesInterface {
        if (a && b && c) {
            console.log(a);
        }
        return {cyclomaticValue: 4, cpxIndex: 2};
    }


    ifAndOr(a, b, c): EvaluationValuesInterface {
        if (a && b || c) {
            console.log(a);
        }
        return {cyclomaticValue: 4, cpxIndex: 3};
    }


    ifAndAndOrAnd(a, b, c, d, e, f): EvaluationValuesInterface {
        if (a && b && c || d && e && f) {
            console.log(a);
        }
        return {cyclomaticValue: 7, cpxIndex: 4};
    }


    ifAndAndOrAndAndOrOr(a, b, c, d, e, f): EvaluationValuesInterface {
        if (a && b && c || d && e && f || a || b) {
            console.log(a);
        }
        return {cyclomaticValue: 9, cpxIndex: 5};
    }


    ifIfIf(data: number): EvaluationValuesInterface {
        if (data > 2) {
            if (data > 3) {
                if (data > 4) {
                    console.log('data > 4');
                }
            }
        }
        return {cyclomaticValue: 4, cpxIndex: 6};
    }


    ifIfIfElse(data: number): EvaluationValuesInterface {
        if (data > 2) {
            if (data > 3) {
                if (data > 4) {
                    console.log('data > 4');
                } else {
                    console.log('data <= 4');
                }
            }
        }
        return {cyclomaticValue: 4, cpxIndex: 6};
    }


    forMethod(data): EvaluationValuesInterface {
        for (const elt of data) {
            console.log(elt);
        }
        return {cyclomaticValue: 1, cpxIndex: 1};
    }


    forEachMethod(data): EvaluationValuesInterface {
        data.forEach(e => {
            console.log(e);
        })
        return {cyclomaticValue: 1, cpxIndex: 1};
    }


    forForFor(max: number): EvaluationValuesInterface {
        let total = 0;
        for (let i = 1; i < max; ++i) {
            for (let j = 2; j < i; ++j) {
                for (let k = 2; k < 10; ++k) {
                    console.log(`k = ${k}`);
                }
            }
            total += i;
        }
        return {cyclomaticValue: 4, cpxIndex: 6};
    }

}
