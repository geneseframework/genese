import { TreeMethod } from '../../models/tree/tree-method.model';
import { ComplexitiesByStatus } from '../../interfaces/complexities-by-status.interface';
import { ComplexityType } from '../../enums/complexity-type.enum';
import { MethodStatus } from '../../enums/evaluation-status.enum';
import { CodeService } from '../code.service';
import { TreeNode } from '../../models/tree/tree-node.model';

export class TreeMethodService {

    codeService?: CodeService = new CodeService();


    createTreeMethods(treeNode: TreeNode): TreeMethod[] {
        let treeMethods: TreeMethod[] = [];
        for (const childTreeNode of treeNode.children) {
            // console.log(childTreeNode.kind, 'IS FUNC', childTreeNode.isFunctionOrMethod)
            if (childTreeNode.isFunctionOrMethod) {
                treeMethods.push(this.createMethod(childTreeNode));
            }
            treeMethods = treeMethods.concat(this.createTreeMethods(childTreeNode));
        }
        return treeMethods;
    }


    private createMethod(treeNode: TreeNode): TreeMethod {
        const treeMethod = new TreeMethod();
        treeMethod.treeNode = treeNode;
        treeMethod.originalCode = this.codeService.getNodeCode(treeNode.node, treeNode.sourceFile);
        treeMethod.createDisplayedCode();
        treeMethod.evaluate();
        return treeMethod;
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
