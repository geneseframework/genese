import { ComplexitiesByStatus } from '../interfaces/complexities-by-status.interface';

/**
* Defines the model of a row in the arrays of folders reports
*/
export class RowFolderReport {

    complexitiesByStatus?: ComplexitiesByStatus;
    numberOfFiles ?= 0;
    numberOfMethods ?= 0;
    path ?= '';
    routeFromCurrentFolder ?= '';

}
