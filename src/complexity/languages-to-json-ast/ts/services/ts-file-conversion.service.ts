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
        const name = getFilename(path);
        if (name) {
            tsFile.name = name;
        }
        const tsNode = new TsNode();
        tsNode.node = Ts.getSourceFile(path);
        tsFile.text = Ts.getTextFile(path);
        tsFile.tsNode = this.createTsNodeChildren(tsNode, Ts.getSourceFile(path));
        return tsFile;
    }


    /**
     * Returns the TsNode children of a given TsNode
     * @param tsNode            // The TsNode parent
     * @param sourceFile        // The AST node of the file itself
     */
    createTsNodeChildren(tsNode: TsNode, sourceFile: ts.SourceFile): TsNode {
        ts.forEachChild(tsNode.node, (childTsNode: ts.Node) => {
            const newTsNode = new TsNode();
            newTsNode.node = childTsNode;
            newTsNode.pos = Ts.getPosition(newTsNode.node);
            newTsNode.start = Ts.getStart(newTsNode.node, sourceFile);
            newTsNode.end = Ts.getEnd(newTsNode.node);
            newTsNode.name = Ts.getName(newTsNode.node);
            newTsNode.kind = Ts.getKindAlias(newTsNode.node);
            tsNode.children.push(this.createTsNodeChildren(newTsNode, sourceFile))
        });
        return tsNode;
    }

}
