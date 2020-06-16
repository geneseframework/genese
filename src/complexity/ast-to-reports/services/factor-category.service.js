"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeFeatureService = void 0;
const syntax_kind_enum_1 = require("../../core/enum/syntax-kind.enum");
const node_feature_enum_1 = require("../enums/node-feature.enum");
class NodeFeatureService {
    getNodeFeature(syntaxKind) {
        switch (syntaxKind) {
            case syntax_kind_enum_1.SyntaxKind.FalseKeyword:
            case syntax_kind_enum_1.SyntaxKind.FirstLiteralToken:
            case syntax_kind_enum_1.SyntaxKind.NumericLiteral:
            case syntax_kind_enum_1.SyntaxKind.StringLiteral:
            case syntax_kind_enum_1.SyntaxKind.TrueKeyword:
                return node_feature_enum_1.NodeFeature.BASIC;
            case syntax_kind_enum_1.SyntaxKind.BinaryExpression:
                return node_feature_enum_1.NodeFeature.BINARY;
            case syntax_kind_enum_1.SyntaxKind.CatchClause:
            case syntax_kind_enum_1.SyntaxKind.IfStatement:
            case syntax_kind_enum_1.SyntaxKind.SwitchStatement:
                return node_feature_enum_1.NodeFeature.CONDITIONAL;
            case syntax_kind_enum_1.SyntaxKind.FunctionDeclaration:
            case syntax_kind_enum_1.SyntaxKind.MethodDeclaration:
                return node_feature_enum_1.NodeFeature.DECLARATION;
            case syntax_kind_enum_1.SyntaxKind.Block:
            case syntax_kind_enum_1.SyntaxKind.CallExpression:
            case syntax_kind_enum_1.SyntaxKind.ElementAccessExpression:
            case syntax_kind_enum_1.SyntaxKind.EndOfFileToken:
            case syntax_kind_enum_1.SyntaxKind.ExpressionStatement:
            case syntax_kind_enum_1.SyntaxKind.Parameter:
            case syntax_kind_enum_1.SyntaxKind.PropertyAccessExpression:
            case syntax_kind_enum_1.SyntaxKind.VariableDeclarationList:
            case syntax_kind_enum_1.SyntaxKind.VariableStatement:
                return node_feature_enum_1.NodeFeature.EMPTY;
            case syntax_kind_enum_1.SyntaxKind.ArrowFunction:
            case syntax_kind_enum_1.SyntaxKind.FunctionExpression:
                return node_feature_enum_1.NodeFeature.FUNC;
            case syntax_kind_enum_1.SyntaxKind.AmpersandAmpersandToken:
            case syntax_kind_enum_1.SyntaxKind.BarBarToken:
                return node_feature_enum_1.NodeFeature.LOGIC_DOOR;
            case syntax_kind_enum_1.SyntaxKind.DoStatement:
            case syntax_kind_enum_1.SyntaxKind.ForStatement:
            case syntax_kind_enum_1.SyntaxKind.ForInStatement:
            case syntax_kind_enum_1.SyntaxKind.ForOfStatement:
            case syntax_kind_enum_1.SyntaxKind.WhileStatement:
                return node_feature_enum_1.NodeFeature.LOOP;
            case syntax_kind_enum_1.SyntaxKind.RegularExpressionLiteral:
                return node_feature_enum_1.NodeFeature.REGEX;
            case syntax_kind_enum_1.SyntaxKind.ConditionalExpression:
                return node_feature_enum_1.NodeFeature.TERNARY;
            default:
                return node_feature_enum_1.NodeFeature.BASIC;
        }
    }
}
exports.NodeFeatureService = NodeFeatureService;
