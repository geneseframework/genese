import { ComplexitiesByStatus } from '../interfaces/complexities-by-status.interface';

export class RowFolderReport {

    complexitiesByStatus?: ComplexitiesByStatus;
    numberOfFiles ?= 0;
    numberOfMethods ?= 0;
    path ?= '';
    routeFromCurrentFolder ?= '';

}
