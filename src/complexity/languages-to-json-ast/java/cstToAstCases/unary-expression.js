"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const unaryPrefixOperator = children.UnaryPrefixOperator;
    const primary = children.primary;
    return [
        // cstToAst(unaryPrefixOperator, 'unaryPrefixOperator'),
        ...[].concat(...primary.map(e => cstToAst_1.cstToAst(e)))
    ];
    // return {
    //     kind: 'UnaryExpression',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     pos: cstNode.location.startOffset,
    //     children: [
    //         // cstToAst(unaryPrefixOperator, 'unaryPrefixOperator'),
    //         ...[].concat(...primary.map(e => cstToAst(e)))
    //     ]
    // };
    // if (unaryPrefixOperator) {
    //     const unaryPrefixOperatorAst = cstToAst(unaryPrefixOperator, 'unaryPrefixOperator');
    //     unaryPrefixOperatorAst.children.push(cstToAst(identifier, 'identifier'));
    //     return unaryPrefixOperatorAst;
    // } else {
    //     return cstToAst(identifier, 'identifier');
    // }
}
exports.run = run;
