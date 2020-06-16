"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregationCpx = void 0;
/**
 * The Complexity Category "Aggregation"
 */
class AggregationCpx {
    constructor() {
        this.arr = 0; // Array of arrays
        this.density = 0; // Accumulation of nodes on a same line of code
        this.differentLogicDoor = 0; // a "or" after a "and" (or a "or" after a "and") without brackets
        this.regex = 0; // each element in a regex
    }
}
exports.AggregationCpx = AggregationCpx;
