import * as ts from 'typescript';
import { TreeFile } from '../models/tree-file.model';
import { TreeMethod } from '../models/tree-method.model';
import { TsTreeService } from './ts-tree.service';

export class TsMethodService {


    static generateTree(tsFile: TreeFile): TreeMethod[] {
        const methods: TreeMethod[] = [];
        ts.forEachChild(tsFile.sourceFile, function cb(node) {
            if (node.kind === ts.SyntaxKind.MethodDeclaration) {
                const newMethod: TreeMethod = new TreeMethod(node);
                newMethod.treeFile = tsFile;
                newMethod.tree = TsTreeService.generateTree(newMethod);
                newMethod.evaluate();
                methods.push(newMethod);
            }
            ts.forEachChild(node, cb);
        });
        return methods;
    }

}
