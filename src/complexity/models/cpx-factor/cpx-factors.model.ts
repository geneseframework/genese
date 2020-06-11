import { FactorCategory } from '../../enums/factor-category.enum';
import { addObjects, capitalize } from '../../services/tools.service';
import { Addition } from '../../interfaces/addition.interface';
import { AggregationCpx } from './aggregation-cpx.model';
import { NestingCpx } from './nesting-cpx.model';
import { BasicCpx } from './basic-cpx.model';
import { StructuralCpx } from './structural-cpx.model';
import { DepthCpx } from './depth-cpx.model';
import { ContextCpx } from './context-cpx.model';
import { RecursionCpx } from './recursion-cpx.model';

export class CpxFactors implements Addition<CpxFactors>{

    aggregation?: AggregationCpx = new AggregationCpx();
    basic?: BasicCpx = new BasicCpx();
    context?: ContextCpx = new ContextCpx();
    depth?: DepthCpx = new DepthCpx();
    nesting?: NestingCpx = new NestingCpx();
    recursion?: RecursionCpx = new RecursionCpx();
    structural?: StructuralCpx = new StructuralCpx();


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


    get totalDepth(): number {
        return this.totalByFactorCategory(FactorCategory.DEPTH)
    }


    get totalNesting(): number {
        return this.totalByFactorCategory(FactorCategory.NESTING)
    }


    get totalRecursion(): number {
        return this.totalByFactorCategory(FactorCategory.RECURSION)
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

}
