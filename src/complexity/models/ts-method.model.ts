import * as ts from 'typescript';
import { TsFile } from './ts-file.model';
import { Ast } from '../services/ast.service';
import { ComplexityService as CS } from '../services/complexity.service';
import { TsTree } from './ts-tree.model';
import { Options } from './options';
import { MethodStatus } from '../enums/evaluation-status.enum';
import { ComplexityType } from '../enums/complexity-type.enum';
import { Evaluate } from '../interfaces/evaluate.interface';

export class TsMethod implements Evaluate {

    cognitiveStatus: MethodStatus = MethodStatus.CORRECT;
    cognitiveValue ?= 0;
    cyclomaticStatus: MethodStatus = MethodStatus.CORRECT;
    cyclomaticValue ?= 0;
    filename ?= '';
    name ?= '';
    node: ts.Node = undefined;
    tsFile?: TsFile = new TsFile();
    tsTree?: TsTree = undefined;

    constructor(node: ts.Node) {
        this.node = node;
        this.name = Ast.getMethodName(node);
    }


    evaluate(): void {
        this.cognitiveValue = CS.calculateCognitiveComplexity(this.tsTree);
        this.cognitiveStatus = this.getComplexityStatus(ComplexityType.COGNITIVE);
        this.cyclomaticValue = CS.calculateCyclomaticComplexity(this.node);
        this.cyclomaticStatus = this.getComplexityStatus(ComplexityType.CYCLOMATIC);
        this.filename = this.tsFile?.sourceFile?.fileName ?? '';
    }


    getComplexityStatus(cpxType: ComplexityType): MethodStatus {
        let status = MethodStatus.WARNING;
        if (
            (cpxType === ComplexityType.COGNITIVE && this.cognitiveValue <= Options.cognitiveCpx.warningThreshold)
            ||
            (cpxType === ComplexityType.CYCLOMATIC && this.cyclomaticValue <= Options.cyclomaticCpx.warningThreshold)) {
            status = MethodStatus.CORRECT;
        } else if (
            (cpxType === ComplexityType.COGNITIVE && this.cognitiveValue > Options.cognitiveCpx.errorThreshold)
            ||
            (cpxType === ComplexityType.CYCLOMATIC && this.cyclomaticValue > Options.cyclomaticCpx.errorThreshold)) {
            status = MethodStatus.ERROR;
        }
        return status;
    }


    getCode(): string {
        return this.node.getFullText(this.tsFile.sourceFile);
    }

}
