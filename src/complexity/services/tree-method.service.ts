import * as ts from 'typescript';
import { TreeFile } from '../models/tree-file.model';
import { TreeMethod } from '../models/tree-method.model';
import { TreeNodeService } from './tree-node.service';
import { ComplexitiesByStatus } from '../interfaces/complexities-by-status.interface';
import { ComplexityType } from '../enums/complexity-type.enum';
import { MethodStatus } from '../enums/evaluation-status.enum';
import { Ast } from './ast.service';
import { CodeService } from './code.service';

export class TreeMethodService {


    static generateTree(treeFile: TreeFile): TreeMethod[] {
        const methods: TreeMethod[] = [];
        ts.forEachChild(treeFile.sourceFile, function cb(node) {
            if (Ast.isFunctionOrMethod(node)) {
                const newMethod: TreeMethod = new TreeMethod(node);
                newMethod.treeFile = treeFile;
                newMethod.astPosition = node.pos;
                const originalText = node.getFullText(treeFile.sourceFile);
                const codeService = new CodeService();
                newMethod.originalCode = codeService.createCode(originalText);
                newMethod.tree = TreeNodeService.generateTree(newMethod);
                newMethod.evaluate();
                newMethod.createDisplayedCode();
                methods.push(newMethod);
            }
            ts.forEachChild(node, cb);
        });
        return methods;
    }


    addMethodCpxByStatus(cpxByStatus: ComplexitiesByStatus, treeMethod: TreeMethod): ComplexitiesByStatus {
        let cpx: ComplexitiesByStatus = cpxByStatus ?? new ComplexitiesByStatus();
        cpx = this.incrementMethodByCpxType(cpx, ComplexityType.COGNITIVE, treeMethod.cognitiveStatus);
        cpx = this.incrementMethodByCpxType(cpx, ComplexityType.CYCLOMATIC, treeMethod.cyclomaticStatus);
        return cpx;
    }


    private incrementMethodByCpxType(cpxByStatus: ComplexitiesByStatus, complexityType: ComplexityType, methodStatus: MethodStatus): ComplexitiesByStatus {
        const status: ComplexitiesByStatus = cpxByStatus;
        switch (methodStatus) {
            case MethodStatus.CORRECT:
                status[complexityType].correct = status[complexityType].correct + 1;
                break;
            case MethodStatus.WARNING:
                status[complexityType].warning++;
                break;
            case MethodStatus.ERROR:
                status[complexityType].error++;
                break;
            default:
                break;
        }
        return status;
    }

}
