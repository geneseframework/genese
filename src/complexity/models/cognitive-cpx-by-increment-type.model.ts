/**
 * The cognitive complexity score spread by kinds of reasons to increase cognitive complexity
 */
export class CognitiveCpxByIncrementType {

    breakFlow ?= 0;     // The number of elements increasing the breakFlow (if, else, for, switch, catch, recursion, logic doors, ...)
    nesting ?= 0;       // The number of elements increasing the nesting (if, else, for, switch, catch, ...)

    /**
     * Cumulates the different kinds of cognitive complexity increments
     */
    get total(): number {
        return this.breakFlow + this.nesting;
    }
}
