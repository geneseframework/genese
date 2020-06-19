import * as ts from 'typescript';
import { getFilename } from '../../../core/services/file.service';
import { TsFolder } from '../models/ts-folder.model';
import { TsFile } from '../models/ts-file.model';
import { Ts } from './ts.service';
import { TsNode } from '../models/ts-node.model';

/**
 * - TsFiles generation from their Abstract Syntax Tree (AST)
 */
export class TsFileConversionService {


    /**
     * Generates the TsFile corresponding to a given path and a given TsFolder
     * @param path          // The path of the file
     * @param astFolder     // The TsFolder containing the TsFile
     */
    generateTsFile(path: string, astFolder: TsFolder): TsFile {
        if (!path || !astFolder) {
            console.warn('No path or TsFolder : impossible to create TsFile');
            return undefined;
        }
        const tsFile = new TsFile();
        tsFile.name = getFilename(path);
        const tsNode = new TsNode();
        tsNode.node = Ts.getSourceFile(path);
        tsFile.text = Ts.getTextFile(path);
        tsFile.tsNode = this.createTsNodeChildren(tsNode);
        return tsFile;
    }


    /**
     * Returns the TsNode children of a given TsNode
     * @param tsNode        // The TsNode parent
     */
    createTsNodeChildren(tsNode: TsNode): TsNode {
        ts.forEachChild(tsNode.node, (childTsNode: ts.Node) => {
            const newTsNode = new TsNode();
            newTsNode.node = childTsNode;
            newTsNode.pos = Ts.getPosition(newTsNode.node);
            newTsNode.end = Ts.getEnd(newTsNode.node);
            newTsNode.name = Ts.getName(newTsNode.node);
            newTsNode.kind = Ts.getKind(newTsNode.node);
            tsNode.children.push(this.createTsNodeChildren(newTsNode))
        });
        return tsNode;
    }


    /**
     * Returns the text corresponding to a source code by escaping break lines
     * @param path
     */
    getTextFile(path: string): string {
        return  Ts.getTextFile(path);
    }


}
