import { CpxFactors } from '../models/cpx-factor/cpx-factors.model';

export interface Evaluate {

    cpxFactors: CpxFactors;
    cyclomaticCpx: number;
    evaluate:() => void;

}
