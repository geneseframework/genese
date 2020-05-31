/**
 * Elements which can be evaluated
 */
import { CpxByFactor } from './cognitive-cpx-by-increment-type.model';

export abstract class Evaluable {

    cognitiveValue ?= 0;                                                                             // The cognitive value of the element
    cognitiveCpxByIncrementType?: CpxByFactor = new CpxByFactor();   // The cognitive complexity spread by kind of increment (breakFlow, nesting)
    cyclomaticCpx ?= 0;                                                                              // The cyclomatic value of the element

    public abstract evaluate(): void;   // The evaluation method
}
