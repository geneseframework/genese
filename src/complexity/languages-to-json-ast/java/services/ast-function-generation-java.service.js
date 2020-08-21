"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstFunctionageGenerationJavaService = void 0;
const syntax_kind_enum_1 = require("../core/syntax-kind.enum");
const java_service_1 = require("./java.service");
/**
 * - AstFunction generation from their Abstract Syntax Tree (AST)
 */
class AstFunctionageGenerationJavaService {
    /**
     * Gets the methodDeclaration Node
     * @param methodDeclaration // AST Node
     */
    generate(methodDeclaration, methodDeclarationAstNode) {
        let astNode = java_service_1.Java.getAstNodeWithChildren(methodDeclaration[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.methodDeclaration;
        //methodModifier
        if (methodDeclaration[0].children.methodModifier) {
            this.getMethodModifier(methodDeclaration[0].children.methodModifier, astNode);
        }
        //methodHeader
        if (methodDeclaration[0].children.methodHeader) {
            this.getMethodHeader(methodDeclaration[0].children.methodHeader, astNode);
        }
        //methodBody
        if (methodDeclaration[0].children.methodBody) {
            this.getMethodBody(methodDeclaration[0].children.methodBody, astNode);
        }
        methodDeclarationAstNode.children.push(astNode);
        return methodDeclarationAstNode;
    }
    /**
     * Gets the methodModifier Node List
     * @param methodModifier // AST Node
     */
    getMethodModifier(methodModifier, methodModifierAstNode) {
        //mapper
        methodModifier.forEach(child => {
            methodModifierAstNode.children.push(java_service_1.Java.getModificatorAstNode(child));
        });
        return methodModifierAstNode;
    }
    /**
     * Gets the methodHeader Node
     * @param methodHeader // AST Node
     */
    getMethodHeader(methodHeader, methodHeaderAstNode) {
        let astNode = java_service_1.Java.getAstNodeWithChildren(methodHeader[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.methodHeader;
        let headerChildren = methodHeader[0].children;
        //result
        if (headerChildren.result) {
            this.getResult(headerChildren.result, astNode);
        }
        //methodDeclarator
        if (headerChildren.methodDeclarator) {
            this.getMethodDeclarator(headerChildren.methodDeclarator, astNode);
        }
        methodHeaderAstNode.children.push(astNode);
        return methodHeaderAstNode;
    }
    /**
     * Gets the methodBody Node
     * @param methodBody // AST Node
     */
    getMethodBody(methodBody, methodBodyAstNode) {
        let astNode = java_service_1.Java.getAstNode(methodBody[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.methodDeclaration;
        methodBodyAstNode.children.push(astNode);
        return methodBodyAstNode;
    }
    /**
     *
     * @param result // AST Node
     */
    getResult(result, resultAstNode) {
        let astNode = java_service_1.Java.getAstNodeWithChildren(result[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.Result;
        //Void
        if (result[0].children.Void) {
            astNode.children.push(java_service_1.Java.getAstNode(result[0].children.Void));
        }
        resultAstNode.children.push(astNode);
        return resultAstNode;
    }
    /**
     *
     * @param methodDeclarator // AST Node
     */
    getMethodDeclarator(methodDeclarator, methodDeclaratorAstNode) {
        let astNode = java_service_1.Java.getAstNodeWithChildren(methodDeclarator[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.methodDeclarator;
        //Identifier
        if (methodDeclarator[0].children.Identifier) {
            java_service_1.Java.getIdentifier(methodDeclarator[0].children.Identifier, astNode);
        }
        //LBrace
        if (methodDeclarator[0].children.LBrace) {
            java_service_1.Java.getLBrace(methodDeclarator[0].children.LBrace, astNode);
        }
        //formalParameterList
        if (methodDeclarator[0].children.formalParameterList) {
            this.getFormalParameterList(methodDeclarator[0].children.formalParameterList, astNode);
        }
        //RBrace
        if (methodDeclarator[0].children.RBrace) {
            java_service_1.Java.getRBrace(methodDeclarator[0].children.RBrace, astNode);
        }
        methodDeclaratorAstNode.children.push(astNode);
        return methodDeclaratorAstNode;
    }
    /**
     *
     * @param formalParameterList
     */
    getFormalParameterList(formalParameterList, formalParameterAstNode) {
        let astNode = java_service_1.Java.getAstNodeWithChildren(formalParameterList[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.formalParameterList;
        //formalParameter
        if (formalParameterList[0].children.formalParameter) {
            this.getFormalParameter(formalParameterList[0].children.formalParameter);
        }
        formalParameterAstNode.children.push(astNode);
        return formalParameterAstNode;
    }
    /**
     *
     * @param formalParameter
     */
    getFormalParameter(formalParameter) {
        let astNode = java_service_1.Java.getAstNodeWithChildren(formalParameter[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.formalParameter;
        //variableParaRegularParameter
        if (formalParameter[0].variableParaRegularParameter) {
            this.getVariableParaRegularParameter(formalParameter[0].variableParaRegularParameter);
        }
        return astNode;
    }
    /**
     *
     * @param variableParaRegularParameter
     */
    getVariableParaRegularParameter(variableParaRegularParameter) {
        let astNode = java_service_1.Java.getAstNodeWithChildren(variableParaRegularParameter[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.variableParaRegularParameter;
        //unannType
        if (variableParaRegularParameter[0].children.unannType) {
            astNode.children.push(this.getUnannType(variableParaRegularParameter[0].children.unannType));
        }
        //variableDeclaratorId
        if (variableParaRegularParameter[0].children.variableDeclaratorId) {
            astNode.children.push(this.getVariableDeclaratorId(variableParaRegularParameter[0].children.variableDeclaratorId));
        }
        return astNode;
    }
    /**
     *
     * @param unannType
     */
    getUnannType(unannType) {
        let astNode = java_service_1.Java.getAstNodeWithChildren(unannType[0]);
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
        let astNode = java_service_1.Java.getAstNodeWithChildren(variableDeclaratorId[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.variableDeclaratorId;
        //Identifier
        if (variableDeclaratorId[0].children.Identifier) {
            java_service_1.Java.getIdentifier(variableDeclaratorId[0].children.Identifier, astNode);
        }
        return astNode;
    }
    /**
     *
     * @param unannReferenceType
     */
    getUnannReferenceType(unannReferenceType) {
        let astNode = java_service_1.Java.getAstNodeWithChildren(unannReferenceType[0]);
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
        let astNode = java_service_1.Java.getAstNodeWithChildren(unannClassType[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.unannClassType;
        //Identifier
        if (unannClassType[0].children.Identifier) {
            java_service_1.Java.getIdentifier(unannClassType[0].children.Identifier, astNode);
        }
        return astNode;
    }
}
exports.AstFunctionageGenerationJavaService = AstFunctionageGenerationJavaService;
