"use strict";
exports.__esModule = true;
var ts = require("typescript");
var utils = require("tsutils");
var ast_service_1 = require("./ast.service");
var ComplexityService = /** @class */ (function () {
    function ComplexityService() {
    }
    ComplexityService.calculateCognitiveComplexity = function (tsTree) {
        var complexity = 0;
        if (tsTree) {
            for (var _i = 0, _a = tsTree === null || tsTree === void 0 ? void 0 : tsTree.children; _i < _a.length; _i++) {
                var tree = _a[_i];
                complexity += ComplexityService.addCognitiveComplexity(tree);
                complexity += ComplexityService.calculateCognitiveComplexity(tree);
            }
        }
        return complexity;
    };
    /**
     * Calculates the cyclomatic complexity of a method
     * @param node: ts.Tree
     */
    ComplexityService.calculateCyclomaticComplexity = function (node) {
        var totalComplexity = 1;
        ts.forEachChild(node, function cb(node) {
            if (utils.isFunctionWithBody(node)) {
                totalComplexity += 1;
                ts.forEachChild(node, cb);
            }
            else {
                if (ComplexityService.increasesCyclomaticComplexity(node)) {
                    totalComplexity += 1;
                }
                ts.forEachChild(node, cb);
            }
        });
        return totalComplexity;
    };
    ComplexityService.increaseDepth = function (node, depth) {
        var newDepth = depth;
        switch (node === null || node === void 0 ? void 0 : node.parent.kind) {
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.ConditionalExpression:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.SwitchStatement:
            case ts.SyntaxKind.WhileStatement:
                newDepth = depth + 1;
                break;
            default:
                break;
        }
        return newDepth;
    };
    ComplexityService.addCognitiveComplexity = function (tsTree) {
        var _a;
        var complexity = 0;
        if (!(tsTree === null || tsTree === void 0 ? void 0 : tsTree.node) || (tsTree === null || tsTree === void 0 ? void 0 : tsTree.depth) === undefined) {
            return 0;
        }
        if ((_a = tsTree === null || tsTree === void 0 ? void 0 : tsTree.node) === null || _a === void 0 ? void 0 : _a['elseStatement']) {
            complexity++;
        }
        switch (tsTree.node.kind) {
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.SwitchStatement:
            case ts.SyntaxKind.WhileStatement:
                complexity += tsTree.depth + 1;
                break;
            case ts.SyntaxKind.BinaryExpression:
                complexity += ComplexityService.addBinaryCognitiveCpx(tsTree);
                break;
            case ts.SyntaxKind.PropertyAccessExpression:
                if (ComplexityService.isRecursion(tsTree, tsTree.node)) {
                    complexity++;
                }
                break;
            case ts.SyntaxKind.ConditionalExpression:
                complexity += ComplexityService.conditionalExpressionIsTrivial(tsTree) ? 0 : 1;
                break;
            default:
                complexity += 0;
        }
        return complexity;
    };
    ComplexityService.conditionalExpressionIsTrivial = function (tsTree) {
        var _a, _b;
        return (ComplexityService.isLiteral((_a = tsTree === null || tsTree === void 0 ? void 0 : tsTree.node) === null || _a === void 0 ? void 0 : _a['whenTrue']) && ComplexityService.isLiteral((_b = tsTree === null || tsTree === void 0 ? void 0 : tsTree.node) === null || _b === void 0 ? void 0 : _b['whenFalse']));
    };
    ComplexityService.isLiteral = function (node) {
        return (node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.StringLiteral
            || (node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.NumericLiteral
            || (node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.TrueKeyword
            || (node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.FalseKeyword;
    };
    ComplexityService.isRecursion = function (tsTree, node) {
        var _a, _b;
        return ((_a = node === null || node === void 0 ? void 0 : node['name']) === null || _a === void 0 ? void 0 : _a['escapedText']) === ((_b = tsTree === null || tsTree === void 0 ? void 0 : tsTree.treeMethod) === null || _b === void 0 ? void 0 : _b.name);
    };
    ComplexityService.addBinaryCognitiveCpx = function (tsTree) {
        if (!(tsTree === null || tsTree === void 0 ? void 0 : tsTree.node) || !tsTree.parent.node) {
            return 0;
        }
        var complexity = 0;
        if (ast_service_1.Ast.isBinary(tsTree.node) && ast_service_1.Ast.isLogicDoor(tsTree.node)) {
            complexity = (ast_service_1.Ast.isSameOperatorToken(tsTree.node, tsTree.parent.node) && !ast_service_1.Ast.isOrTokenBetweenBinaries(tsTree.node)) ? 0 : 1;
        }
        return complexity;
    };
    ComplexityService.increasesCyclomaticComplexity = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.CaseClause:
                return (node).statements.length > 0;
            case ts.SyntaxKind.QuestionDotToken:
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.WhileStatement:
                return true;
            case ts.SyntaxKind.BinaryExpression:
                switch ((node).operatorToken.kind) {
                    case ts.SyntaxKind.BarBarToken:
                    case ts.SyntaxKind.AmpersandAmpersandToken:
                        return true;
                    default:
                        return false;
                }
            case ts.SyntaxKind.ConditionalExpression:
            default:
                return false;
        }
    };
    ComplexityService.increasesCognitiveComplexity = function (tsTree) {
        var _a, _b;
        if ((_a = tsTree === null || tsTree === void 0 ? void 0 : tsTree.node) === null || _a === void 0 ? void 0 : _a['elseStatement']) {
            return true;
        }
        switch ((_b = tsTree === null || tsTree === void 0 ? void 0 : tsTree.node) === null || _b === void 0 ? void 0 : _b.kind) {
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.SwitchStatement:
            case ts.SyntaxKind.WhileStatement:
                return true;
            case ts.SyntaxKind.BinaryExpression:
                return ComplexityService.addBinaryCognitiveCpx(tsTree) > 0;
            case ts.SyntaxKind.ConditionalExpression:
                return !ComplexityService.conditionalExpressionIsTrivial(tsTree);
            default:
                return false;
        }
    };
    return ComplexityService;
}());
exports.ComplexityService = ComplexityService;
