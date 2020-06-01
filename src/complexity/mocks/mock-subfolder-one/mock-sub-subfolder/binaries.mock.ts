import { EvaluationValuesInterface } from '../../../interfaces/evaluation-values.interface';

export class BinariesMock {

    forIfAndAndOrAndAndOrOr(a, b, c, d, e, f): EvaluationValuesInterface {
        for (let i = 0; i < 10; i++) {
            if (b && c || d && f || a) {
                console.log(a);
            }
        }
        return {cyclomaticValue: 7, cpxIndex: 5};
    }


    forForIfAndAndOrAndAndOrOr(a, b, c, d, e, f): EvaluationValuesInterface {
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
        return {cyclomaticValue: 9, cpxIndex: 11};
    }


    ternary(a): EvaluationValuesInterface {
        const result = a > 10 ? 5 : 3;
        return {cyclomaticValue: 2, cpxIndex: 0};
    }

    ternaries(a): EvaluationValuesInterface {
        const result = a > 10 ? 5 : ((a <5) ? 3 : 2);
        return {cyclomaticValue: 2, cpxIndex: 0};
    }
}
