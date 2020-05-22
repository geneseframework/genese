import { CognitiveCpx } from './cognitive-cpx.model';

export class CodeLine {

    breakFlow ?= 0;
    breakFlowIncrement ?= 0;
    cognitiveCpx?: CognitiveCpx = new CognitiveCpx();
    impactsCognitiveCpx ?= false;
    issue ?= 0;
    nesting ?= 0;
    nestingIncrement ?= 0;
    position ?= 0;
    text ?= '';

}
