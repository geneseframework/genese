/**
 * Elements which can be evaluated
 */
import { CognitiveCpx } from './cognitive-cpx.model';

export abstract class Evaluable {

    cognitiveValue ?= 0;         // The cognitive value of the element
    cognitiveCpx?: CognitiveCpx = new CognitiveCpx();
    cyclomaticCpx ?= 0;        // The cyclomatic value of the element

    public abstract evaluate(): void;
}
