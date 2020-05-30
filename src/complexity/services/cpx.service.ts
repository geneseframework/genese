import * as ts from 'typescript';
import { Ast } from './ast.service';

export class CpxService {

    getComplexity(node: ts.Node, cb?: () => number): number {
        let cpx = 0;
        ts.forEachChild(node, function cb(childNode: ts.Node) {
            console.log('KIND', Ast.getType(childNode))
            ts.forEachChild(node, cb);
        });
        return cpx
    }
}
