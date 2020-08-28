"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavaService = void 0;
const syntax_kind_enum_1 = require("../core/syntax-kind.enum");
/**
 * Service contains common functions
 */
class JavaService {
    /**
     * Gets the AstNode of Node
     * @param node // AST Node
     */
    static getAstNode(node) {
        let astNode = {
            end: node.location.endOffset,
            kind: node.location.image,
            name: node.location.image,
            pos: node.location.startOffset,
            start: node.location.startOffset
        };
        return astNode;
    }
    /**
     * @param  {Infos} infos
     * @param  {AstNodeInterface} astNode
     * @returns AstNodeInterface
     */
    static getAstNodeInfos(infos, astNode) {
        if (infos) {
            infos.forEach(info => {
                let childrenAstNode = {
                    end: info.endOffset,
                    kind: info.image,
                    name: info.image,
                    pos: info.startOffset,
                    start: info.startOffset
                };
                astNode.children.push(childrenAstNode);
            });
        }
        return astNode;
    }
    /**
     * Gets astNode with children
     * @param node // AST Node
     */
    static getAstNodeWithChildren(node) {
        let astNode = {
            end: node.location.endOffset,
            kind: node.location.name,
            name: node.location.image,
            pos: node.location.startOffset,
            start: node.location.startOffset
        };
        astNode.children = [];
        return astNode;
    }
    /**
     * Gets the lCurly Node
     * @param lCurly // AST Node
     */
    static getLCurly(lCurly, lCurlyAstNode) {
        let astNode = this.getAstNode(lCurly[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.LCurly;
        lCurlyAstNode.children.push(astNode);
        return lCurlyAstNode;
    }
    /**
     * Gets the rCurly Node
     * @param rCurly // AST Node
     */
    static getRCurly(rCurly, rCurlyAstNode) {
        let astNode = this.getAstNode(rCurly[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.RCurly;
        rCurlyAstNode.children.push(astNode);
        return rCurlyAstNode;
    }
    /**
     * Gets the identifier Node List
     * @param node // AST Node
     */
    static getIdentifier(node, identifierAstNode) {
        node.forEach(identifier => {
            let astNode = this.getAstNode(identifier);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.Identifier;
            identifierAstNode.children.push(astNode);
        });
        return identifierAstNode;
    }
    /**
     * @param  {Annotation[]} annotations
     * @param  {AstNodeInterface} annotationAstNode
     * @returns AstNodeInterface
     */
    static generateAstAnnotation(annotations, annotationAstNode) {
        annotations.forEach(annotation => {
            let astNode = JavaService.getAstNodeWithChildren(annotation);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.annotation;
            JavaService.generateAstAnnotationChildren(annotation.children, astNode);
            annotationAstNode.children.push(astNode);
        });
        return annotationAstNode;
    }
    /**
     * @param  {AnnotationChildren} annotationChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    static generateAstAnnotationChildren(annotationChildren, astNode) {
        if (annotationChildren) {
            JavaService.getAstNodeInfos(annotationChildren.at, astNode);
            JavaService.getAstNodeInfos(annotationChildren.typeName, astNode);
        }
    }
    /**
     * @param  {TypeIdentifier[]} typeIdentifierList
     * @param  {AstNodeInterface} annotationAstNode
     * @returns AstNodeInterface
     */
    static generateAstTypeIdentifier(typeIdentifierList, annotationAstNode) {
        typeIdentifierList.forEach(typeIdentifier => {
            var _a;
            let astNode = JavaService.getAstNodeWithChildren(typeIdentifier);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.annotation;
            //Identifiers
            if ((_a = typeIdentifier.children) === null || _a === void 0 ? void 0 : _a.Identifier) {
                JavaService.getAstNodeInfos(typeIdentifier.children.Identifier, astNode);
            }
            annotationAstNode.children.push(astNode);
        });
        return annotationAstNode;
    }
    /**
     * Gets the At Node
     * @param atNode // AST Node
     */
    static getAtNode(node) {
        let astNode = this.getAstNode(node[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.At;
        return astNode;
    }
    /**
     * Gets the typeNameNode Node
     * @param typeNameNode // AST Node
     */
    static getTypeNameNode(typeNameNode) {
        let astNode = this.getAstNodeWithChildren(typeNameNode[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.typeName;
        //Identifier
        if (typeNameNode[0].children.Identifier) {
            this.getIdentifier(typeNameNode[0].children.Identifier, astNode);
        }
        return astNode;
    }
    /**
     *
     * @param lBrace
     */
    static getLBrace(lBrace, lBraceAstNode) {
        let astNode = this.getAstNode(lBrace[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.LBrace;
        lBraceAstNode.children.push(astNode);
        return lBraceAstNode;
    }
    /**
     *
     * @param rBrace
     */
    static getRBrace(rBrace, rBraceAstNode) {
        let astNode = this.getAstNode(rBrace[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.RBrace;
        rBraceAstNode.children.push(astNode);
        return rBraceAstNode;
    }
    /**
     *
     * @param semicolon
     * @param semicolonAstNode
     */
    static getSemicolon(semicolon, semicolonAstNode) {
        let astNode = this.getAstNode(semicolon[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.semiColon;
        semicolonAstNode.children.push(astNode);
        return semicolonAstNode;
    }
    /**
     *
     * @param importNode
     * @param getImportAstNode
     */
    static getImport(importNode, importAstNode) {
        let astNode = this.getAstNode(importNode[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.import;
        importAstNode.children.push(astNode);
        return importAstNode;
    }
    /**
     *
     * @param child
     */
    static getModificatorAstNode(child) {
        let astNode = this.getAstNodeWithChildren(child);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.methodModifier;
        if (child.children.Public) {
            this.getModificator(child.children.Public[0], astNode);
        }
        else if (child.children.Private) {
            this.getModificator(child.children.Private[0], astNode);
        }
        else if (child.children.Static) {
            this.getModificator(child.children.Static[0], astNode);
        }
        else if (child.children.Protected) {
            this.getModificator(child.children.Protected[0], astNode);
        }
        return astNode;
    }
    /**
     *
     * @param node
     * @param modificatorAstNode
     */
    static getModificator(node, modificatorAstNode) {
        modificatorAstNode.children.push(this.getAstNode(node));
        return modificatorAstNode;
    }
}
exports.JavaService = JavaService;
