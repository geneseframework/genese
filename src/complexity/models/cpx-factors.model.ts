import { FactorCategory } from '../enums/factor-category.enum';
import { addObjects, capitalize } from '../services/tools.service';
import { Addition } from '../interfaces/addition.interface';

export class CpxFactors implements Addition<CpxFactors>{

    aggregation?: {
        arr?: number,                               // Array of arrays
        density?: number,                           // Accumulation of nodes on a same line of code
        logicDoorChange?: number,                   // a "or" after a "and" (or a "or" after a "and") without brackets
        logicDoorChangeWithBrackets?: number        // a "or" after a "and" (or a "or" after a "and") without brackets
    } = {
        arr: 0,
        density: 0,
        logicDoorChange: 0,
        logicDoorChangeWithBrackets: 0,
    };
    basic?: {
        declaration?: number,                       // Declaration of a Class, a Function, a Method, ...
        imp?: number,                               // Element imported from another file
        node?: number,                              // Any AST node ("Identifier", " ", "Block", IfStatement, ...)
    } = {
        declaration: 0,
        imp: 0,
        node: 0,
    };
    nesting?: {
        arr?: number,                               // Inside an array
        conditional?: number,                       // Inside a conditional
        func: number,                               // Usage of a function or method inside a block of code
        loop?: number                               // Inside a loop
    } = {
        arr: 0,
        func: 0,
        conditional: 0,
        loop: 0,
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
        recursion?: number,                         // Recursion or callback
        regex?: number                              // Regular expression

    } = {
        arr: 0,
        asynchronicity: 0,
        conditional: 0,
        externalBinding: 0,
        func: 0,
        jump: 0,
        logicDoor: 0,
        loop: 0,
        recursion: 0,
        regex: 0
    };

    get total(): number {
        let total = 0;
        for (const key of Object.keys(this)) {
            if (key !== 'nesting') {
                total += this[`total${capitalize(key)}`] ?? 0;
            }
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

    add(cpxFactors: CpxFactors): CpxFactors {
        return addObjects<CpxFactors>(this, cpxFactors, CpxFactors);
    }

    // add(cpxFactors: CpxFactors): CpxFactors {
    //     if (!cpxFactors) {
    //         return this;
    //     }
    //     const cpxFact: CpxFactors = new CpxFactors();
    //     // cpxFact.aggregation = cpxFactors.aggregation ? th
    //     console.log('cpxFactors', cpxFactors);
    //     console.log('THIS', this);
    //     for (const category in FactorCategory) {
    //         console.log('category', category)
    //         console.log('this[FactorCategory[category]]', this[FactorCategory[category]])
    //         for (const factor in Object.keys(this[FactorCategory[category]])) {
    //             cpxFact[category][factor] = cpxFactors[category][factor] ? this[category][factor] + cpxFactors[category][factor] : cpxFact[category][factor];
    //         }
    //     }
    //     return cpxFact;
    // }

}
