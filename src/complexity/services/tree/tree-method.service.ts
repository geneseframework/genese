import * as ts from 'typescript';
import { TreeFile } from '../../models/tree/tree-file.model';
import { TreeMethod } from '../../models/tree/tree-method.model';
import { TreeNodeService } from './tree-node.service';
import { ComplexitiesByStatus } from '../../interfaces/complexities-by-status.interface';
import { ComplexityType } from '../../enums/complexity-type.enum';
import { MethodStatus } from '../../enums/evaluation-status.enum';
import { Ast } from '../ast.service';
import { CodeService } from '../code.service';
import { TreeNode } from '../../models/tree/tree-node.model';
import * as chalk from 'chalk';

export class TreeMethodService {

    codeService?: CodeService = new CodeService();
    // treeNodeService?: TreeNodeService = new TreeNodeService();


    createTreeMethods(treeNode: TreeNode): TreeMethod[] {
        const treeMethods: TreeMethod[] = [];
        for (const childTreeNode of treeNode.children) {
            console.log(childTreeNode.kind, 'IS FUNC', childTreeNode.isFunctionOrMethod)
            if (childTreeNode.isFunctionOrMethod) {
                treeMethods.push(this.createMethod(childTreeNode));
            }
            this.createTreeMethods(childTreeNode);
        }
        return treeMethods;
    }


    private createMethod(treeNode: TreeNode): TreeMethod {
        const treeMethod = new TreeMethod();
        treeMethod.treeNode = treeNode;
        console.log('METHODDD', treeMethod.treeNode)
        treeMethod.originalCode = this.codeService.getNodeCode(treeNode.node, treeNode.sourceFile);
        treeMethod.createDisplayedCode();
        treeMethod.evaluate();
        return treeMethod;
    }

    // generateTree(treeFile: TreeFile): TreeMethod[] {
    //     const methods: TreeMethod[] = [];
    //     let __self = this;
    //     ts.forEachChild(treeFile.sourceFile, function cb(node) {
    //         if (Ast.isFunctionOrMethod(node)) {
    //             const newMethod: TreeMethod = new TreeMethod();
    //             newMethod.treeFile = treeFile;
    //             newMethod.originalCode = __self.codeService.getNodeCode(node, treeFile.sourceFile);
    //             newMethod.treeNode = __self.treeNodeService.generateTree(newMethod, node);
    //             newMethod.createDisplayedCode();
    //             newMethod.treeNode.context = treeFile.treeNode;
    //             // newMethod.treeNode.context = __self.treeNodeService.getContext(newMethod.treeNode);
    //             __self.setContextToTreeNodeChildren(newMethod.treeNode);
    //             newMethod.evaluate();
    //             methods.push(newMethod);
    //         }
    //         ts.forEachChild(node, cb);
    //     });
    //     return methods;
    // }


    // private setContextToTreeNodeChildren(treeNode: TreeNode): void {
    //     for (const childTreeNode of treeNode?.children) {
    //         console.log(chalk.blueBright('SEARCH CONTEXT OF '), childTreeNode.kind, childTreeNode.name);
    //         childTreeNode.context = this.treeNodeService.getContext(childTreeNode);
    //         console.log(chalk.blueBright('CONTEXT OF '), childTreeNode.kind, childTreeNode.name, ' = ', childTreeNode.context?.kind,  childTreeNode.context?.name);
    //         this.setContextToTreeNodeChildren(childTreeNode);
    //     }
    // }


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
