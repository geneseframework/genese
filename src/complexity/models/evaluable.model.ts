/**
 * Elements which can be evaluated
 */
import { CpxFactors } from './cpx-factor/cpx-factors.model';

export abstract class Evaluable {

    cpxFactors?: CpxFactors;   // The cognitive complexity spread by kind of increment (breakFlow, nesting)
    cyclomaticCpx ?= 0;                                                                              // The cyclomatic value of the element

    public abstract evaluate(): void;   // The evaluation method
}
