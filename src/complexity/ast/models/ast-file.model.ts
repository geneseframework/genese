import { AstNode } from './ast-node.model';
import { AstKind } from '../enums/ast-kind.enum';
import { getFilename } from '../../services/file.service';
import { TreeMethodService } from '../../services/tree/tree-method.service';
import { Stats } from '../../models/stats.model';
import { TreeFolder } from '../../models/tree/tree-folder.model';

export class AstFile {



    // ---------------------------------------------------------------------------------
    //                                Mandatory properties
    // ---------------------------------------------------------------------------------


    #children: AstNode[] = [];
    #end ?= 0;
    #path ?= '';
    #text ?= '';


    // ---------------------------------------------------------------------------------
    //                                Other properties
    // ---------------------------------------------------------------------------------


    #name?: string = undefined;
    #treeFolder?: TreeFolder = undefined;



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


    get astNode(): AstNode {
        const astNode = new AstNode();
        astNode.pos = 0;
        astNode.end = this.text.length; // TODO: fix
        astNode.kind = AstKind.SOURCE_FILE;
        astNode.children = this.children;
        return astNode;
    }


    get children(): AstNode[] {
        return this.#children;
    }


    set children(astNodes: AstNode[]) {
        this.#children = astNodes;
    }


    get end(): number {
        return this.#end;
    }


    set end(end: number) {
        this.#end = end;
    }


    get name(): string {
        return this.#name ?? getFilename(this.#path);
    }


    get path(): string {
        return this.#path;
    }


    set path(path: string) {
        this.#path = path;
    }


    get text(): string {
        return this.#text;
    }


    set text(text: string) {
        this.#text = text;
    }


    get treeFolder(): TreeFolder {
        return this.#treeFolder;
    }


    set treeFolder(treeFolder: TreeFolder) {
        this.#treeFolder = treeFolder;
    }


    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------


    /**
     * Evaluates the complexities of the TreeNodes and the TreeMethods of this TreeFile
     */
    evaluate(): void {
        // const treeMethodService = new TreeMethodService();
        // for (const treeNode of this.#treeNodes) {
        //     treeNode.evaluate();
        // }
        // for (const method of this.treeMethods) {
        //     method.evaluate();
        //     this.cpxIndex += method.cpxIndex;
        //     this.cyclomaticCpx += method.cyclomaticCpx;
        //     this.complexitiesByStatus = treeMethodService.addMethodCpxByStatus(this.complexitiesByStatus, method);
        // }
    }


    /**
     * Gets the stats of this TreeFile
     */
    // getStats(): Stats {
        // if (!this.stats) {
        //     this.stats = this.astFileService.getStats(this);
        // }
        // return this.stats;
    // }

}
