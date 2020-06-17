import * as ts from 'typescript';
import * as utils from 'tsutils';import { getFilename } from '../../../core/services/file.service';
import { TsFolder } from '../models/ts-folder.model';
import { TsFile } from '../models/ts-file.model';
import { Ts } from './ts.service';
import { TsNode } from '../models/ts-node.model';

export class TsFileConversionService {


    generateTsFile(path: string, astFolder: TsFolder): TsFile {
        if (!path || !astFolder) {
            console.warn('No path or TsFolder : impossible to create TsFile');
            return undefined;
        }
        const tsFile = new TsFile();
        tsFile.name = getFilename(path);
        const tsNode = new TsNode();
        tsNode.node = Ts.getSourceFile(path);
        tsFile.tsNode = this.createTsNodeChildren(tsNode);
        // tsFile.logg();
        return tsFile;
    }


    createTsNodeChildren(tsNode: TsNode): TsNode {
        ts.forEachChild(tsNode.node, (childTsNode: ts.Node) => {
            const newTsNode = new TsNode();
            newTsNode.node = childTsNode;
            newTsNode.pos = Ts.getPosition(newTsNode.node);
            newTsNode.end = Ts.getEnd(newTsNode.node);
            // newTsNode.logg();
            tsNode.children.push(this.createTsNodeChildren(newTsNode))
        });
        return tsNode;
    }


}
