"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CyclomaticCpxService = void 0;
const syntax_kind_enum_1 = require("../../core/enum/syntax-kind.enum");
/**
 * Service around complexity calculation
 */
class CyclomaticCpxService {
    /**
     * Returns the cyclomatic complexity of an AST node
     * @param astNode
     */
    static calculateCyclomaticCpx(astNode) {
        let totalComplexity = CyclomaticCpxService.currentAstNodeCyclomaticCpx(astNode);
        totalComplexity += CyclomaticCpxService.childrenCyclomaticCpx(astNode);
        // ts.forEachChild(node, function cb(node) {
        //     if (utils.isFunctionWithBody(node)) {
        //         totalComplexity += 1;
        //         ts.forEachChild(node, cb);
        //     } else {
        //         if (CyclomaticCpxService.increasesCyclomaticComplexity(node)) {
        //             totalComplexity += 1;
        //         }
        //         ts.forEachChild(node, cb);
        //     }
        // });
        return totalComplexity;
    }
    static currentAstNodeCyclomaticCpx(astNode) {
        return CyclomaticCpxService.increasesCyclomaticComplexity(astNode) ? 1 : 0;
    }
    static childrenCyclomaticCpx(astNode) {
        let cyclomaticCpx = 0;
        for (const childAstNode of astNode.children) {
            cyclomaticCpx += CyclomaticCpxService.currentAstNodeCyclomaticCpx(childAstNode);
            cyclomaticCpx += CyclomaticCpxService.childrenCyclomaticCpx(childAstNode);
        }
        return cyclomaticCpx;
    }
    /**
     * Increases the cyclomatic complexity when the AST node must increase it
     * @param astNode
     */
    static increasesCyclomaticComplexity(astNode) {
        switch (astNode.kind) {
            case syntax_kind_enum_1.SyntaxKind.AmpersandAmpersandToken:
            case syntax_kind_enum_1.SyntaxKind.BarBarToken:
            case syntax_kind_enum_1.SyntaxKind.CaseClause:
            case syntax_kind_enum_1.SyntaxKind.CatchClause:
            case syntax_kind_enum_1.SyntaxKind.DoStatement:
            case syntax_kind_enum_1.SyntaxKind.ForStatement:
            case syntax_kind_enum_1.SyntaxKind.ForInStatement:
            case syntax_kind_enum_1.SyntaxKind.ForOfStatement:
            case syntax_kind_enum_1.SyntaxKind.FunctionDeclaration:
            case syntax_kind_enum_1.SyntaxKind.IfStatement:
            case syntax_kind_enum_1.SyntaxKind.MethodDeclaration:
            case syntax_kind_enum_1.SyntaxKind.QuestionDotToken:
            case syntax_kind_enum_1.SyntaxKind.WhileStatement:
                return true;
            default:
                return false;
        }
    }
}
exports.CyclomaticCpxService = CyclomaticCpxService;
