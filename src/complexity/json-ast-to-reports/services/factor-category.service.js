"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactorCategoryService = void 0;
const syntax_kind_enum_1 = require("../../core/enum/syntax-kind.enum");
const node_feature_enum_1 = require("../enums/node-feature.enum");
class FactorCategoryService {
    getNodeFeature(syntaxKind) {
        switch (syntaxKind) {
            case syntax_kind_enum_1.SyntaxKind.CaseClause:
            case syntax_kind_enum_1.SyntaxKind.FalseKeyword:
            case syntax_kind_enum_1.SyntaxKind.FirstLiteralToken:
            case syntax_kind_enum_1.SyntaxKind.Identifier:
            case syntax_kind_enum_1.SyntaxKind.Keyword:
            case syntax_kind_enum_1.SyntaxKind.Literal:
            case syntax_kind_enum_1.SyntaxKind.NumericLiteral:
            case syntax_kind_enum_1.SyntaxKind.ReturnStatement:
            case syntax_kind_enum_1.SyntaxKind.StringLiteral:
            case syntax_kind_enum_1.SyntaxKind.TrueKeyword:
            case syntax_kind_enum_1.SyntaxKind.VoidKeyword:
                return node_feature_enum_1.NodeFeature.ATOMIC;
            case syntax_kind_enum_1.SyntaxKind.BinaryExpression:
                return node_feature_enum_1.NodeFeature.BINARY;
            case syntax_kind_enum_1.SyntaxKind.CatchClause:
            case syntax_kind_enum_1.SyntaxKind.IfStatement:
            case syntax_kind_enum_1.SyntaxKind.SwitchStatement:
                return node_feature_enum_1.NodeFeature.CONDITIONAL;
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
                return node_feature_enum_1.NodeFeature.EMPTY;
        }
    }
}
exports.FactorCategoryService = FactorCategoryService;
