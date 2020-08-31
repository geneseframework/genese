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
            kind: node.name,
            name: node.name,
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
            kind: node.name,
            name: node.name,
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
            if ((_a = typeIdentifier.children) === null || _a === void 0 ? void 0 : _a.identifier) {
                JavaService.getAstNodeInfos(typeIdentifier.children.identifier, astNode);
            }
            annotationAstNode.children.push(astNode);
        });
        return annotationAstNode;
    }
}
exports.JavaService = JavaService;
