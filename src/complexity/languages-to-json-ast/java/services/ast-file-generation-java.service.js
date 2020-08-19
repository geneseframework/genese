"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstFileGenerationJavaService = void 0;
const file_service_1 = require("../../../core/services/file.service");
const syntax_kind_enum_1 = require("../../../core/enum/java/syntax-kind.enum");
const java_parser_1 = require("java-parser");
const fs = require("fs-extra");
/**
 * - AstFiles generation from their Abstract Syntax Tree (AST)
 */
class AstFileGenerationJavaService {
    /**
     * Generates the AstFile corresponding to a given path and a given AstFolder
     * @param path          // The path of the file
     * @param astFolder     // The AstFolder containing the AstFile
     */
    generate(path, astFolder) {
        if (!path || !astFolder) {
            console.warn('No path or AstFolder : impossible to create AstFile');
            return undefined;
        }
        const fileContent = fs.readFileSync(path, 'utf8');
        const parsedFile = java_parser_1.parse(fileContent);
        return {
            name: file_service_1.getFilename(path),
            text: fileContent,
            astNode: this.createAstNodeChildren(parsedFile)
        };
    }
    /**
     * Returns the Node children of a given Node
     * @param node      // The Node to analyse
     */
    createAstNodeChildren(node) {
        let astNode;
        if (node.children.ordinaryCompilationUnit !== undefined) {
            const ordinaryCompilationUnit = node.children.ordinaryCompilationUnit[0];
            const children = ordinaryCompilationUnit.children;
            astNode = {
                end: ordinaryCompilationUnit.location.endOffset,
                kind: syntax_kind_enum_1.SyntaxKind.SourceFile,
                name: ordinaryCompilationUnit.name,
                pos: ordinaryCompilationUnit.location.startOffset,
                start: ordinaryCompilationUnit.location.startOffset
            };
            astNode.children = [];
            //Generate package
            if (children.packageDeclaration) {
                astNode.children.push(this.createAstPackageNodeChildren(children.packageDeclaration[0]));
            }
            //Generate Import nodes
            if (children.importDeclaration) {
                let importList = this.createAstImportNodeChildren(children.importDeclaration);
                importList.forEach(imp => {
                    astNode.children.push(imp);
                });
            }
            //Generate typeDeclaration
            let typeDeclarationList = children.typeDeclaration;
            typeDeclarationList.forEach(typeDeclaration => {
                if (typeDeclaration.children.classDeclaration) {
                    let classDeclarationList = this.createAstClassDeclaration(typeDeclaration.children.classDeclaration);
                    classDeclarationList.forEach(classDec => {
                        astNode.children.push(classDec);
                    });
                }
            });
        }
        return astNode;
    }
    /**
     * Gets the package Node
     * @param node // AST Node
     */
    createAstPackageNodeChildren(node) {
        let astNode = {
            end: node.location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.PackageDeclaration,
            name: node.name,
            pos: node.location.startOffset,
            start: node.location.startOffset
        };
        if (node.children.Identifier) {
            astNode.children = this.getIdentifier(node.children.Identifier);
        }
        return astNode;
    }
    /**
     * Gets the classDeclaration Node List
     * @param node // AST Node
     */
    createAstClassDeclaration(node) {
        let astNodeList = [];
        node.forEach(child => {
            let astNode = {
                end: child.location.endOffset,
                kind: syntax_kind_enum_1.SyntaxKind.classDeclaration,
                name: child.name,
                pos: child.location.startOffset,
                start: child.location.startOffset
            };
            astNode.children = [];
            if (child.children.classModifier) {
                let classModifierList = this.getClassModifierList(child.children.classModifier);
                classModifierList.forEach(classMod => {
                    astNode.children.push(classMod);
                });
            }
            if (child.children.normalClassDeclaration) {
                let normalClassDeclarationList = this.getNormalClassDeclaration(child.children.normalClassDeclaration);
                astNode.children.push(normalClassDeclarationList);
            }
            astNodeList.push(astNode);
        });
        return astNodeList;
    }
    /**
     * Gets the import Node List
     * @param node // AST Node
     */
    createAstImportNodeChildren(node) {
        let astNodeList = [];
        node.forEach(child => {
            let astNode = {
                end: child.location.endOffset,
                kind: child.name,
                name: child.name,
                pos: child.location.startOffset,
                start: child.location.startOffset
            };
            let identifiers = child.children.packageOrTypeName[0].children.Identifier;
            astNode.children = this.getIdentifier(identifiers);
            astNodeList.push(astNode);
        });
        return astNodeList;
    }
    /**
     * Gets the identifier Node List
     * @param node // AST Node
     */
    getIdentifier(node) {
        let astNodeList = [];
        node.forEach(identifier => {
            let astNode = {
                end: identifier.endOffset,
                kind: syntax_kind_enum_1.SyntaxKind.Identifier,
                name: identifier.image,
                pos: identifier.startOffset - 1,
                start: identifier.startOffset
            };
            astNodeList.push(astNode);
        });
        return astNodeList;
    }
    /**
     * Gets the classModifier Node List
     * @param node // AST Node
     */
    getClassModifierList(node) {
        let astNodeList = [];
        node.forEach(child => {
            let astNode = {
                end: child.location.endOffset,
                kind: syntax_kind_enum_1.SyntaxKind.classModifier,
                name: child.location.image,
                pos: child.location.startOffset,
                start: child.location.startOffset
            };
            astNode.children = [];
            if (child.children.annotation) {
                let annotation = this.getAnnotation(child.children.annotation);
                astNode.children.push(annotation);
            }
            else if (child.children.Public) {
                let publicAstNode = this.getAstNode(child.children.Public);
                astNode.children.push(publicAstNode);
            }
            astNodeList.push(astNode);
        });
        return astNodeList;
    }
    /**
     * Gets the annotation Node
     * @param annotation // AST Node
     */
    getAnnotation(annotation) {
        let astNode = {
            end: annotation[0].location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.annotation,
            name: annotation[0].location.image,
            pos: annotation[0].location.startOffset,
            start: annotation[0].location.startOffset
        };
        astNode.children = [];
        //At
        let atNode = this.getAtNode(annotation[0].children.At);
        astNode.children.push(atNode);
        //TypeName
        let typeNameNode = this.getTypeNameNode(annotation[0].children.typeName);
        astNode.children.push(typeNameNode);
        return astNode;
    }
    /**
     * Gets the AstNode of Node
     * @param node // AST Node
     */
    getAstNode(node) {
        let astNode = {
            end: node[0].endOffset,
            kind: node[0].image,
            name: node[0].image,
            pos: node[0].startOffset,
            start: node[0].startOffset
        };
        return astNode;
    }
    /**
     * Gets the At Node
     * @param atNode // AST Node
     */
    getAtNode(atNode) {
        let astNode = {
            end: atNode[0].endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.At,
            name: atNode[0].image,
            pos: atNode[0].startOffset,
            start: atNode[0].startOffset
        };
        return astNode;
    }
    /**
     * Gets the typeNameNode Node
     * @param typeNameNode // AST Node
     */
    getTypeNameNode(typeNameNode) {
        let astNode = {
            end: typeNameNode[0].location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.typeName,
            name: typeNameNode[0].location.image,
            pos: typeNameNode[0].location.startOffset,
            start: typeNameNode[0].location.startOffset
        };
        //Identifier
        if (typeNameNode[0].children.Identifier) {
            let identifier = this.getIdentifier(typeNameNode[0].children.Identifier);
            astNode.children = identifier;
        }
        return astNode;
    }
    /**
     * Gets the normalClass Node
     * @param normalClass // AST Node
     */
    getNormalClassDeclaration(normalClass) {
        let astNode = {
            end: normalClass[0].location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.normalClassDeclaration,
            name: normalClass[0].location.image,
            pos: normalClass[0].location.startOffset,
            start: normalClass[0].location.startOffset
        };
        const children = normalClass[0].children;
        astNode.children = [];
        //Class
        if (children.Class) {
            let normalClass = this.getNormalClass(children.Class);
            astNode.children.push(normalClass);
        }
        //typeIdentifier
        if (children.typeIdentifier) {
            let typeIdentifier = this.getTypeIdentifier(children.typeIdentifier);
            astNode.children.push(typeIdentifier);
        }
        //classBody
        if (children.classBody) {
            let classBody = this.getClassBody(children.classBody);
            astNode.children.push(classBody);
        }
        return astNode;
    }
    /**
     * Gets the Class Node
     * @param normalClass // AST Node
     */
    getNormalClass(normalClass) {
        let astNode = {
            end: normalClass[0].endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.Class,
            name: normalClass[0].image,
            pos: normalClass[0].startOffset,
            start: normalClass[0].startOffset
        };
        return astNode;
    }
    /**
     * Gets the typeIdentifier Node
     * @param typeIdentifier // AST Node
     */
    getTypeIdentifier(typeIdentifier) {
        let astNode = {
            end: typeIdentifier[0].location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.typeIdentifier,
            name: typeIdentifier[0].location.image,
            pos: typeIdentifier[0].location.startOffset,
            start: typeIdentifier[0].location.startOffset
        };
        //Identifier
        if (typeIdentifier[0].children.Identifier) {
            let identifier = this.getIdentifier(typeIdentifier[0].children.Identifier);
            astNode.children = identifier;
        }
        return astNode;
    }
    /**
     * Gets the classBody Node
     * @param classBody // AST Node
     */
    getClassBody(classBody) {
        let astNode = {
            end: classBody[0].location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.classBody,
            name: classBody[0].location.image,
            pos: classBody[0].location.startOffset,
            start: classBody[0].location.startOffset
        };
        astNode.children = [];
        //LCurly
        let lCurly = this.getLCurly(classBody[0].children.LCurly);
        astNode.children.push(lCurly);
        //classBodyDeclaration
        let classBodyDeclaration = this.getClassBodyDeclaration(classBody[0].children.classBodyDeclaration);
        classBodyDeclaration.forEach(classBD => {
            astNode.children.push(classBD);
        });
        //RCurly
        let rCurly = this.getRCurly(classBody[0].children.RCurly);
        astNode.children.push(rCurly);
        return astNode;
    }
    /**
     * Gets the lCurly Node
     * @param lCurly // AST Node
     */
    getLCurly(lCurly) {
        let astNode = {
            end: lCurly[0].endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.LCurly,
            name: lCurly[0].image,
            pos: lCurly[0].startOffset,
            start: lCurly[0].startOffset
        };
        return astNode;
    }
    /**
     * Gets the rCurly Node
     * @param rCurly // AST Node
     */
    getRCurly(rCurly) {
        let astNode = {
            end: rCurly[0].endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.RCurly,
            name: rCurly[0].image,
            pos: rCurly[0].startOffset,
            start: rCurly[0].startOffset
        };
        return astNode;
    }
    /**
     * Gets the classBodyDeclaration Node List
     * @param classBodyDeclaration // AST Node
     */
    getClassBodyDeclaration(classBodyDeclaration) {
        let astNodeList = [];
        classBodyDeclaration.forEach(child => {
            let astNode = {
                end: child.location.endOffset,
                kind: syntax_kind_enum_1.SyntaxKind.classBody,
                name: child.location.image,
                pos: child.location.startOffset,
                start: child.location.startOffset
            };
            astNode.children = [];
            if (child.children.classMemberDeclaration) {
                let classMemberDeclaration = this.getClassMemberDeclaration(child.children.classMemberDeclaration);
                astNode.children.push(classMemberDeclaration);
            }
            astNodeList.push(astNode);
        });
        return astNodeList;
    }
    /**
     * Gets the classMemberDeclaration Node
     * @param classMemberDeclaration // AST Node
     */
    getClassMemberDeclaration(classMemberDeclaration) {
        let astNode = {
            end: classMemberDeclaration[0].location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.classMemberDeclaration,
            name: classMemberDeclaration[0].location.image,
            pos: classMemberDeclaration[0].location.startOffset,
            start: classMemberDeclaration[0].location.startOffset
        };
        astNode.children = [];
        if (classMemberDeclaration[0].children.methodDeclaration) {
            let classMemberDec = this.getMethodDeclaration(classMemberDeclaration[0].children.methodDeclaration);
            astNode.children.push(classMemberDec);
        }
        return astNode;
    }
    /**
     * Gets the methodDeclaration Node
     * @param methodDeclaration // AST Node
     */
    getMethodDeclaration(methodDeclaration) {
        let astNode = {
            end: methodDeclaration[0].location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.methodDeclaration,
            name: methodDeclaration[0].location.image,
            pos: methodDeclaration[0].location.startOffset,
            start: methodDeclaration[0].location.startOffset
        };
        astNode.children = [];
        //methodModifier
        let methodModifier = this.getMethodModifier(methodDeclaration[0].children.methodModifier);
        methodModifier.forEach(methodM => {
            astNode.children.push(methodM);
        });
        //methodHeader
        let methodHeader = this.getMethodHeader(methodDeclaration[0].children.methodHeader);
        astNode.children.push(methodHeader);
        //methodBody
        let methodBody = this.getMethodBody(methodDeclaration[0].children.methodBody);
        astNode.children.push(methodBody);
        return astNode;
    }
    /**
     * Gets the methodModifier Node List
     * @param methodModifier // AST Node
     */
    getMethodModifier(methodModifier) {
        let methodModifierList = [];
        methodModifier.forEach(child => {
            let astNode = {
                end: child.location.endOffset,
                kind: syntax_kind_enum_1.SyntaxKind.methodModifier,
                name: child.location.image,
                pos: child.location.startOffset,
                start: child.location.startOffset
            };
            astNode.children = [];
            if (child.children.Public) {
                let node = this.getAstNode(child.children.Public);
                astNode.children.push(node);
            }
            else if (child.children.Private) {
                let node = this.getAstNode(child.children.Private);
                astNode.children.push(node);
            }
            else if (child.children.Static) {
                let node = this.getAstNode(child.children.Static);
                astNode.children.push(node);
            }
            else if (child.children.Protected) {
                let node = this.getAstNode(child.children.Protected);
                astNode.children.push(node);
            }
            methodModifierList.push(astNode);
        });
        return methodModifierList;
    }
    /**
     * Gets the methodHeader Node
     * @param methodHeader // AST Node
     */
    getMethodHeader(methodHeader) {
        let astNode = {
            end: methodHeader[0].location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.methodHeader,
            name: methodHeader[0].location.image,
            pos: methodHeader[0].location.startOffset,
            start: methodHeader[0].location.startOffset
        };
        let headerChildren = methodHeader[0].children;
        astNode.children = [];
        if (headerChildren.result) {
            let result = this.getResult(headerChildren.result);
            astNode.children.push(result);
        }
        if (headerChildren.methodDeclarator) {
            let methodDeclarator = this.getMethodDeclarator(headerChildren.methodDeclarator);
            astNode.children.push(methodDeclarator);
        }
        return astNode;
    }
    /**
     * Gets the methodBody Node
     * @param methodBody // AST Node
     */
    getMethodBody(methodBody) {
        let astNode = {
            end: methodBody[0].location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.methodDeclaration,
            name: methodBody[0].location.image,
            pos: methodBody[0].location.startOffset,
            start: methodBody[0].location.startOffset
        };
        return astNode;
    }
    /**
     *
     * @param result // AST Node
     */
    getResult(result) {
        let astNode = {
            end: result[0].location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.Result,
            name: result[0].name,
            pos: result[0].location.startOffset,
            start: result[0].location.startOffset
        };
        astNode.children = [];
        if (result[0].children.Void) {
            let voidNode = this.getAstNode(result[0].children.Void);
            astNode.children.push(voidNode);
        }
        return astNode;
    }
    /**
     *
     * @param methodDeclarator // AST Node
     */
    getMethodDeclarator(methodDeclarator) {
        let astNode = {
            end: methodDeclarator[0].location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.methodDeclarator,
            name: methodDeclarator[0].name,
            pos: methodDeclarator[0].location.startOffset,
            start: methodDeclarator[0].location.startOffset
        };
        astNode.children = [];
        //Identifier
        if (methodDeclarator[0].children.Identifier) {
            let identifiers = this.getIdentifier(methodDeclarator[0].children.Identifier);
            identifiers.forEach(identifier => {
                astNode.children.push(identifier);
            });
        }
        //LBrace
        if (methodDeclarator[0].children.LBrace) {
            let lBrace = this.getLBrace(methodDeclarator[0].children.LBrace);
            astNode.children.push(lBrace);
        }
        //formalParameterList
        if (methodDeclarator[0].children.formalParameterList) {
            let formalParameterList = this.getFormalParameterList(methodDeclarator[0].children.formalParameterList);
            astNode.children.push(formalParameterList);
        }
        //RBrace
        if (methodDeclarator[0].children.RBrace) {
            let rBrace = this.getRBrace(methodDeclarator[0].children.RBrace);
            astNode.children.push(rBrace);
        }
        return astNode;
    }
    /**
     *
     * @param lBrace
     */
    getLBrace(lBrace) {
        let astNode = {
            end: lBrace[0].endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.LBrace,
            name: lBrace[0].image,
            pos: lBrace[0].startOffset,
            start: lBrace[0].startOffset
        };
        return astNode;
    }
    /**
     *
     * @param rBrace
     */
    getRBrace(rBrace) {
        let astNode = {
            end: rBrace[0].endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.RBrace,
            name: rBrace[0].name,
            pos: rBrace[0].startOffset,
            start: rBrace[0].startOffset
        };
        return astNode;
    }
    /**
     *
     * @param formalParameterList
     */
    getFormalParameterList(formalParameterList) {
        let astNode = {
            end: formalParameterList[0].location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.formalParameterList,
            name: formalParameterList[0].name,
            pos: formalParameterList[0].location.startOffset,
            start: formalParameterList[0].location.startOffset
        };
        astNode.children = [];
        if (formalParameterList[0].children.formalParameter) {
            this.getFormalParameter(formalParameterList[0].children.formalParameter);
        }
        return astNode;
    }
    /**
     *
     * @param formalParameter
     */
    getFormalParameter(formalParameter) {
        let astNode = {
            end: formalParameter[0].location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.formalParameter,
            name: formalParameter[0].name,
            pos: formalParameter[0].location.startOffset,
            start: formalParameter[0].location.startOffset
        };
        astNode.children = [];
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
        let astNode = {
            end: variableParaRegularParameter[0].location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.variableParaRegularParameter,
            name: variableParaRegularParameter[0].name,
            pos: variableParaRegularParameter[0].location.startOffset,
            start: variableParaRegularParameter[0].location.startOffset
        };
        astNode.children = [];
        //unannType
        if (variableParaRegularParameter[0].children.unannType) {
            let unannType = this.getUnannType(variableParaRegularParameter[0].children.unannType);
            astNode.children.push(unannType);
        }
        //variableDeclaratorId
        if (variableParaRegularParameter[0].children.variableDeclaratorId) {
            let variableDeclaratorId = this.getVariableDeclaratorId(variableParaRegularParameter[0].children.variableDeclaratorId);
            astNode.children.push(variableDeclaratorId);
        }
        return astNode;
    }
    /**
     *
     * @param unannType
     */
    getUnannType(unannType) {
        let astNode = {
            end: unannType[0].location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.unannType,
            name: unannType[0].name,
            pos: unannType[0].location.startOffset,
            start: unannType[0].location.startOffset
        };
        astNode.children = [];
        //unannReferenceType
        if (unannType[0].children.unannReferenceType) {
            let unannReferenceType = this.getUnannReferenceType(unannType[0].children.unannReferenceType);
            astNode.children.push(unannReferenceType);
        }
        return astNode;
    }
    /**
     *
     * @param variableDeclaratorId
     */
    getVariableDeclaratorId(variableDeclaratorId) {
        let astNode = {
            end: variableDeclaratorId[0].location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.variableDeclaratorId,
            name: variableDeclaratorId[0].name,
            pos: variableDeclaratorId[0].location.startOffset,
            start: variableDeclaratorId[0].location.startOffset
        };
        astNode.children = [];
        //Identifier
        if (variableDeclaratorId[0].children.Identifier) {
            let identifiers = this.getIdentifier(variableDeclaratorId[0].children.Identifier);
            identifiers.forEach(identifier => {
                astNode.children.push(identifier);
            });
        }
        return astNode;
    }
    /**
     *
     * @param unannReferenceType
     */
    getUnannReferenceType(unannReferenceType) {
        let astNode = {
            end: unannReferenceType[0].location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.variableDeclaratorId,
            name: unannReferenceType[0].name,
            pos: unannReferenceType[0].location.startOffset,
            start: unannReferenceType[0].location.startOffset
        };
        astNode.children = [];
        //unannClassType
        if (unannReferenceType[0].children.unannClassType) {
            let unannClassType = this.getUnannClassType(unannReferenceType[0].children.unannClassType);
            astNode.children.push(unannClassType);
        }
        return astNode;
    }
    /**
     *
     * @param unannClassType
     */
    getUnannClassType(unannClassType) {
        let astNode = {
            end: unannClassType[0].location.endOffset,
            kind: syntax_kind_enum_1.SyntaxKind.variableDeclaratorId,
            name: unannClassType[0].name,
            pos: unannClassType[0].location.startOffset,
            start: unannClassType[0].location.startOffset
        };
        astNode.children = [];
        //Identifier
        if (unannClassType[0].children.Identifier) {
            let identifiers = this.getIdentifier(unannClassType[0].children.Identifier);
            identifiers.forEach(identifier => {
                astNode.children.push(identifier);
            });
        }
        return astNode;
    }
}
exports.AstFileGenerationJavaService = AstFileGenerationJavaService;
