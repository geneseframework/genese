import * as ts from 'typescript';
import { NodeFeature } from '../enums/node-feature.enum';
import { CpxFactors } from '../models/cpx-factor/cpx-factors.model';
import { cpxFactors } from '../cpx-factors';

export class NodeFeatureService {


    getFeature(node: ts.Node): NodeFeature {
        if (!node) {
            return undefined;
        }
        switch (node.kind) {
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.FalseKeyword:
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.TrueKeyword:
                return NodeFeature.BASIC;
            // case ts.SyntaxKind.BinaryExpression:
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.ConditionalExpression:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.SwitchStatement:
                return NodeFeature.CONDITIONAL;
            case ts.SyntaxKind.Block:
            case ts.SyntaxKind.CallExpression:
            case ts.SyntaxKind.ExpressionStatement:
            case ts.SyntaxKind.Parameter:
            case ts.SyntaxKind.PropertyAccessExpression:
                return NodeFeature.EMPTY;
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.MethodDeclaration:
                return NodeFeature.FUNC;
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.WhileStatement:
                return NodeFeature.LOOP;
            case ts.SyntaxKind.RegularExpressionLiteral:
                return NodeFeature.REGEX;
            default:
                return NodeFeature.BASIC;
        }
    }


    getCpxFactors(nodeFeature: NodeFeature): CpxFactors {
        const cpxFact = new CpxFactors();
        cpxFact.basic.node = nodeFeature === NodeFeature.EMPTY ? 0 : cpxFactors.basic.node;
        switch (nodeFeature) {
            case NodeFeature.BASIC:
                break;
            case NodeFeature.CONDITIONAL:
                cpxFact.nesting.conditional = cpxFactors.nesting.conditional;
                cpxFact.structural.conditional = cpxFactors.structural.conditional;
                break;
            case NodeFeature.FUNC:
                cpxFact.nesting.func = cpxFactors.nesting.func;
                cpxFact.structural.func = cpxFactors.structural.func;
                break;
            case NodeFeature.LOOP:
                cpxFact.nesting.loop = cpxFactors.nesting.loop;
                cpxFact.structural.loop = cpxFactors.structural.loop;
                break;
            case NodeFeature.REGEX:
                cpxFact.structural.regex = cpxFactors.structural.regex;
                break;
        }
        return cpxFact;
    }

}
