"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodReport = void 0;
/**
 * Defines the elements included in a method's report
 */
class MethodReport {
    constructor() {
        this.code = ''; // The code of the method
        this.cognitiveColor = 'correct'; // The color of the method for cognitive complexity score
        this.cpxIndex = 0; // The cognitive complexity score
        this.cyclomaticColor = 'correct'; // The color of the method for cyclomatic complexity score
        this.cyclomaticValue = 0; // The cyclomatic complexity score
        this.methodName = ''; // The name of the method
    }
}
exports.MethodReport = MethodReport;
