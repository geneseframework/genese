import { TsFolder } from '../models/ts-folder.model';
import { TsFile } from '../models/ts-file.model';
import { TsMethodService } from './ts-method.service';
import { Ast } from './ast.service';
import { TsMethod } from '../models/ts-method.model';
import { MethodStatus } from '../enums/evaluation-status.enum';
import { ComplexityType } from '../enums/complexity-type.enum';
import { StatsService } from './stats.service';
import { Stats } from '../models/stats.model';

export class TsFileService extends StatsService{

    protected _stats: Stats = undefined;
    tsFile: TsFile = undefined;

    constructor(tsFile: TsFile) {
        super();
        this.tsFile = tsFile;
    }

    static generateTree(path: string, tsFolder: TsFolder = new TsFolder()): TsFile {
        const tsFile: TsFile = new TsFile();
        tsFile.sourceFile = Ast.getSourceFile(path);
        // console.log('GENERATE F', tsFolder)
        tsFile.tsFolder = tsFolder;
        tsFile.setName();
        tsFile.tsMethods = TsMethodService.generateTree(tsFile);
        tsFile.evaluate();
        return tsFile;
    }


    calculateStats(tsFile: TsFile): void {
        this._stats.numberOfMethods = tsFile.tsMethods?.length ?? 0;
        for (const method of tsFile.tsMethods) {
            this.incrementStats(method);
        }
    }


    incrementStats(method: TsMethod): void {
        this.incrementMethodsByStatus(method, ComplexityType.COGNITIVE);
        this.incrementMethodsByStatus(method, ComplexityType.CYCLOMATIC);
        this._stats.barChartCognitive.addResult(method.cognitiveValue);
        this._stats.barChartCyclomatic.addResult(method.cyclomaticValue);
    }


    incrementMethodsByStatus(tsMethod: TsMethod, type: ComplexityType): void {
        const status = (type === ComplexityType.COGNITIVE) ? tsMethod.cognitiveStatus : tsMethod.cyclomaticStatus;
        switch (status) {
            case MethodStatus.CORRECT:
                this._stats.numberOfMethodsByStatus[type].correct ++;
                break;
            case MethodStatus.ERROR:
                this._stats.numberOfMethodsByStatus[type].error ++;
                break;
            case MethodStatus.WARNING:
                this._stats.numberOfMethodsByStatus[type].warning ++;
                break;
            default:
                break;
        }
    }


    getSubject(): void {
        this._stats.subject = this.tsFile.name;
    }

}
