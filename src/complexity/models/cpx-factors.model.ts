import { FactorCategory } from '../enums/factor-category.enum';
import { capitalize } from '../services/tools.service';

export class CpxFactors {

    aggregation?: {
        arr?: number,                               // Array of arrays
        density?: number,                           // Accumulation of nodes on a same line of code
        logicDoorChange?: number,                   // a "or" after a "and" (or a "or" after a "and") without brackets
        logicDoorChangeWithBrackets?: number        // a "or" after a "and" (or a "or" after a "and") without brackets
    };
    basic?: {
        declaration?: number,                       // Declaration of a Class, a Function, a Method, ...
        imp?: number,                               // Element imported from another file
        node?: number,                              // Any AST node ("Identifier", "Parameter", "Block", IfStatement, ...)
    };
    nesting?: {
        arr?: number,                               // Inside an array
        conditional?: number,                       // Inside a conditional
        loop?: number                               // Inside a loop
    };
    structural?: {
        arr?: number,                               // "Array", "Set"
        asynchronicity?: number,                    // "Promise", "Observable"
        conditional?: number,                       // "if", "else", "else if", "switch", "catch", ternary expression, nullish coalescing
        externalBinding?: number,                   // A "this" inside a method which not refers to the method context (its class)
        func?: number,                              // Usage of a function or method inside a block of code
        jump?: number,                              // "break", "continue"
        logicDoor?: number,                         // "and", "or", "not"
        loop?: number,                              // "for", "foreach", "while"
        recursion?: number                          // Recursion or callback
    };

    get total(): number {
        let total = 0;
        for (const key of Object.keys(this)) {
            total += this[`total${capitalize(key)}`] ?? 0;
        }
        return total;
    }

    get totalAggregation(): number {
        return this.totalByFactorCategory(FactorCategory.AGGREGATION)
    }

    get totalBasic(): number {
        return this.totalByFactorCategory(FactorCategory.BASIC)
    }

    get totalNesting(): number {
        return this.totalByFactorCategory(FactorCategory.NESTING)
    }

    get totalStructural(): number {
        return this.totalByFactorCategory(FactorCategory.STRUCTURAL)
    }

    private totalByFactorCategory(key: FactorCategory): number {
        let total = 0;
        for (const keyFeature of Object.keys(this[key])) {
            total += this[key][keyFeature] ?? 0;
        }
        return total;
    }
}
