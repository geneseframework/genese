"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstClassGenerationJavaService = void 0;
const syntax_kind_enum_1 = require("../core/syntax-kind.enum");
const java_service_1 = require("./java.service");
const ast_function_generation_java_service_1 = require("./ast-function-generation-java.service");
/**
 * - Generate AstNode for class from their Abstract Syntax Tree (AST)
 */
class AstClassGenerationJavaService {
    /**
     * Gets the classDeclaration Node List
     * @param  {ClassDeclaration[]} classDeclarationList
     * @param  {AstNodeInterface} classDeclarationAstNode
     * @returns AstNodeInterface
     */
    generate(classDeclarationList, classDeclarationAstNode) {
        classDeclarationList.forEach(classDeclaration => {
            let astNode = java_service_1.JavaService.getAstNodeWithChildren(classDeclaration);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.classDeclaration;
            this.generateAstClassChildren(classDeclaration.children, astNode);
            classDeclarationAstNode.children.push(astNode);
        });
        return classDeclarationAstNode;
    }
    /**
     * @param  {ClassDeclarationChildren} classDeclarationChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstClassChildren(classDeclarationChildren, astNode) {
        if (classDeclarationChildren) {
            this.generateAstClassModifier(classDeclarationChildren.classModifier, astNode);
            this.generateAstNormalClassDeclaration(classDeclarationChildren.normalClassDeclaration, astNode);
        }
    }
    /**
     * Gets the classModifier Node List
     * @param  {ClassModifier[]} classModifier
     * @param  {} classModifierAstNode
     * @returns AstNodeInterface
     */
    generateAstClassModifier(classModifierList, classModifierAstNode) {
        classModifierList.forEach(classModifier => {
            let astNode = java_service_1.JavaService.getAstNodeWithChildren(classModifier);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.classModifier;
            this.generateAstClassModifierChildren(classModifier.children, astNode);
            classModifierAstNode.children.push(astNode);
        });
        return classModifierAstNode;
    }
    /**
     * @param  {ClassModifierChildren} classModifierChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstClassModifierChildren(classModifierChildren, astNode) {
        if (classModifierChildren) {
            java_service_1.JavaService.generateAstAnnotation(classModifierChildren.annotation, astNode);
            java_service_1.JavaService.getAstNodeInfos(classModifierChildren.Public, astNode);
        }
    }
    /**
     * Gets the normalClass Node
     * @param  {} normalClass
     * @param  {} normalClassAstNode
     * @returns AstNodeInterface
     */
    generateAstNormalClassDeclaration(normalClassDeclaration, normalAstNode) {
        normalClassDeclaration.forEach(normalClass => {
            let astNode = java_service_1.JavaService.getAstNodeWithChildren(normalClass);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.normalClassDeclaration;
            this.generateAstClassTypeIdentifierClassBody(normalClass.children, astNode);
            normalAstNode.children.push(astNode);
        });
        return normalAstNode;
    }
    /**
     * @param  {NormalClassDeclarationChildren} normalClassDeclarationChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstClassTypeIdentifierClassBody(normalClassDeclarationChildren, astNode) {
        if (normalClassDeclarationChildren) {
            java_service_1.JavaService.getAstNodeInfos(normalClassDeclarationChildren.Class, astNode);
            java_service_1.JavaService.generateAstTypeIdentifier(normalClassDeclarationChildren.typeIdentifier, astNode);
            this.generateAstClassBody(normalClassDeclarationChildren.classBody, astNode);
        }
    }
    /**
     * Gets the Class Node
     * @param  {} normalClass
     * @param  {} normalClassAstNode
     * @returns AstNodeInterface
     */
    getNormalClass(normalClass, normalClassAstNode) {
        let astNode = java_service_1.JavaService.getAstNode(normalClass);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.Class;
        normalClassAstNode.children.push(astNode);
        return normalClassAstNode;
    }
    /**
     * @param  {ClassBody[]} classBodyList
     * @param  {AstNodeInterface} classBodyAstNode
     * @returns AstNodeInterface
     */
    generateAstClassBody(classBodyList, classBodyAstNode) {
        classBodyList.forEach(classBody => {
            let astNode = java_service_1.JavaService.getAstNodeWithChildren(classBody);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.classBody;
            this.generateAstClassBodyChildren(classBody.children, astNode);
            classBodyAstNode.children.push(astNode);
        });
        return classBodyAstNode;
    }
    /**
     * @param  {ClassBodyChildren} classBodyChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstClassBodyChildren(classBodyChildren, astNode) {
        if (classBodyChildren) {
            java_service_1.JavaService.getAstNodeInfos(classBodyChildren.LCurly, astNode);
            this.generateAstClassBodyDeclaration(classBodyChildren.classBodyDeclaration, astNode);
            java_service_1.JavaService.getAstNodeInfos(classBodyChildren.RCurly, astNode);
        }
    }
    /**
     * @param  {ClassBodyDeclaration[]} classBodyDeclarationList
     * @param  {AstNodeInterface} classBodyDeclarationAstNode
     * @returns AstNodeInterface
     */
    generateAstClassBodyDeclaration(classBodyDeclarationList, classBodyDeclarationAstNode) {
        classBodyDeclarationList.forEach(classBodyDeclaration => {
            let astNode = java_service_1.JavaService.getAstNodeWithChildren(classBodyDeclaration);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.classBodyDeclaration;
            if (classBodyDeclaration.children.classMemberDeclaration) {
                this.generateAstClassMemberDeclaration(classBodyDeclaration.children.classMemberDeclaration, astNode);
            }
            classBodyDeclarationAstNode.children.push(astNode);
        });
        return classBodyDeclarationAstNode;
    }
    /**
     * @param  {ClassMemberDeclaration[]} classMemberDeclarationList
     * @param  {AstNodeInterface} classMemberDeclarationAstNode
     * @returns AstNodeInterface
     */
    generateAstClassMemberDeclaration(classMemberDeclarationList, classMemberDeclarationAstNode) {
        classMemberDeclarationList.forEach(classMemberDeclaration => {
            let astNode = java_service_1.JavaService.getAstNodeWithChildren(classMemberDeclaration[0]);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.classMemberDeclaration;
            if (classMemberDeclaration.children.methodDeclaration) {
                new ast_function_generation_java_service_1.AstFunctionageGenerationJavaService().generate(classMemberDeclaration.children.methodDeclaration, astNode);
            }
            classMemberDeclarationAstNode.children.push(astNode);
        });
        return classMemberDeclarationAstNode;
    }
}
exports.AstClassGenerationJavaService = AstClassGenerationJavaService;
