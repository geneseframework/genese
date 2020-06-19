"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstNodeService = void 0;
const ast_service_1 = require("./ast.service");
const syntax_kind_enum_1 = require("../../../core/enum/syntax-kind.enum");
/**
 * Service managing AstNodes
 */
class AstNodeService {
    getCode(astNode) {
        var _a;
        // console.log('GET CODDDDEEE', astNode.kind, astNode.name, astNode?.pos, astNode?.end, astNode.astFile);
        if (!((_a = astNode === null || astNode === void 0 ? void 0 : astNode.astFile) === null || _a === void 0 ? void 0 : _a.text) || (astNode === null || astNode === void 0 ? void 0 : astNode.pos) === undefined || (astNode === null || astNode === void 0 ? void 0 : astNode.end) === undefined) {
            return '';
        }
        // console.log(chalk.red('FILE CODEEE', astNode.astFile.text))
        // const aaa = `\\`;
        // console.log('AAAAAAA', aaa.replace(/\\/g, '\\'));
        const text = astNode.astFile.text.replace(/\\/g, '\\');
        // console.log(chalk.green('GET CODEEE TEXT', text))
        const zzz = text.slice(astNode.pos, astNode.end);
        // const zzz = astNode.astFile.text.slice(astNode.pos, astNode.end);
        // console.log('ZZZZ', {zzz: zzz});
        return zzz;
    }
    /**
     * Gets the javascript context of the AST node of a AstNode
     * @param astNode      // The AstNode for which we search the context
     */
    getContext(astNode) {
        var _a, _b, _c, _d;
        if (!astNode) {
            return undefined;
        }
        switch (astNode.kind) {
            case syntax_kind_enum_1.SyntaxKind.SourceFile:
                return astNode;
            case syntax_kind_enum_1.SyntaxKind.Identifier:
                return this.getIdentifierContext(astNode);
            case syntax_kind_enum_1.SyntaxKind.ThisKeyword:
                return (_b = (_a = astNode.parent) === null || _a === void 0 ? void 0 : _a.context) === null || _b === void 0 ? void 0 : _b.context;
            default:
                if ((_c = astNode.parent) === null || _c === void 0 ? void 0 : _c.mayDefineContext) {
                    return astNode.parent;
                }
                else {
                    return (_d = astNode.parent) === null || _d === void 0 ? void 0 : _d.context;
                }
        }
    }
    /**
     * Gets the javascript context of an Identifier AST node of a given AstNode
     * @param astNode      // The concerned AstNode
     */
    getIdentifierContext(astNode) {
        var _a, _b, _c, _d, _e;
        if (this.isSecondSonOfPropertyAccessExpression(astNode)) {
            return ((_b = (_a = astNode.parent) === null || _a === void 0 ? void 0 : _a.firstSon) === null || _b === void 0 ? void 0 : _b.mayDefineContext) ? (_c = astNode.parent) === null || _c === void 0 ? void 0 : _c.firstSon : (_d = astNode.parent) === null || _d === void 0 ? void 0 : _d.firstSon.context;
        }
        else {
            return (_e = astNode.parent) === null || _e === void 0 ? void 0 : _e.context;
        }
    }
    /**
     * Checks if a AstNode is the second son of an AST node "PropertyAccessExpression"
     * (the first son is the object and the second is its property)
     * @param astNode
     */
    isSecondSonOfPropertyAccessExpression(astNode) {
        return ast_service_1.Ast.isPropertyAccessExpression(astNode === null || astNode === void 0 ? void 0 : astNode.parent) && astNode === (astNode === null || astNode === void 0 ? void 0 : astNode.parent.secondSon);
    }
    /**
     * Checks if a AstNode is a Callback (ie a parameter which is used later in a CallExpression)
     * @param astNode      // The AstNode to check
     */
    isCallback(astNode) {
        if (!astNode.isParam) {
            return false;
        }
        const zzz = this.hasCallBack(astNode, astNode.parent);
        // console.log('ZZZZ CB', zzz)
        return zzz;
        // return this.hasCallBack(astNode, astNode.parent);
    }
    /**
     * Checks if a Parameter AstNode is used in a CallExpression of its method
     * @param astNodeParam     // The Parameter AstNode
     * @param astNode          // Parameter used for recursion
     */
    hasCallBack(astNodeParam, astNode) {
        for (const childAstNode of astNode === null || astNode === void 0 ? void 0 : astNode.children) {
            if (childAstNode.name === astNodeParam.name && childAstNode.context === astNodeParam.context && childAstNode.isCallIdentifier) {
                return true;
            }
            if (this.hasCallBack(astNodeParam, childAstNode)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Checks if a AstNode is a recursive method (ie a MethodDeclaration or a FunctionDeclaration which is called from inside)
     * @param astNode      // The AstNode to check
     */
    isRecursiveMethod(astNode) {
        if (!astNode.isFunctionOrMethodDeclaration) {
            return false;
        }
        return this.hasRecursiveNode(astNode.astMethod, astNode);
    }
    /**
     * Checks if a MethodDeclaration or a FunctionDeclaration AstNode is called by one of its children
     * @param astNodeMethod     // The MethodDeclaration or FunctionDeclaration AstNode
     * @param astNode          // Parameter used for recursion
     */
    hasRecursiveNode(astNodeMethod, astNode) {
        for (const childAstNode of astNode === null || astNode === void 0 ? void 0 : astNode.children) {
            if (childAstNode.name === astNodeMethod.name && childAstNode.context === astNodeMethod.astNode.context && !astNode.isFunctionOrMethodDeclaration) {
                return true;
            }
            if (this.hasRecursiveNode(astNodeMethod, childAstNode)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Returns an array of AstNodes with all the AstNode children of the first param concatenated with the second param
     * @param astNode      // The "parent" node to parse
     * @param astNodes     // The "accumulator"
     */
    flatMapAstNodes(astNode, astNodes) {
        for (const childAstNode of astNode === null || astNode === void 0 ? void 0 : astNode.children) {
            astNodes.push(childAstNode);
            if (childAstNode.children.length > 0) {
                astNodes = astNodes.concat(this.flatMapAstNodes(childAstNode, []));
            }
        }
        return astNodes;
    }
}
exports.AstNodeService = AstNodeService;
