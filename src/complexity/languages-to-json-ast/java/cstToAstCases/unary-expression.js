"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const unaryPrefixOperator = children.UnaryPrefixOperator;
    const identifier = children.primary[0].children.primaryPrefix[0].children.fqnOrRefType[0].children.fqnOrRefTypePartFirst[0].children.fqnOrRefTypePartCommon[0].children.Identifier[0];
    if (unaryPrefixOperator) {
        const unaryPrefixOperatorAst = cstToAst_1.cstToAst(unaryPrefixOperator, 'unaryPrefixOperator');
        unaryPrefixOperatorAst.children.push(cstToAst_1.cstToAst(identifier, 'identifier'));
        return unaryPrefixOperatorAst;
    }
    else {
        return cstToAst_1.cstToAst(identifier, 'identifier');
    }
}
exports.run = run;
