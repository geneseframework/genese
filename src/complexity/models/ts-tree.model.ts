import * as ts from 'typescript';
import { TsMethod } from './ts-method.model';

const chalk = require('chalk');

export class TsTree {

    children?: TsTree[] = [];
    depth ?= 0;
    increasesCognitiveComplexity = false;
    kind ?= '';
    node?: ts.Node;
    parent?: TsTree;
    tsMethod?: TsMethod = undefined;



    printAllChildren(){
        this.printChildren(this, ' ');
    }

    printChildren(tsTree: TsTree, indent: string) {
        for (const childTree of tsTree.children) {
            const color = childTree.increasesCognitiveComplexity ? 'red' : 'white';
            console.log(indent, chalk[color](childTree.kind), 'depth', childTree.depth, 'parent', tsTree.kind);
            const newIndent = indent + '  ';
            this.printChildren(childTree, newIndent);
        }
    }

}
