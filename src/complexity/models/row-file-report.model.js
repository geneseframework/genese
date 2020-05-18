"use strict";
exports.__esModule = true;
/**
 * Defines the model of a row in the arrays of files reports
 */
var RowFileReport = /** @class */ (function () {
    function RowFileReport() {
        this.cognitiveColor = 'correct';
        this.cognitiveValue = 0;
        this.cyclomaticColor = 'correct';
        this.cyclomaticValue = 0;
        this.filename = '';
        this.linkFile = '';
        this.methodName = '';
    }
    return RowFileReport;
}());
exports.RowFileReport = RowFileReport;
