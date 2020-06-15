"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFileReport = void 0;
/**
 * Defines the model of a row in the arrays of files reports
 */
class RowFileReport {
    constructor() {
        this.cognitiveColor = 'correct'; // The color associated to the cognitive complexity score of the method analysed in the row
        this.cpxIndex = 0; // The complexity index of the method analysed in the row
        this.cyclomaticColor = 'correct'; // The color associated to the cyclomatic complexity score of the method analysed in the row
        this.cyclomaticValue = 0; // The cyclomatic complexity score of the method analysed in the row
        this.filename = ''; // The name of the file
        this.linkFile = ''; // The relative link to the file report
        this.methodName = ''; // The name of the method analysed in the row
    }
}
exports.RowFileReport = RowFileReport;
