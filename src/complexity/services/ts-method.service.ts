import * as ts from 'typescript';
import { TsFile } from '../models/ts-file.model';
import { TsMethod } from '../models/ts-method.model';
import { TsTreeService } from './ts-tree.service';

export class TsMethodService {


    static generateTree(tsFile: TsFile): TsMethod[] {
        const methods: TsMethod[] = [];
        ts.forEachChild(tsFile.sourceFile, function cb(node) {
            if (node.kind === ts.SyntaxKind.MethodDeclaration) {
                const newMethod: TsMethod = new TsMethod(node);
                newMethod.tsFile = tsFile;
                newMethod.tsTree = TsTreeService.generateTree(newMethod);
                newMethod.evaluate();
                methods.push(newMethod);
            }
            ts.forEachChild(node, cb);
        });
        return methods;
    }

}
