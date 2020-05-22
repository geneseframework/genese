export class CognitiveCpx {

    breakFlow ?= 0;
    nesting ?= 0;

    get total(): number {
        return this.breakFlow + this.nesting;
    }
}
