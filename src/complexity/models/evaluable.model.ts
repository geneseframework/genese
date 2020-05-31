/**
 * Elements which can be evaluated
 */
import { CpxFactors } from './cpx-factors.model';

export abstract class Evaluable {

    cognitiveValue ?= 0;                                                                             // The cognitive value of the element
    cpxFactors?: CpxFactors = new CpxFactors();   // The cognitive complexity spread by kind of increment (breakFlow, nesting)
    cyclomaticCpx ?= 0;                                                                              // The cyclomatic value of the element

    public abstract evaluate(): void;   // The evaluation method
}
