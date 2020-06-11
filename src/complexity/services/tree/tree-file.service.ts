import * as ts from 'typescript';
import { TreeFolder } from '../../models/tree/tree-folder.model';
import { TreeFile } from '../../models/tree/tree-file.model';
import { Ast } from '../ast.service';
import { TreeMethod } from '../../models/tree/tree-method.model';
import { MethodStatus } from '../../enums/evaluation-status.enum';
import { ComplexityType } from '../../enums/complexity-type.enum';
import { StatsService } from '../report/stats.service';
import { Stats } from '../../models/stats.model';
import { TreeMethodService } from './tree-method.service';
import { TreeNode } from '../../models/tree/tree-node.model';
import { TreeNodeService } from './tree-node.service';

/**
 * - TreeFiles generation from Abstract Syntax TreeNode of a file
 * - Other services for TreeFiles
 */
export class TreeFileService extends StatsService{

    protected _stats: Stats = undefined;            // The statistics of the TreeFile
    treeFile: TreeFile = undefined;                 // The TreeFile corresponding to this service
    treeMethodService?: TreeMethodService = new TreeMethodService();
    treeNodeService?: TreeNodeService = new TreeNodeService();

    constructor() {
        super();
    }


    /**
     * Generates the TreeFile for a given file of a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the file
     * @param path          // The path of the file
     * @param treeFolder      // The TreeFolder containing the TreeFile
     */
    generateTree(path: string, treeFolder: TreeFolder = new TreeFolder()): TreeFile {
        let treeFile: TreeFile = new TreeFile();
        treeFile.sourceFile = Ast.getSourceFile(path);
        treeFile.name = treeFile.sourceFile?.fileName;
        treeFile.treeNode = new TreeNode();
        treeFile.treeNode.node = treeFile.sourceFile;
        treeFile.treeNode.treeFile = treeFile;
        treeFile.treeFolder = treeFolder;
        this.treeNodeService.createTreeNodeChildren(treeFile.treeNode);
        this.setContextToTreeNodeChildren(treeFile.treeNode);
        treeFile.treeNodes = this.setTreeNodes(treeFile.treeNode, [treeFile.treeNode]);
        console.log('NODESSSS', treeFile.treeNodes.length);
        for (const treeNode of treeFile.treeNodes) {
            console.log('????', treeNode.kind, treeNode.name)
        }
        // console.log('NODESSSS', treeFile.treeNodes.map(e => e.kind))
        treeFile.treeMethods = this.treeMethodService.createTreeMethods(treeFile.treeNode);
        // for (const children of )
        treeFile.evaluate();
        return treeFile;
    }


    private setTreeNodes(treeNode: TreeNode, treeNodes: TreeNode[]): TreeNode[] {
        let acc = [];
        let nodes: TreeNode[] = treeNodes;
        for (const childTreeNode of treeNode?.children) {
            treeNodes.push(childTreeNode);
            if (childTreeNode.children.length > 0) {
                    treeNodes = treeNodes.concat(this.setTreeNodes(childTreeNode, []));
                // for (const granChild of childTreeNode.children) {
                //     treeNodes = treeNodes.concat(this.setTreeNodes(granChild, treeNodes));
                //
                // }
                // return treeNodes;
            }

            // treeNodes.push(childTreeNode);
        }
        // for (const el of treeNodes) {
        //     treeNodes.concat(this.setTreeNodes(el, treeNodes))
        // }
        // nodes.push(childTreeNode);
        // console.log('TREENDSss', nodes)
        // nodes = nodes.concat(this.setTreeNodes(childTreeNode, nodes));
        // console.log('TREENDSss', nodes)
        return treeNodes;
    }



    private setContextToTreeNodeChildren(treeNode: TreeNode): void {
        for (const childTreeNode of treeNode?.children) {
            childTreeNode.context = this.treeNodeService.getContext(childTreeNode);
            // childTreeNode.treeMethod = new TreeMethod();
            // console.log(chalk.blueBright('CONTEXT OF '), childTreeNode.kind, childTreeNode.name, ' = ', childTreeNode.context?.kind,  childTreeNode.context?.name);
            this.setContextToTreeNodeChildren(childTreeNode);
        }
    }


    /**
     * Calculates the statistics of the TreeFile
     * @param treeFile    // The TreeFile to analyse
     */
    calculateStats(treeFile: TreeFile): void {
        this._stats.numberOfMethods = treeFile.treeMethods?.length ?? 0;
        for (const method of treeFile.treeMethods) {
            this.incrementStats(method);
        }
    }


    /**
     * Increments TreeFile statistics for a given method
     * @param treeMethod    // The TreeMethod to analyse
     */
    incrementStats(treeMethod: TreeMethod): void {
        this.incrementStatsMethodsByStatus(treeMethod, ComplexityType.COGNITIVE);
        this.incrementStatsMethodsByStatus(treeMethod, ComplexityType.CYCLOMATIC);
        this._stats.barChartCognitive.addResult(treeMethod.cpxIndex);
        this._stats.barChartCyclomatic.addResult(treeMethod.cyclomaticCpx);
    }


    /**
     * Increments the number of methods spread by Status (correct, warning, error) and by complexity type
     * @param treeMethod        // The TreeMethod to analyse
     * @param type              // The complexity type
     */
    incrementStatsMethodsByStatus(treeMethod: TreeMethod, type: ComplexityType): void {
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


    /**
     * Adds the filename to the stats
     */
    getNameOrPath(): void {
        this._stats.subject = this.treeFile.name;
    }

}
