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
export class TreeFileService extends StatsService {

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
     * @param path            // The path of the file
     * @param treeFolder      // The TreeFolder containing the TreeFile
     */
    generateTree(path: string, treeFolder: TreeFolder = new TreeFolder()): TreeFile {
        this.treeFile = new TreeFile();
        this.treeFile.sourceFile = Ast.getSourceFile(path);
        this.treeFile.name = this.treeFile.sourceFile?.fileName;
        this.treeFile.treeFolder = treeFolder;
        this.generateTreeNodes();
        this.treeFile.treeMethods = this.setTreeMethods(this.treeFile.treeNodes);
        this.treeFile.evaluate();
        return this.treeFile;
    }


    /**
     * Generates all the TreeNodes and updates this.treeFile
     */
    private generateTreeNodes(): void {
        this.treeFile.treeNode = new TreeNode();
        this.treeFile.treeNode.node = this.treeFile.sourceFile;
        this.treeFile.treeNode.treeFile = this.treeFile;
        this.treeNodeService.createTreeNodeChildren(this.treeFile.treeNode);
        this.setContextToTreeNodeChildren(this.treeFile.treeNode);
        this.treeFile.treeNodes = this.flatMapTreeNodes(this.treeFile.treeNode, [this.treeFile.treeNode]);
        for (let treeNode of this.treeFile.treeNodes) {
            treeNode = this.setNodeMethod(treeNode);
        }
    }


    /**
     * Returns an array of TreeNodes with all the TreeNode children of the first param concatenated with the second param
     * @param treeNode      // The "parent" node to parse
     * @param treeNodes     // The "accumulator"
     */
    private flatMapTreeNodes(treeNode: TreeNode, treeNodes: TreeNode[]): TreeNode[] {
        for (const childTreeNode of treeNode?.children) {
            treeNodes.push(childTreeNode);
            if (childTreeNode.children.length > 0) {
                    treeNodes = treeNodes.concat(this.flatMapTreeNodes(childTreeNode, []));
            }
        }
        return treeNodes;
    }


    /**
     * Sets the treeMethod property to a given treeNode
     * @param treeNode      // The TreeNode to update
     */
    private setNodeMethod(treeNode: TreeNode): TreeNode {
        return treeNode.isFunctionOrMethodDeclaration ? this.treeMethodService.setNodeMethod(treeNode) : undefined;
    }


    /**
     * Returns the array of the TreeMethods corresponding to an array of TreeNodes
     * @param treeNodes     // The array of TreeNodes
     */
    private setTreeMethods(treeNodes: TreeNode[]): TreeMethod[] {
        const treeMethods: TreeMethod[] = [];
        for (const treeNode of treeNodes) {
            if (treeNode.treeMethod) {
                treeMethods.push(treeNode.treeMethod);
            }
        }
        return treeMethods;
    }


    /**
     * Sets the javascript context of each AST node
     * @param treeNode      // The "parent" Node
     */
    private setContextToTreeNodeChildren(treeNode: TreeNode): void {
        for (const childTreeNode of treeNode?.children) {
            childTreeNode.context = this.treeNodeService.getContext(childTreeNode);
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
