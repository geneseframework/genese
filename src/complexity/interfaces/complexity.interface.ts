import { ComplexityType } from '../enums/complexity-type.enum';

/**
 * Complexity interface
 */
export interface Complexity {

    errorThreshold: number;
    type: ComplexityType;
    warningThreshold: number;

}
