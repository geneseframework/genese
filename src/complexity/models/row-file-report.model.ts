/**
 * Defines the model of a row in the arrays of files reports
 */
export class RowFileReport {

    cognitiveColor ?= 'correct';
    cognitiveValue ?= 0;
    cyclomaticColor ?= 'correct';
    cyclomaticValue ?= 0;
    filename ?= '';
    linkFile ?= '';
    methodName ?= '';

}
