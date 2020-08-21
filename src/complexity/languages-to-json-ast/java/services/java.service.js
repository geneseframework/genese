"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Java = void 0;
const syntax_kind_enum_1 = require("../core/syntax-kind.enum");
/**
 * Service contains common functions
 */
class Java {
    /**
     * Gets the AstNode of Node
     * @param node // AST Node
     */
    static getAstNode(node) {
        let astNode = {
            end: node.endOffset,
            kind: node.image,
            name: node.image,
            pos: node.startOffset,
            start: node.startOffset
        };
        return astNode;
    }
    /**
     * Gets astNode with children
     * @param node // AST Node
     */
    static getAstNodeWithChildren(node) {
        let astNode = {
            end: node.endOffset,
            kind: node.name,
            name: node.image,
            pos: node.startOffset,
            start: node.startOffset
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
     * Gets the annotation Node
     * @param annotation // AST Node
     */
    static getAnnotation(annotation, annotationAstNode) {
        let astNode = this.getAstNodeWithChildren(annotation[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.annotation;
        //At
        let atNode = this.getAtNode(annotation[0].children.At);
        astNode.children.push(atNode);
        //TypeName
        let typeNameNode = this.getTypeNameNode(annotation[0].children.typeName);
        astNode.children.push(typeNameNode);
        annotationAstNode.children.push(astNode);
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
     * @param child
     */
    static getModificatorAstNode(child) {
        let astNode = Java.getAstNodeWithChildren(child);
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
exports.Java = Java;
