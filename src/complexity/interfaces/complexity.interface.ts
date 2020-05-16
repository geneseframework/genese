import { ComplexityType } from '../enums/complexity-type.enum';

export interface Complexity {

    errorThreshold: number;
    type: ComplexityType;
    warningThreshold: number;

}
