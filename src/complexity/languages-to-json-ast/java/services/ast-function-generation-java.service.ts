import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { JavaService } from './java.service';
import { MethodDeclaration } from '../models/method-declaration.model';
import { MethodDeclarationChildren } from '../models/method-declaration-children.model';
import { MethodHeaderChildren } from '../models/method-header-children.model';
import { MethodDeclarator } from '../models/method-declarator.model';
import { MethodDeclaratorChildren } from '../models/method-declarator-children.model';
import { FormalParameterListChildren } from '../models/formal-parameter-list-children.model';
import { VariableParaRegularParameter } from '../models/variable-para-regular-parameter.model';
import { VariableParaRegularParameterChildren } from '../models/variable-para-regular-parameter-children.model';
import { MethodModifierChildren } from '../models/method-modifier-children.model';
import { Result } from '../models/result.model';
import { ResultChildren } from '../models/result-children.model';
import { MethodBodyChildren } from '../models/method-body-children.model';
import { UnannTypeChildren } from '../models/unann-type-children.model';
import { VariableDeclaratorIdChildren } from '../models/variable-declarator-id-children.model';
import { UnannReferenceTypeChildren } from '../models/unann-reference-type-children.model';
import { UnannClassOrInterfaceTypeChildren } from '../models/unann-class-or-interface-type-children.model';
import { DimsChildren } from '../models/dims-children.model';
import { UnannClassTypeChildren } from '../models/unann-class-type-children.model';
import { FormalParameterChildren } from '../models/formal-parameter-children.model';
import { BlockChildren } from '../models/block-children.model';
import { BlockStatementsChildren } from '../models/block-statements-children.model';
import { BlockStatementChildren } from '../models/block-statement-children.model';
import { StatementChildren } from '../models/statement-children.model';
import { ExpressionChildren } from '../models/expression-children.model';
import { IfStatementChildren } from '../models/if-statement-children.model';
import { SwitchStatementChildren } from '../models/switch-statement-children.model';
import { SwitchBlockChildren } from '../models/switch-block-children.model';
import { SwitchCaseChildren } from '../models/switch-case-children.model';
import { SwitchLabelChildren } from '../models/switch-label-children.model';
import { ConstantExpressionChildren } from '../models/constant-expression-children.model';
import { StatementWithoutTrailingSubstatementChildren } from '../models/statement-without-trailing-substatement-children.model';
import { TernaryExpressionChildren } from '../models/ternary-expression-children.model';
import { BinaryExpressionChildren } from '../models/binary-expression-children.model';
import { UnaryExpressionChildren } from '../models/unary-expression-children.model';
import { PrimaryChildren } from '../models/primary-children.model';
import { PrimaryPrefixChildren } from '../models/primary-prefix-children.model';
import { FqnOrRefTypeChildren } from '../models/fqn-or-ref-type-children.model';
import { FqnOrRefTypePartFirstChildren } from '../models/fqn-or-ref-type-part-first-children.model';
import { FqnOrRefTypePartCommonChildren } from '../models/fqn-or-ref-type-part-common-children.model';
import { LiteralChildren } from '../models/literal.children.model';
import { IntegerLiteralChildren } from '../models/integer-literal-children.model';
import { ExpressionStatementChildren } from '../models/expression-statement-children.model';
import { StatementExpressionChildren } from '../models/statement-expression-children.model';
import { UnannPrimitiveTypeChildren } from '../models/unann-primitive-type-children.model';
import { NumericTypeChildren } from '../models/numeric-type-children.model';
import { IntegralTypeChildren } from '../models/integral-type-children.model';
import { BooleanLiteralChildren } from '../models/boolean-literal-children.model';
import { ReturnStatementChildren } from '../models/return-statement-children.model';

/**
 * - AstFunction generation from their Abstract Syntax Tree (AST)
 */
export class AstFunctionageGenerationJavaService {
    
    /**
     * Generate AstNode for methodModifier
     * @param  {MethodDeclaration[]} methodDeclaration
     * @param  {AstNodeInterface} methodDeclarationAstNode
     * @returns AstNodeInterface
     */
    generate(methodDeclaration: MethodDeclaration[], methodDeclarationAstNode: AstNodeInterface): AstNodeInterface {
        return JavaService.generateAstNode(methodDeclaration, methodDeclarationAstNode, this.generateAstMethodDeclaration.bind(this));
    }

    /**
     * Generate AstNode for methodDeclarationChildren
     * @param  {MethodDeclarationChildren} methodDeclarationChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstMethodDeclaration(methodDeclarationChildren: MethodDeclarationChildren, astNode: AstNodeInterface): void {
        if(MethodDeclarationChildren) {
            JavaService.generateAstNode(methodDeclarationChildren.methodModifier, astNode, this.generateAstMethodModifierChildren.bind(this));
            JavaService.generateAstNode(methodDeclarationChildren.methodHeader, astNode, this.generateAstMethodHeaderChildren.bind(this));
            JavaService.generateAstNode(methodDeclarationChildren.methodBody, astNode, this.generateAstMethodBodyChildren.bind(this));
        }
    }

    /**
     * Generate AstNode for methodModifier children
     * @param  {MethodModifierChildren} methodModifierChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstMethodModifierChildren(methodModifierChildren: MethodModifierChildren, astNode: AstNodeInterface): void {
        if(methodModifierChildren) {
            JavaService.getAstNodeInfos(methodModifierChildren.Public, astNode);
            JavaService.getAstNodeInfos(methodModifierChildren.Private, astNode);
            JavaService.getAstNodeInfos(methodModifierChildren.Static, astNode);
            JavaService.getAstNodeInfos(methodModifierChildren.Protected, astNode);
        }
    }

    /**
     * Generate AstNode for methodHeader children
     * @param  {MethodHeaderChildren} methodHeaderChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstMethodHeaderChildren(methodHeaderChildren: MethodHeaderChildren, astNode: AstNodeInterface): void {
        if(methodHeaderChildren) {
            this.generateAstResult(methodHeaderChildren.result, astNode);
            this.generateAstMethodDeclarator(methodHeaderChildren.methodDeclarator, astNode);
        }
    }

    /**
     * Generate AstNode for methodBody children
     * @param  {MethodBodyChildren} methodBodyChildren
     * @param  {AstNodeInterface} methodBodyChildrenAstNode
     * @returns void
     */
    generateAstMethodBodyChildren(methodBodyChildren: MethodBodyChildren, methodBodyChildrenAstNode: AstNodeInterface): void {
        if(methodBodyChildren) {
            JavaService.generateAstNode(methodBodyChildren.block, methodBodyChildrenAstNode, this.generateAstBlockChildren.bind(this));
        }
    }

    /**
     * Generate AstNode for block children
     * @param  {BlockChildren} blockChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstBlockChildren(blockChildren: BlockChildren, astNode: AstNodeInterface): void {
        if(blockChildren) {
            JavaService.getAstNodeInfos(blockChildren.LCurly, astNode);
            JavaService.generateAstNode(blockChildren.blockStatements, astNode, this.generateAstBlockStatementsChildren.bind(this));
            JavaService.getAstNodeInfos(blockChildren.RCurly, astNode);
        }
    }

    /**
     * Generate AstNode for blockStatements children
     * @param  {BlockStatementsChildren} blockStatementsChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstBlockStatementsChildren(blockStatementsChildren: BlockStatementsChildren, astNode: AstNodeInterface): void {
        if(blockStatementsChildren) {
            JavaService.generateAstNode(blockStatementsChildren.blockStatement, astNode, this.generateAstBlockStatementChildren.bind(this));
        }
    }

    /**
     * Generate AstNode for blockStatement children
     * @param  {BlockStatementChildren} blockStatementChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstBlockStatementChildren(blockStatementChildren: BlockStatementChildren, astNode: AstNodeInterface): void {
        if(blockStatementChildren) {
            JavaService.generateAstNode(blockStatementChildren.statement, astNode, this.generateAstStatementChildren.bind(this));
        }
    }

    /**
     * Generate AstNode for statement children
     * @param  {StatementChildren} statementChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstStatementChildren(statementChildren: StatementChildren, astNode: AstNodeInterface): void {
        if(statementChildren) {
            JavaService.generateAstNode(statementChildren.ifStatement, astNode, this.generateAstIfStatementChildren.bind(this));
            JavaService.generateAstNode(statementChildren.statementWithoutTrailingSubstatement, astNode, this.generateAstStatementWithoutTrailingSubstatementChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for ifStatement children
     * @param  {any} ifStatementChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstIfStatementChildren(ifStatementChildren: IfStatementChildren, astNode: AstNodeInterface): void {
        if(ifStatementChildren) {
            JavaService.getAstNodeInfos(ifStatementChildren.If, astNode);
            JavaService.getAstNodeInfos(ifStatementChildren.LCurly, astNode);
            JavaService.generateAstNode(ifStatementChildren.expression, astNode, this.generateAstExpressionChildren.bind(this));
            JavaService.getAstNodeInfos(ifStatementChildren.RCurly, astNode);
            JavaService.generateAstNode(ifStatementChildren.statement, astNode, this.generateAstStatementChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for statementWithoutTrailingSubstatement children
     * @param  {SwitchStatementChildren} switchStatement
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstStatementWithoutTrailingSubstatementChildren(statementWithoutTrailingSubstatementChildren: StatementWithoutTrailingSubstatementChildren, astNode: AstNodeInterface): void {
        if(statementWithoutTrailingSubstatementChildren) {
            JavaService.generateAstNode(statementWithoutTrailingSubstatementChildren.switchStatement, astNode, this.generateAstSwitchStatementChildren.bind(this));
            JavaService.generateAstNode(statementWithoutTrailingSubstatementChildren.expressionStatement, astNode, this.generateAstExpressionStatementChildren.bind(this));
            JavaService.generateAstNode(statementWithoutTrailingSubstatementChildren.returnStatement, astNode, this.generateAstReturnStatementChildren.bind(this));
        }
    }

    /**
     * Generate AstNode for returnStatement children
     * @param  {ReturnStatementChildren} returnStatementChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstReturnStatementChildren(returnStatementChildren: ReturnStatementChildren, astNode: AstNodeInterface): void {
        if(returnStatementChildren) {
            JavaService.getAstNodeInfos(returnStatementChildren.Return, astNode);
            JavaService.generateAstNode(returnStatementChildren.expression, astNode, this.generateAstExpressionChildren.bind(this));
            JavaService.getAstNodeInfos(returnStatementChildren.Semicolon, astNode);
        }
    }
    
    /**
     * Generate AstNode for expressionStatement children
     * @param  {ExpressionStatementChildren} expressionStatementChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstExpressionStatementChildren(expressionStatementChildren: ExpressionStatementChildren, astNode: AstNodeInterface): void {
        if(expressionStatementChildren) {
            JavaService.generateAstNode(expressionStatementChildren.statementExpression, astNode, this.generateAstStatementExpressionChildren.bind(this));
            JavaService.getAstNodeInfos(expressionStatementChildren.Semicolon, astNode);
        }
    }
    
    /**
     * Generate AstNode for statementExpression children
     * @param  {StatementExpressionChildren} statementExpressionChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstStatementExpressionChildren(statementExpressionChildren: StatementExpressionChildren, astNode: AstNodeInterface): void {
        if(statementExpressionChildren) {
            JavaService.generateAstNode(statementExpressionChildren.expression, astNode, this.generateAstExpressionChildren.bind(this));
        }
    }

    /**
     * Generate AstNode for switchStatement children
     * @param  {SwitchStatementChildren} switchStatementChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstSwitchStatementChildren(switchStatementChildren: SwitchStatementChildren, astNode: AstNodeInterface): void {
        if(switchStatementChildren) {
            JavaService.getAstNodeInfos(switchStatementChildren.Switch, astNode);
            JavaService.getAstNodeInfos(switchStatementChildren.LBrace, astNode);
            JavaService.generateAstNode(switchStatementChildren.expression, astNode, this.generateAstExpressionChildren.bind(this));
            JavaService.getAstNodeInfos(switchStatementChildren.BBrace, astNode);
            JavaService.generateAstNode(switchStatementChildren.switchBlock, astNode, this.generateAstSwitchBlockChildren.bind(this));
        }
    }

    /**
     * Generate AstNode for switchBlock children
     * @param  {SwitchBlockChildren} switchBlockChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstSwitchBlockChildren(switchBlockChildren: SwitchBlockChildren, astNode: AstNodeInterface): void {
        if(switchBlockChildren) {
            JavaService.getAstNodeInfos(switchBlockChildren.LCurly, astNode);
            JavaService.generateAstNode(switchBlockChildren.switchCase, astNode, this.generateAstSwitchCaseChildren.bind(this));
            JavaService.getAstNodeInfos(switchBlockChildren.RCurly, astNode);
        }
    }
    
    /**
     * Generate AstNode for switchCase children
     * @param  {SwitchCaseChildren} switchCaseChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstSwitchCaseChildren(switchCaseChildren: SwitchCaseChildren, astNode: AstNodeInterface): void {
        if(switchCaseChildren) {
            JavaService.generateAstNode(switchCaseChildren.switchLabel, astNode, this.generateAstSwitchLabelChildren.bind(this));
            JavaService.generateAstNode(switchCaseChildren.blockStatements, astNode, this.generateAstBlockStatementsChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for switchLabel children
     * @param  {SwitchLabelChildren} switchLabelChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstSwitchLabelChildren(switchLabelChildren: SwitchLabelChildren, astNode: AstNodeInterface): void {
        if(switchLabelChildren) {
            JavaService.getAstNodeInfos(switchLabelChildren.Case, astNode);
            JavaService.generateAstNode(switchLabelChildren.constantExpression, astNode, this.generateAstConstantExpressionChildren.bind(this));
            JavaService.getAstNodeInfos(switchLabelChildren.Colon, astNode);
        }
    }
    
    /**
     * Generate AstNode for constantExpression children
     * @param  {ConstantExpressionChildren} constantExpressionChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstConstantExpressionChildren(constantExpressionChildren: ConstantExpressionChildren, astNode: AstNodeInterface): void {
        if(constantExpressionChildren) {
            JavaService.generateAstNode(constantExpressionChildren.expression, astNode, this.generateAstExpressionChildren.bind(this));
        }
    }

    /**
     * Generate AstNode for expression children
     * @param  {ExpressionChildren} expressionChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstExpressionChildren(expressionChildren: ExpressionChildren, astNode: AstNodeInterface): void {
        if(expressionChildren) {
            JavaService.generateAstNode(expressionChildren.ternaryExpression, astNode, this.generateAstTernaryExpressionChildren.bind(this));
        }
    }

    /**
     * Generate AstNode for ternaryExpression children
     * @param  {TernaryExpressionChildren} ternaryExpressionChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstTernaryExpressionChildren(ternaryExpressionChildren: TernaryExpressionChildren, astNode: AstNodeInterface): void {
        if(ternaryExpressionChildren) {
            JavaService.generateAstNode(ternaryExpressionChildren.binaryExpression, astNode, this.generateAstBinaryExpressionChildren.bind(this));
        }
    }

    /**
     * Generate AstNode for binaryExpression children
     * @param  {BinaryExpressionChildren} binaryExpressionChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstBinaryExpressionChildren(binaryExpressionChildren: BinaryExpressionChildren, astNode: AstNodeInterface): void {
        if(binaryExpressionChildren) {
            JavaService.getAstNodeInfos(binaryExpressionChildren.AssignmentOperator, astNode);
            JavaService.generateAstNode(binaryExpressionChildren.unaryExpression, astNode, this.generateAstUnaryExpressionChildren.bind(this));
            JavaService.getAstNodeInfos(binaryExpressionChildren.BinaryOperator, astNode);
            JavaService.generateAstNode(binaryExpressionChildren.expression, astNode, this.generateAstExpressionChildren.bind(this));

        }
    }

    /**
     * Generate AstNode for unaryExpression children
     * @param  {UnaryExpressionChildren} unaryExpressionChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstUnaryExpressionChildren(unaryExpressionChildren: UnaryExpressionChildren, astNode: AstNodeInterface): void {
        if(unaryExpressionChildren) {
            JavaService.generateAstNode(unaryExpressionChildren.primary, astNode, this.generateAstPrimaryChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for primary children
     * @param  {PrimaryChildren} primaryChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstPrimaryChildren(primaryChildren: PrimaryChildren, astNode: AstNodeInterface): void {
        if(primaryChildren) {
            JavaService.generateAstNode(primaryChildren.primaryPrefix, astNode, this.generateAstPrimaryPrefixChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for primaryPrefix children
     * @param  {PrimaryPrefixChildren} primaryPrefixChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstPrimaryPrefixChildren(primaryPrefixChildren: PrimaryPrefixChildren, astNode: AstNodeInterface): void {
        if(primaryPrefixChildren) {
            JavaService.generateAstNode(primaryPrefixChildren.fqnOrRefType, astNode, this.generateAstFqnOrRefTypeChildren.bind(this));
            JavaService.generateAstNode(primaryPrefixChildren.literal, astNode, this.generateAstLiteralChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for literal children
     * @param  {LiteralChildren} literalChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstLiteralChildren(literalChildren: LiteralChildren, astNode: AstNodeInterface): void {
        if(literalChildren) {
            JavaService.generateAstNode(literalChildren.integerLiteral, astNode, this.generateAstIntegerLiteralChildren.bind(this));
            JavaService.generateAstNode(literalChildren.booleanLiteral, astNode, this.generateAstBooleanLiteralChildren.bind(this));
        }
    }

    /**
     * Generate AstNode for integerLiteral children
     * @param  {IntegerLiteralChildren} integerLiteralChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstIntegerLiteralChildren(integerLiteralChildren: IntegerLiteralChildren, astNode: AstNodeInterface): void {
        if(integerLiteralChildren) {
            JavaService.getAstNodeInfos(integerLiteralChildren.DecimalLiteral, astNode);
        }
    }
    
    /**
     * Generate AstNode for booleanLiteral children
     * @param  {BooleanLiteralChildren} booleanLiteralChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstBooleanLiteralChildren(booleanLiteralChildren: BooleanLiteralChildren, astNode: AstNodeInterface): void {
        if(booleanLiteralChildren) {
            JavaService.getAstNodeInfos(booleanLiteralChildren.True, astNode);
        }
    }

    /**
     * Generate AstNode for fqnOrRefType children
     * @param  {FqnOrRefTypeChildren} fqnOrRefTypeChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstFqnOrRefTypeChildren(fqnOrRefTypeChildren: FqnOrRefTypeChildren, astNode: AstNodeInterface): void {
        if(fqnOrRefTypeChildren) {
            JavaService.generateAstNode(fqnOrRefTypeChildren.fqnOrRefTypePartFirst, astNode, this.generateAstFqnOrRefTypePartFirstChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for fqnOrRefTypePartFirst children
     * @param  {FqnOrRefTypePartFirstChildren} fqnOrRefTypePartFirstChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstFqnOrRefTypePartFirstChildren(fqnOrRefTypePartFirstChildren: FqnOrRefTypePartFirstChildren, astNode: AstNodeInterface): void {
        if(fqnOrRefTypePartFirstChildren) {
            JavaService.generateAstNode(fqnOrRefTypePartFirstChildren.fqnOrRefTypePartCommon, astNode, this.generateAstFqnOrRefTypePartCommonChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for fqnOrRefTypePartCommon children
     * @param  {FqnOrRefTypePartCommonChildren} fqnOrRefTypePartCommonChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstFqnOrRefTypePartCommonChildren(fqnOrRefTypePartCommonChildren: FqnOrRefTypePartCommonChildren, astNode: AstNodeInterface): void {
        if(fqnOrRefTypePartCommonChildren) {
            JavaService.getAstNodeInfos(fqnOrRefTypePartCommonChildren.Identifier, astNode);
        }
    }

    /**
     * Generate AstNode for result
     * @param  {Result} result
     * @param  {AstNodeInterface} resultAstNode
     * @returns void
     */
    generateAstResult(result: Result[], resultAstNode: AstNodeInterface): AstNodeInterface {
        return JavaService.generateAstNode(result, resultAstNode, this.generateAstResultChildren.bind(this));
    }
    
    /**
     * Generate AstNode for result children
     * @param  {Result} result
     * @param  {AstNodeInterface} resultAstNode
     * @returns void
     */
    generateAstResultChildren(resultChildren: ResultChildren, astNode: AstNodeInterface): void {
        if(resultChildren) {
            JavaService.getAstNodeInfos(resultChildren.Void, astNode);
        }
    }
    
    /**
     * Generate AstNode for methodDeclarator
     * @param  {MethodDeclarator[]} methodDeclarator
     * @param  {} methodDeclaratorAstNode
     * @returns AstNodeInterface
     */
    generateAstMethodDeclarator(methodDeclarator: MethodDeclarator[], methodDeclaratorAstNode): AstNodeInterface {
        return JavaService.generateAstNode(methodDeclarator, methodDeclaratorAstNode, this.generateAstMethodDeclaratorChildren.bind(this));
    }
    
    /**
     * Generate AstNode for methodDeclarator children
     * @param  {MethodDeclaratorChildren} methodDeclaratorChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstMethodDeclaratorChildren(methodDeclaratorChildren: MethodDeclaratorChildren,astNode: AstNodeInterface): void {
        if(methodDeclaratorChildren) {
            JavaService.getAstNodeInfos(methodDeclaratorChildren.Identifier, astNode);
            JavaService.getAstNodeInfos(methodDeclaratorChildren.LBrace, astNode);
            JavaService.generateAstNode(methodDeclaratorChildren.formalParameterList, astNode, this.generateAstFormalParameterListChildren.bind(this));
            JavaService.getAstNodeInfos(methodDeclaratorChildren.RBrace, astNode);
        }
    }
    
    /**
     * Generate AstNode for FormalParameterList children
     * @param  {FormalParameterListChildren} formalParameterListChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstFormalParameterListChildren(formalParameterListChildren: FormalParameterListChildren, astNode: AstNodeInterface): void {
        if(formalParameterListChildren) {
            JavaService.generateAstNode(formalParameterListChildren.formalParameter, astNode, this.generateAstFormalParameterChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for formalParameter children
     * @param  {FormalParameterChildren} formalParameterChildren
     * @param  {AstNodeInterface} formalParameterAstNode
     * @returns void
     */
    generateAstFormalParameterChildren(formalParameterChildren: FormalParameterChildren, formalParameterAstNode: AstNodeInterface): void {
        if(formalParameterChildren) {
            JavaService.generateAstNode(formalParameterChildren.variableParaRegularParameter, formalParameterAstNode, this.generateAstVariableParaRegularParameterChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for VariableParaRegularParameter
     * @param  {VariableParaRegularParameter[]} variableParaRegularParameterList
     * @param  {AstNodeInterface} vPRPAstNode
     * @returns AstNodeInterface
     */
    generateAstVariableParaRegularParameter(variableParaRegularParameterList: VariableParaRegularParameter[], vPRPAstNode: AstNodeInterface): AstNodeInterface {
        return JavaService.generateAstNode(variableParaRegularParameterList, vPRPAstNode, this.generateAstFormalParameterListChildren.bind(this));
    }

    /**
     * Generate AstNode for VariableParaRegularParameter children
     * @param  {VariableParaRegularParameterChildren} variableParaRegularParameterChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstVariableParaRegularParameterChildren(variableParaRegularParameterChildren: VariableParaRegularParameterChildren, astNode: AstNodeInterface): void {
        if(variableParaRegularParameterChildren) {
            JavaService.generateAstNode(variableParaRegularParameterChildren.unannType, astNode, this.generateAstUnannTypeChildren.bind(this));
            JavaService.generateAstNode(variableParaRegularParameterChildren.variableDeclaratorId, astNode, this.generateAstVariableDeclaratorIdChildren.bind(this));
        }
    }

    /**
     * Generate AstNode for unannType children
     * @param  {UnannTypeChildren} unannTypeChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstUnannTypeChildren(unannTypeChildren: UnannTypeChildren, astNode: AstNodeInterface): void {
        if(unannTypeChildren) {
            JavaService.generateAstNode(unannTypeChildren.unannReferenceType, astNode, this.generateAstUnannReferenceTypeChildren.bind(this));
            JavaService.generateAstNode(unannTypeChildren.unannPrimitiveType, astNode, this.generateAstUnannPrimitiveTypeChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for unannPrimitiveType children
     * @param  {UnannPrimitiveTypeChildren} unannPrimitiveTypeChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstUnannPrimitiveTypeChildren(unannPrimitiveTypeChildren: UnannPrimitiveTypeChildren, astNode: AstNodeInterface): void {
        if(unannPrimitiveTypeChildren) {
            JavaService.generateAstNode(unannPrimitiveTypeChildren.numericType, astNode, this.generateAstNumericTypeChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for numericType children
     * @param  {NumericTypeChildren} numericTypeChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstNumericTypeChildren(numericTypeChildren: NumericTypeChildren, astNode: AstNodeInterface): void {
        if(numericTypeChildren) {
            JavaService.generateAstNode(numericTypeChildren.integralType, astNode, this.generateAstIntegralTypeChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for integralType children
     * @param  {IntegralTypeChildren} integralTypeChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstIntegralTypeChildren(integralTypeChildren: IntegralTypeChildren, astNode: AstNodeInterface): void {
        if(integralTypeChildren) {
            JavaService.getAstNodeInfos(integralTypeChildren.Int, astNode);
        }
    }

    /**
     * Generate AstNode for unannReferenceType children
     * @param  {UnannReferenceTypeChildren} unannReferenceTypeChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstUnannReferenceTypeChildren(unannReferenceTypeChildren: UnannReferenceTypeChildren, astNode: AstNodeInterface): void {
        if(unannReferenceTypeChildren) {
            JavaService.generateAstNode(unannReferenceTypeChildren.unannClassOrInterfaceType, astNode, this.generateAstUnannClassOrInterfaceTypeChildren.bind(this));
            JavaService.generateAstNode(unannReferenceTypeChildren.dims, astNode, this.generateAstDimsChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for unannClassOrInterfaceType children
     * @param  {UnannClassOrInterfaceTypeChildren} unannClassOrInterfaceTypeChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstUnannClassOrInterfaceTypeChildren(unannClassOrInterfaceTypeChildren: UnannClassOrInterfaceTypeChildren, astNode: AstNodeInterface): void {
        if(unannClassOrInterfaceTypeChildren) {
            JavaService.generateAstNode(unannClassOrInterfaceTypeChildren.unannClassType, astNode, this.generateAstUnannClassTypeChildren.bind(this));
        }
    }
    
    /**
     * Generate AstNode for unannClassType children
     * @param  {UnannClassTypeChildren} unannClassTypeChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstUnannClassTypeChildren(unannClassTypeChildren: UnannClassTypeChildren, astNode: AstNodeInterface): void {
        if(unannClassTypeChildren) {
            JavaService.getAstNodeInfos(unannClassTypeChildren.Identifier, astNode);
        }
    }
    
    /**
     * Generate AstNode for dims children
     * @param  {DimsChildren} dimsChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstDimsChildren(dimsChildren: DimsChildren, astNode: AstNodeInterface): void {
        if(dimsChildren) {
            JavaService.getAstNodeInfos(dimsChildren.LSquare, astNode);
            JavaService.getAstNodeInfos(dimsChildren.RSquare, astNode);
        }
    }

    /**
     * Generate AstNode for variableDeclaratorId children
     * @param  {VariableDeclaratorIdChildren} variableDeclaratorIdChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstVariableDeclaratorIdChildren(variableDeclaratorIdChildren: VariableDeclaratorIdChildren, astNode: AstNodeInterface): void {
        if(variableDeclaratorIdChildren) {
            JavaService.getAstNodeInfos(variableDeclaratorIdChildren.Identifier, astNode);
        }
    }
    
}
