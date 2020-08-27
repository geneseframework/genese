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
     * @param node // AST Node
     */
    generate(classDeclarationList, classDeclarationAstNode) {
        classDeclarationList.forEach(classDeclaration => {
            var _a, _b;
            let astNode = java_service_1.Java.getAstNodeWithChildren(classDeclaration);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.classDeclaration;
            //classModifier
            if ((_a = classDeclaration.children) === null || _a === void 0 ? void 0 : _a.classModifier) {
                this.getClassModifierList(classDeclaration.children.classModifier, astNode);
            }
            //normalClassDeclaration
            if ((_b = classDeclaration.children) === null || _b === void 0 ? void 0 : _b.normalClassDeclaration) {
                this.getNormalClassDeclaration(classDeclaration.children.normalClassDeclaration, astNode);
            }
            classDeclarationAstNode.children.push(astNode);
        });
        return classDeclarationAstNode;
    }
    /**
     * Gets the classModifier Node List
     * @param node // AST Node
     */
    getClassModifierList(classModifier, classModifierAstNode) {
        classModifier.forEach(child => {
            var _a, _b;
            let astNode = java_service_1.Java.getAstNodeWithChildren(child);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.classModifier;
            //annotation
            if ((_a = child.children) === null || _a === void 0 ? void 0 : _a.annotation) {
                java_service_1.Java.getAnnotation(child.children.annotation, astNode);
            }
            //Public
            else if ((_b = child.children) === null || _b === void 0 ? void 0 : _b.Public) {
                astNode.children.push(java_service_1.Java.getAstNode(child.children.Public));
            }
            classModifierAstNode.children.push(astNode);
        });
        return classModifierAstNode;
    }
    /**
     * Gets the normalClass Node
     * @param normalClass // AST Node
     */
    getNormalClassDeclaration(normalClass, normalClassAstNode) {
        let astNode = java_service_1.Java.getAstNodeWithChildren(normalClass[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.normalClassDeclaration;
        //Class
        if (normalClass[0].children.Class) {
            this.getNormalClass(normalClass[0].children.Class, astNode);
        }
        //typeIdentifier
        if (normalClass[0].children.typeIdentifier) {
            this.getTypeIdentifier(normalClass[0].children.typeIdentifier, astNode);
        }
        //classBody
        if (normalClass[0].children.classBody) {
            this.getClassBody(normalClass[0].children.classBody, astNode);
        }
        normalClassAstNode.children.push(astNode);
        return normalClassAstNode;
    }
    /**
     * Gets the Class Node
     * @param normalClass // AST Node
     */
    getNormalClass(normalClass, normalClassAstNode) {
        let astNode = java_service_1.Java.getAstNode(normalClass[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.Class;
        normalClassAstNode.children.push(astNode);
        return normalClassAstNode;
    }
    /**
     * Gets the typeIdentifier Node
     * @param typeIdentifier // AST Node
     */
    getTypeIdentifier(typeIdentifier, typeIdentifierAstNode) {
        let astNode = java_service_1.Java.getAstNodeWithChildren(typeIdentifier[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.typeIdentifier;
        //Identifier
        if (typeIdentifier[0].children.Identifier) {
            java_service_1.Java.getIdentifier(typeIdentifier[0].children.Identifier, astNode);
        }
        typeIdentifierAstNode.children.push(astNode);
        return typeIdentifierAstNode;
    }
    /**
 * Gets the classBody Node
 * @param classBody // AST Node
 */
    getClassBody(classBody, classBodyAstNode) {
        let astNode = java_service_1.Java.getAstNodeWithChildren(classBody[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.classBody;
        //LCurly
        java_service_1.Java.getLCurly(classBody[0].children.LCurly, astNode);
        //classBodyDeclaration
        if (classBody[0].children.classBodyDeclaration) {
            this.getClassBodyDeclaration(classBody[0].children.classBodyDeclaration, astNode);
        }
        //RCurly
        java_service_1.Java.getRCurly(classBody[0].children.RCurly, astNode);
        classBodyAstNode.children.push(astNode);
        return astNode;
    }
    /**
     * Gets the classBodyDeclaration Node List
     * @param classBodyDeclaration // AST Node
     */
    getClassBodyDeclaration(classBodyDeclaration, classBodyDeclarationAstNode) {
        classBodyDeclaration.forEach(child => {
            let astNode = java_service_1.Java.getAstNodeWithChildren(child);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.classBodyDeclaration;
            //classMemberDeclaration
            if (child.children.classMemberDeclaration) {
                this.getClassMemberDeclaration(child.children.classMemberDeclaration, astNode);
            }
            classBodyDeclarationAstNode.children.push(astNode);
        });
        return classBodyDeclarationAstNode;
    }
    /**
     * Gets the classMemberDeclaration Node
     * @param classMemberDeclaration // AST Node
     */
    getClassMemberDeclaration(classMemberDeclaration, classMemberDeclarationAstNode) {
        let astNode = java_service_1.Java.getAstNodeWithChildren(classMemberDeclaration[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.classMemberDeclaration;
        //methodDeclaration
        if (classMemberDeclaration[0].children.methodDeclaration) {
            new ast_function_generation_java_service_1.AstFunctionageGenerationJavaService().generate(classMemberDeclaration[0].children.methodDeclaration, astNode);
        }
        classMemberDeclarationAstNode.children.push(astNode);
        return classMemberDeclarationAstNode;
    }
}
exports.AstClassGenerationJavaService = AstClassGenerationJavaService;
