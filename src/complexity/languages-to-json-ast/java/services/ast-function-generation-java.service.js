"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstFunctionageGenerationJavaService = void 0;
const syntax_kind_enum_1 = require("../core/syntax-kind.enum");
const java_service_1 = require("./java.service");
const method_declaration_children_model_1 = require("../models/method-declaration-children.model");
/**
 * - AstFunction generation from their Abstract Syntax Tree (AST)
 */
class AstFunctionageGenerationJavaService {
    /**
     * Gets the methodDeclaration Node
     * @param methodDeclaration // AST Node
     */
    generate(methodDeclarationList, methodDeclarationAstNode) {
        methodDeclarationList.forEach(methodDeclaration => {
            let astNode = java_service_1.JavaService.getAstNodeWithChildren(methodDeclaration);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.methodDeclaration;
            this.generateAstMethodDeclaration(methodDeclaration.children, astNode);
            methodDeclarationAstNode.children.push(astNode);
        });
        return methodDeclarationAstNode;
    }
    /**
     * @param  {MethodDeclarationChildren} methodDeclarationChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstMethodDeclaration(methodDeclarationChildren, astNode) {
        if (method_declaration_children_model_1.MethodDeclarationChildren) {
            this.generateAstMethodModifier(methodDeclarationChildren.methodModifier, astNode);
            this.generateAstMethodHeader(methodDeclarationChildren.methodHeader, astNode);
            this.generateAstMethodBody(methodDeclarationChildren.methodBody, astNode);
        }
    }
    /**
     * Gets the methodModifier Node List
     * @param methodModifier // AST Node
     */
    generateAstMethodModifier(methodModifierList, astNodeMethodModifier) {
        methodModifierList.forEach(methodModifier => {
            let astNode = java_service_1.JavaService.getAstNodeWithChildren(methodModifier);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.methodModifier;
        });
        return astNodeMethodModifier;
    }
    /**
     * Gets the methodHeader Node
     * @param methodHeader // AST Node
     */
    generateAstMethodHeader(methodHeaderList, methodHeaderAstNode) {
        methodHeaderList.forEach(methodHeader => {
            let astNode = java_service_1.JavaService.getAstNodeWithChildren(methodHeader);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.methodHeader;
            this.generateAstMethodHeaderChildren(methodHeader.children, astNode);
            methodHeaderAstNode.children.push(astNode);
        });
        return methodHeaderAstNode;
    }
    /**
     * @param  {MethodHeaderChildren} methodHeaderChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstMethodHeaderChildren(methodHeaderChildren, astNode) {
        if (methodHeaderChildren) {
            //this.getResult(methodHeader.children.result, astNode);
            this.generateAstMethodDeclarator(methodHeaderChildren.methodDeclarator, astNode);
        }
    }
    /**
     * Gets the methodBody Node
     * @param methodBody // AST Node
     */
    generateAstMethodBody(methodBody, methodBodyAstNode) {
        let astNode = java_service_1.JavaService.getAstNode(methodBody[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.methodDeclaration;
        methodBodyAstNode.children.push(astNode);
        return methodBodyAstNode;
    }
    /**
     *
     * @param result // AST Node
     */
    getResult(result, resultAstNode) {
        let astNode = java_service_1.JavaService.getAstNodeWithChildren(result[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.Result;
        if (result[0].children.Void) {
            astNode.children.push(java_service_1.JavaService.getAstNode(result[0].children.Void));
        }
        resultAstNode.children.push(astNode);
        return resultAstNode;
    }
    /**
     * @param  {MethodDeclarator[]} methodDeclaratorList
     * @param  {} methodDeclaratorAstNode
     * @returns AstNodeInterface
     */
    generateAstMethodDeclarator(methodDeclaratorList, methodDeclaratorAstNode) {
        methodDeclaratorList.forEach(methodDeclarator => {
            let astNode = java_service_1.JavaService.getAstNodeWithChildren(methodDeclarator[0]);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.methodDeclarator;
            this.generateAstMethodDeclaratorChildren(methodDeclarator.children, astNode);
            methodDeclaratorAstNode.children.push(astNode);
        });
        return methodDeclaratorAstNode;
    }
    /**
     * @param  {MethodDeclaratorChildren} methodDeclaratorChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstMethodDeclaratorChildren(methodDeclaratorChildren, astNode) {
        if (methodDeclaratorChildren) {
            java_service_1.JavaService.getAstNodeInfos(methodDeclaratorChildren.Identifier, astNode);
            java_service_1.JavaService.getAstNodeInfos(methodDeclaratorChildren.LBrace, astNode);
            this.generateAstFormalParameterList(methodDeclaratorChildren.formalParameterList, astNode);
            java_service_1.JavaService.getAstNodeInfos(methodDeclaratorChildren.RBrace, astNode);
        }
    }
    /**
     * @param  {} formalParameterList
     * @param  {} formalParameterAstNode
     * @returns AstNodeInterface
     */
    generateAstFormalParameterList(formalParameterList, formalParameterAstNode) {
        formalParameterList.forEach(formalParameter => {
            let astNode = java_service_1.JavaService.getAstNodeWithChildren(formalParameter);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.formalParameter;
            if (formalParameter.children) {
                this.generateAstFormalParameter(formalParameter.children, astNode);
            }
            formalParameterAstNode.children.push(astNode);
        });
        return formalParameterAstNode;
    }
    /**
     * @param  {FormalParameterListChildren} formalParameterListChildren
     * @param  {AstNodeInterface} formalParameterAstNode
     * @returns AstNodeInterface
     */
    generateAstFormalParameter(formalParameterListChildren, formalParameterAstNode) {
        if (formalParameterListChildren === null || formalParameterListChildren === void 0 ? void 0 : formalParameterListChildren.formalParameter) {
            formalParameterListChildren.formalParameter.forEach(child => {
                var _a;
                let astNode = java_service_1.JavaService.getAstNodeWithChildren(formalParameterListChildren.formalParameter);
                astNode.kind = syntax_kind_enum_1.SyntaxKind.formalParameter;
                if ((_a = child.children) === null || _a === void 0 ? void 0 : _a.variableParaRegularParameter) {
                    this.generateAstVariableParaRegularParameter(child.children.variableParaRegularParameter, astNode);
                }
                formalParameterAstNode.children.push(astNode);
            });
        }
        return formalParameterAstNode;
    }
    /**
     * @param  {VariableParaRegularParameter[]} variableParaRegularParameterList
     * @param  {AstNodeInterface} vPRPAstNode
     * @returns AstNodeInterface
     */
    generateAstVariableParaRegularParameter(variableParaRegularParameterList, vPRPAstNode) {
        variableParaRegularParameterList.forEach(variableParaRegularParameter => {
            let astNode = java_service_1.JavaService.getAstNodeWithChildren(variableParaRegularParameter);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.variableParaRegularParameter;
            this.generateAstVariableParaRegularParameterChildren(variableParaRegularParameter.children, astNode);
            vPRPAstNode.children.push(astNode);
        });
        return vPRPAstNode;
    }
    /**
     * @param  {VariableParaRegularParameterChildren} variableParaRegularParameterChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstVariableParaRegularParameterChildren(variableParaRegularParameterChildren, astNode) {
        if (variableParaRegularParameterChildren) {
            java_service_1.JavaService.getAstNodeInfos(variableParaRegularParameterChildren.unannType, astNode);
            java_service_1.JavaService.getAstNodeInfos(variableParaRegularParameterChildren.variableDeclaratorId, astNode);
        }
    }
    /**
     *
     * @param unannType
     */
    getUnannType(unannType) {
        let astNode = java_service_1.JavaService.getAstNodeWithChildren(unannType[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.unannType;
        //unannReferenceType
        if (unannType[0].children.unannReferenceType) {
            astNode.children.push(this.getUnannReferenceType(unannType[0].children.unannReferenceType));
        }
        return astNode;
    }
    /**
     *
     * @param variableDeclaratorId
     */
    getVariableDeclaratorId(variableDeclaratorId) {
        let astNode = java_service_1.JavaService.getAstNodeWithChildren(variableDeclaratorId[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.variableDeclaratorId;
        //Identifier
        if (variableDeclaratorId[0].children.Identifier) {
            java_service_1.JavaService.getIdentifier(variableDeclaratorId[0].children.Identifier, astNode);
        }
        return astNode;
    }
    /**
     *
     * @param unannReferenceType
     */
    getUnannReferenceType(unannReferenceType) {
        let astNode = java_service_1.JavaService.getAstNodeWithChildren(unannReferenceType[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.unannReferenceType;
        //unannClassType
        if (unannReferenceType[0].children.unannClassType) {
            astNode.children.push(this.getUnannClassType(unannReferenceType[0].children.unannClassType));
        }
        return astNode;
    }
    /**
     *
     * @param unannClassType
     */
    getUnannClassType(unannClassType) {
        let astNode = java_service_1.JavaService.getAstNodeWithChildren(unannClassType[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.unannClassType;
        //Identifier
        if (unannClassType[0].children.Identifier) {
            java_service_1.JavaService.getIdentifier(unannClassType[0].children.Identifier, astNode);
        }
        return astNode;
    }
}
exports.AstFunctionageGenerationJavaService = AstFunctionageGenerationJavaService;
