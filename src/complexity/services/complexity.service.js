"use strict";
exports.__esModule = true;
var ts = require("typescript");
var utils = require("tsutils");
var ast_service_1 = require("./ast.service");
/**
 * Service around complexity calculation
 */
var ComplexityService = /** @class */ (function () {
    function ComplexityService() {
    }
    // ---------------------------------------------------------------------------------------------------------
    //                                          Cognitive complexity
    // ---------------------------------------------------------------------------------------------------------
    /**
     * Returns the cognitive complexity of a Tree (the total of complexities of himself and its children)
     * @param tree      // The Tree to analyse
     */
    ComplexityService.getCognitiveComplexity = function (tree) {
        var complexity = 0;
        if (tree) {
            for (var _i = 0, _a = tree === null || tree === void 0 ? void 0 : tree.children; _i < _a.length; _i++) {
                var child = _a[_i];
                complexity += ComplexityService.calculateCognitiveComplexity(child);
                complexity += ComplexityService.getCognitiveComplexity(child);
            }
        }
        return complexity;
    };
    /**
     * Returns the cognitive complexity of a Tree himself (not its children)
     * @param tree      // The Tree to analyse
     */
    ComplexityService.calculateCognitiveComplexity = function (tree) {
        var _a;
        var complexity = 0;
        if (!(tree === null || tree === void 0 ? void 0 : tree.node) || (tree === null || tree === void 0 ? void 0 : tree.depth) === undefined) {
            return 0;
        }
        if ((_a = tree === null || tree === void 0 ? void 0 : tree.node) === null || _a === void 0 ? void 0 : _a['elseStatement']) {
            complexity++;
        }
        switch (tree.node.kind) {
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
                complexity += tree.depth + 1;
                break;
            case ts.SyntaxKind.BinaryExpression:
                complexity += ComplexityService.addBinaryCognitiveCpx(tree);
                break;
            case ts.SyntaxKind.PropertyAccessExpression:
                if (ComplexityService.isRecursion(tree, tree.node)) {
                    complexity++;
                }
                break;
            case ts.SyntaxKind.ConditionalExpression:
                complexity += ComplexityService.conditionalExpressionIsTrivial(tree.node) ? 0 : 1;
                break;
            default:
                complexity += 0;
        }
        return complexity;
    };
    /**
     * Checks if the AST node of a Tree increases the cognitive complexity
     * @param tsTree        // The Tree to check
     */
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
                return !ComplexityService.conditionalExpressionIsTrivial(tsTree.node);
            default:
                return false;
        }
    };
    /**
     * Returns the depth of a "block" inside a given AST node
     * For example, if on the line 2 the depth is equal to 1 and the line 3 is an IfStatement, the block inside the "if" will have a depth equal to 2.
     * @param node      // The node to check
     * @param depth     // The depth of the parent of the node
     */
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
    /**
     * Checks if an AST node of type ConditionalExpression (a ternary expression) is trivial, ie if the true case and the false case are only some literals
     * @param node      // The node to analyse
     */
    ComplexityService.conditionalExpressionIsTrivial = function (node) {
        return (ComplexityService.isLiteral(node === null || node === void 0 ? void 0 : node['whenTrue']) && ComplexityService.isLiteral(node === null || node === void 0 ? void 0 : node['whenFalse']));
    };
    /**
     * Checks if an AST node is a primitive (a string, a number or a boolean)
     * @param node      // The node to analyse
     */
    ComplexityService.isLiteral = function (node) {
        return (node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.StringLiteral
            || (node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.NumericLiteral
            || (node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.TrueKeyword
            || (node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.FalseKeyword;
    };
    /**
     * Checks if an AST node inside a method is a recursion, ie a call to this method.
     * The param "tree" must be a Tree which is a descendant of a method (ie a Tree with node of type MethodDescription)
     * @param tree      // The tree (inside a method)
     * @param node      // The node to analyse (a recursion or not)
     */
    ComplexityService.isRecursion = function (tree, node) {
        var _a, _b;
        return ((_a = node === null || node === void 0 ? void 0 : node['name']) === null || _a === void 0 ? void 0 : _a['escapedText']) === ((_b = tree === null || tree === void 0 ? void 0 : tree.treeMethod) === null || _b === void 0 ? void 0 : _b.name);
    };
    /**
     * Increases the cognitive complexity when there is a binary succeeding to a binary of different type
     * For example, the second && is not increasing the cognitive complexity :
     *      if (a && b && c)
     * but in the next example, the || will increase it because it succeeds to a binary of different type (a &&)
     *      if (a && b || c)
     * @param tree      // The Tree to analyse
     */
    ComplexityService.addBinaryCognitiveCpx = function (tree) {
        if (!(tree === null || tree === void 0 ? void 0 : tree.node) || !tree.parent.node) {
            return 0;
        }
        var complexity = 0;
        if (ast_service_1.Ast.isBinary(tree.node) && ast_service_1.Ast.isLogicDoor(tree.node)) {
            complexity = (ast_service_1.Ast.isSameOperatorToken(tree.node, tree.parent.node) && !ast_service_1.Ast.isOrTokenBetweenBinaries(tree.node)) ? 0 : 1;
        }
        return complexity;
    };
    // ---------------------------------------------------------------------------------------------------------
    //                                          Cyclomatic complexity
    // ---------------------------------------------------------------------------------------------------------
    /**
     * Returns the cyclomatic complexity of an AST node
     * @param node      // The AST node
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
    /**
     * Increases the cyclomatic complexity when the AST node must increase it
     * @param node      // The AST node
     */
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
    return ComplexityService;
}());
exports.ComplexityService = ComplexityService;
