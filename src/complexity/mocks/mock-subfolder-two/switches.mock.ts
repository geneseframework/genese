/*
 * @file utils.service.ts
 *
 * Copyright (c) Naval Group SA property, 2020[-2020], all rights reserved.
 *
 * Copyright (c) All rights reserved. Both the content and the form of this software are the property of Naval Group SA
 * and/or of third party. It is formally prohibited to use, copy, modify, translate, disclose or perform all or part of
 * this software without obtaining Naval Group SA’s prior written consent or authorization. Any such unauthorized use,
 * copying, modification, translation, disclosure or performance by any means whatsoever shall constitute
 * an infringement punishable by criminal or civil law and, more generally, a breach of Naval Group SA’s rights.
 */

import { EvaluationValuesInterface } from '../../interfaces/evaluation-values.interface';

export class SwitchesMock {


    switches(numberOfWords: number): EvaluationValuesInterface {
        switch (numberOfWords) {
            case 1:
                console.log("one");
                break;
            case 2:
                console.log("a couple");
                break;
            default:
                console.log("lots");
        }
        return {cyclomaticValue: 3, cognitiveValue: 1};
    }


    tryCatch(): EvaluationValuesInterface {
        try {
            const a = 1;
        } catch (e) {
            console.log(e);
        }
        return {cyclomaticValue: 2, cognitiveValue: 1};
    }


    recursion(a): EvaluationValuesInterface {
        if (a > 10) {
            this.recursion(a);
        }
        return {cyclomaticValue: 2, cognitiveValue: 2};
    }


    questionDotToken(time: any): EvaluationValuesInterface {
        time = time?.name;
        return {cyclomaticValue: 1, cognitiveValue: 0};
    }

}
