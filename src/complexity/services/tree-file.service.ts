import { TreeFolder } from '../models/tree-folder.model';
import { TreeFile } from '../models/tree-file.model';
import { TsMethodService } from './ts-method.service';
import { Ast } from './ast.service';
import { TreeMethod } from '../models/tree-method.model';
import { MethodStatus } from '../enums/evaluation-status.enum';
import { ComplexityType } from '../enums/complexity-type.enum';
import { StatsService } from './stats.service';
import { Stats } from '../models/stats.model';

export class TreeFileService extends StatsService{

    protected _stats: Stats = undefined;
    tsFile: TreeFile = undefined;

    constructor(tsFile: TreeFile) {
        super();
        this.tsFile = tsFile;
    }

    static generateTree(path: string, tsFolder: TreeFolder = new TreeFolder()): TreeFile {
        const tsFile: TreeFile = new TreeFile();
        tsFile.sourceFile = Ast.getSourceFile(path);
        tsFile.treeFolder = tsFolder;
        tsFile.name = tsFile.sourceFile?.fileName;
        tsFile.treeMethods = TsMethodService.generateTree(tsFile);
        tsFile.evaluate();
        return tsFile;
    }


    calculateStats(tsFile: TreeFile): void {
        this._stats.numberOfMethods = tsFile.treeMethods?.length ?? 0;
        for (const method of tsFile.treeMethods) {
            this.incrementStats(method);
        }
    }


    incrementStats(method: TreeMethod): void {
        this.incrementMethodsByStatus(method, ComplexityType.COGNITIVE);
        this.incrementMethodsByStatus(method, ComplexityType.CYCLOMATIC);
        this._stats.barChartCognitive.addResult(method.cognitiveValue);
        this._stats.barChartCyclomatic.addResult(method.cyclomaticValue);
    }


    incrementMethodsByStatus(treeMethod: TreeMethod, type: ComplexityType): void {
        const status = (type === ComplexityType.COGNITIVE) ? treeMethod.cognitiveStatus : treeMethod.cyclomaticStatus;
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
