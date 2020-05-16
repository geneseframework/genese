import { TsFile } from './ts-file.model';
import { TsFolderService } from '../services/ts-folder.service';
import { Stats } from './stats.model';
import { Evaluate } from '../interfaces/evaluate.interface';
import { ComplexitiesByStatus } from '../interfaces/complexities-by-status.interface';

export class TsFolder implements Evaluate {

    cognitiveValue ?= 0;
    complexitiesByStatus?: ComplexitiesByStatus = new ComplexitiesByStatus();
    cyclomaticValue ?= 0;
    numberOfFiles ?= 0;
    numberOfMethods ?= 0;
    parent?: TsFolder = undefined;
    path ?= '';
    relativePath ?= '';
    stats: Stats = undefined;
    subFolders?: TsFolder[] = [];
    tsFiles?: TsFile[] = [];
    tsFolderService?: TsFolderService = undefined;

    constructor() {
        this.tsFolderService = new TsFolderService(this);
    }


    getStats(): Stats {
        if (!this.stats) {
            this.stats = this.tsFolderService.getStats(this).plugChartHoles();
        }
        return this.stats;
    }


    evaluate(): void {
        for (const file of this.tsFiles) {
            this.cognitiveValue += file.cognitiveValue;
            this.cyclomaticValue += file.cyclomaticValue;
            this.numberOfMethods += file.tsMethods?.length ?? 0;
            this.numberOfFiles++;
            this.complexitiesByStatus = this.complexitiesByStatus.add(file.complexitiesByStatus);
        }
    }

}
