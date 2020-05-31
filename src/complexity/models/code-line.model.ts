import { CpxByFactor } from './cognitive-cpx-by-increment-type.model';

/**
 * A line of a Code object
 */
export class CodeLine {

    breakFlow ?= 0;                                         // The number of breakflows on this line
    cpxByFactor?: CpxByFactor = new CpxByFactor();          // The cognitive complexity relative to this line (breakFlows, increments,...)
    impactsCognitiveCpx ?= false;                           // True if this line increases the cognitive complexity, false if not
    issue ?= 0;                                             // The number of the line in its Code context (method)
    nesting ?= 0;                                           // The number of elements increasing nesting on this line
    position ?= 0;                                          // The position (in number of characters) of the start of the line
    text ?= '';                                             // The text of the line

}
