"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines the elements included in a method's report
 */
class MethodReport {
    constructor() {
        this.code = '';
        this.cognitiveColor = 'correct';
        this.cognitiveValue = 0;
        this.cyclomaticColor = 'correct';
        this.cyclomaticValue = 0;
        this.methodName = '';
    }
}
exports.MethodReport = MethodReport;
