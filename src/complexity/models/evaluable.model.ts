/**
 * Elements which can be evaluated
 */
export abstract class Evaluable {

    cognitiveValue ?= 0;         // The cognitive value of the element
    cyclomaticValue ?= 0;        // The cyclomatic value of the element

    public abstract evaluate(): void;
}
