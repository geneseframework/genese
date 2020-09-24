"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    const methodHeader = children.methodHeader;
    const methodBody = children.methodBody;
    const methodHeaderAst = methodHeader.map(e => cstToAst_1.cstToAst(e));
    return {
        kind: 'MethodDeclaration',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset + 1,
        pos: cstNode.location.startOffset,
        name: getName(methodHeaderAst),
        children: [
            ...[].concat(...methodHeaderAst),
            ...[].concat(...methodBody.map(e => cstToAst_1.cstToAst(e))),
        ]
    };
}
exports.run = run;
function getName(methodHeaderAst) {
    var _a, _b, _c;
    return (_c = (_b = (_a = methodHeaderAst === null || methodHeaderAst === void 0 ? void 0 : methodHeaderAst[0]) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : '';
}
