import * as ts from 'typescript';
import { TreeMethod } from './tree-method.model';
import { TreeFolder } from './tree-folder.model';
import { TreeFileService } from '../../services/tree/tree-file.service';
import { Stats } from '../stats.model';
import { ComplexitiesByStatus } from '../../interfaces/complexities-by-status.interface';
import { Evaluable } from '../evaluable.model';
import { HasStats } from '../../interfaces/has-stats';
import { TreeMethodService } from '../../services/tree/tree-method.service';
import { TreeNode } from './tree-node.model';
import { HasTreeNode } from '../../interfaces/has-tree-node';
import { AstFile } from '../../ast/models/ast-file.model';

/**
 * Element of the TreeNode structure corresponding to a given file (AST astFile)
 */
export class TreeFile extends Evaluable implements HasStats, HasTreeNode {

    #astFile: AstFile = undefined;
    complexitiesByStatus?: ComplexitiesByStatus = undefined;    // The file complexities spread by complexity status
    cpxIndex ?= 0;                                              // The complexity index of this file
    name ?= '';                                                 // The name of this file
    #sourceFile?: ts.SourceFile = undefined;                    // The Typescript JsonAst
    stats?: Stats = undefined;                                  // The statistics of the file
    treeFileService: TreeFileService = new TreeFileService();   // The service for TreeFiles
    treeFolder?: TreeFolder = new TreeFolder();                 // The AstFolder which includes this TreeFile
    #treeMethods?: TreeMethod[] = [];                           // The TreeMethods included in this TreeFile
    #treeNode?: TreeNode = undefined;                           // The TreeNode corresponding to the file itself
    #treeNodes?: TreeNode[] = undefined;                        // The TreeNode corresponding to the file itself

    constructor() {
        super();
        this.treeFileService.treeFile = this;
    }



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


    get astFile(): AstFile {
        return this.#astFile;
    }


    set astFile(astFile: AstFile) {
        this.#astFile = astFile;
    }


    get sourceFile(): ts.SourceFile {
        return this.#sourceFile;
    }


    set sourceFile(source: ts.SourceFile) {
        this.#sourceFile = source;
    }


    get treeMethods(): TreeMethod[] {
        return this.#treeMethods;
    }


    set treeMethods(treeMethods: TreeMethod[]) {
        this.#treeMethods = treeMethods;
    }


    get treeNode(): TreeNode {
        return this.#treeNode;
    }


    set treeNode(treeNode: TreeNode) {
        this.#treeNode = treeNode;
    }


    get treeNodes(): TreeNode[] {
        return this.#treeNodes;
    }


    set treeNodes(treeNodes: TreeNode[]) {
        this.#treeNodes = treeNodes;
    }


    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------


    /**
     * Evaluates the complexities of the TreeNodes and the TreeMethods of this TreeFile
     */
    evaluate(): void {
        const treeMethodService = new TreeMethodService();
        for (const treeNode of this.#treeNodes) {
            treeNode.evaluate();
        }
        for (const method of this.treeMethods) {
            method.evaluate();
            this.cpxIndex += method.cpxIndex;
            this.cyclomaticCpx += method.cyclomaticCpx;
            this.complexitiesByStatus = treeMethodService.addMethodCpxByStatus(this.complexitiesByStatus, method);
        }
    }


    /**
     * Gets the stats of this TreeFile
     */
    getStats(): Stats {
        if (!this.stats) {
            this.stats = this.treeFileService.getStats(this);
        }
        return this.stats;
    }
}
