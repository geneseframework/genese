"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchesMock = void 0;
class SwitchesMock {
    switches(numberOfWords) {
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
    }
    tryCatch() {
        try {
            console.log('Success');
        }
        catch (e) {
            console.log(e);
        }
    }
    questionDotToken(time) {
        time = time === null || time === void 0 ? void 0 : time.name;
    }
}
exports.SwitchesMock = SwitchesMock;
