import * as ts from 'typescript';
import { TreeFile } from '../../models/tree/tree-file.model';
import { TreeMethod } from '../../models/tree/tree-method.model';
import { TreeNodeService } from './tree-node.service';
import { ComplexitiesByStatus } from '../../interfaces/complexities-by-status.interface';
import { ComplexityType } from '../../enums/complexity-type.enum';
import { MethodStatus } from '../../enums/evaluation-status.enum';
import { Ast } from '../ast.service';
import { CodeService } from '../code.service';

export class TreeMethodService {

    treeNodeService?: TreeNodeService = new TreeNodeService();

    /**
     * Generates the array of TreeMethods corresponding to the methods included in a given TreeFile
     * @param treeFile  // The TreeFile containing the methods
     */
    generateTree(treeFile: TreeFile): TreeMethod[] {
        const methods: TreeMethod[] = [];
        let __self = this;
        ts.forEachChild(treeFile.sourceFile, function cb(node) {
            if (Ast.isFunctionOrMethod(node)) {
                const newMethod: TreeMethod = new TreeMethod(node);
                newMethod.treeFile = treeFile;
                newMethod.astPosition = node.pos;
                const originalText = node.getFullText(treeFile.sourceFile);
                const codeService = new CodeService();
                newMethod.originalCode = codeService.createCode(originalText);
                newMethod.treeNode = __self.treeNodeService.generateTree(newMethod);
                newMethod.evaluate();
                newMethod.createDisplayedCode();
                methods.push(newMethod);
            }
            ts.forEachChild(node, cb);
        });
        return methods;
    }


    /**
     * Returns the addition of a ComplexitiesByStatus object and the complexities scores of a given treeMethod
     * @param cpxByStatus   // The object to add
     * @param treeMethod    // The TreeMethod in question
     */
    addMethodCpxByStatus(cpxByStatus: ComplexitiesByStatus, treeMethod: TreeMethod): ComplexitiesByStatus {
        let cpx: ComplexitiesByStatus = cpxByStatus ?? new ComplexitiesByStatus();
        cpx = this.incrementMethodByCpxType(cpx, ComplexityType.COGNITIVE, treeMethod.cognitiveStatus);
        cpx = this.incrementMethodByCpxType(cpx, ComplexityType.CYCLOMATIC, treeMethod.cyclomaticStatus);
        return cpx;
    }


    /**
     * For a given complexity type, returns the value of a ComplexitiesByStatus object incremented of one for a given MethodStatus
     * @param cpxByStatus       // The ComplexitiesByStatus object
     * @param complexityType    // The type of complexity to increment
     * @param methodStatus      // The complexity status
     */
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
