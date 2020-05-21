"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines the model of a row in the arrays of files reports
 */
class RowFileReport {
    constructor() {
        this.cognitiveColor = 'correct';
        this.cognitiveValue = 0;
        this.cyclomaticColor = 'correct';
        this.cyclomaticValue = 0;
        this.filename = '';
        this.linkFile = '';
        this.methodName = '';
    }
}
exports.RowFileReport = RowFileReport;
