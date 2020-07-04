"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxKind = void 0;
var SyntaxKind;
(function (SyntaxKind) {
    SyntaxKind["AbstractKeyword"] = "AbstractKeyword";
    SyntaxKind["AmpersandAmpersandToken"] = "AmpersandAmpersandToken";
    SyntaxKind["AmpersandEqualsToken"] = "AmpersandEqualsToken";
    SyntaxKind["AmpersandToken"] = "AmpersandToken";
    SyntaxKind["AnyKeyword"] = "AnyKeyword";
    SyntaxKind["ArrayBindingPattern"] = "ArrayBindingPattern";
    SyntaxKind["ArrayLiteralExpression"] = "ArrayLiteralExpression";
    SyntaxKind["ArrayType"] = "ArrayType";
    SyntaxKind["ArrowFunction"] = "ArrowFunction";
    SyntaxKind["AsExpression"] = "AsExpression";
    SyntaxKind["AsKeyword"] = "AsKeyword";
    SyntaxKind["AssertsKeyword"] = "AssertsKeyword";
    SyntaxKind["AsteriskAsteriskEqualsToken"] = "AsteriskAsteriskEqualsToken";
    SyntaxKind["AsteriskAsteriskToken"] = "AsteriskAsteriskToken";
    SyntaxKind["AsteriskEqualsToken"] = "AsteriskEqualsToken";
    SyntaxKind["AsteriskToken"] = "AsteriskToken";
    SyntaxKind["AsyncKeyword"] = "AsyncKeyword";
    SyntaxKind["AtToken"] = "AtToken";
    SyntaxKind["AwaitExpression"] = "AwaitExpression";
    SyntaxKind["AwaitKeyword"] = "AwaitKeyword";
    SyntaxKind["BacktickToken"] = "BacktickToken";
    SyntaxKind["BarBarToken"] = "BarBarToken";
    SyntaxKind["BarEqualsToken"] = "BarEqualsToken";
    SyntaxKind["BarToken"] = "BarToken";
    SyntaxKind["BigIntKeyword"] = "BigIntKeyword";
    SyntaxKind["BigIntLiteral"] = "BigIntLiteral";
    SyntaxKind["BinaryExpression"] = "BinaryExpression";
    SyntaxKind["BindingElement"] = "BindingElement";
    SyntaxKind["Block"] = "Block";
    SyntaxKind["BooleanKeyword"] = "BooleanKeyword";
    SyntaxKind["BreakKeyword"] = "BreakKeyword";
    SyntaxKind["BreakStatement"] = "BreakStatement";
    SyntaxKind["Bundle"] = "Bundle";
    SyntaxKind["CallExpression"] = "CallExpression";
    SyntaxKind["CallSignature"] = "CallSignature";
    SyntaxKind["CaretEqualsToken"] = "CaretEqualsToken";
    SyntaxKind["CaretToken"] = "CaretToken";
    SyntaxKind["CaseBlock"] = "CaseBlock";
    SyntaxKind["CaseClause"] = "CaseClause";
    SyntaxKind["CaseKeyword"] = "CaseKeyword";
    SyntaxKind["CatchClause"] = "CatchClause";
    SyntaxKind["CatchKeyword"] = "CatchKeyword";
    SyntaxKind["ClassDeclaration"] = "ClassDeclaration";
    SyntaxKind["ClassExpression"] = "ClassExpression";
    SyntaxKind["ClassKeyword"] = "ClassKeyword";
    SyntaxKind["CloseBraceToken"] = "CloseBraceToken";
    SyntaxKind["CloseBracketToken"] = "CloseBracketToken";
    SyntaxKind["CloseParenToken"] = "CloseParenToken";
    SyntaxKind["ColonToken"] = "ColonToken";
    SyntaxKind["CommaListExpression"] = "CommaListExpression";
    SyntaxKind["CommaToken"] = "CommaToken";
    SyntaxKind["ComputedPropertyName"] = "ComputedPropertyName";
    SyntaxKind["ConditionalExpression"] = "ConditionalExpression";
    SyntaxKind["ConditionalType"] = "ConditionalType";
    SyntaxKind["ConflictMarkerTrivia"] = "ConflictMarkerTrivia";
    SyntaxKind["ConstKeyword"] = "ConstKeyword";
    SyntaxKind["Constructor"] = "Constructor";
    SyntaxKind["ConstructorKeyword"] = "ConstructorKeyword";
    SyntaxKind["ConstructorType"] = "ConstructorType";
    SyntaxKind["ConstructSignature"] = "ConstructSignature";
    SyntaxKind["ContinueKeyword"] = "ContinueKeyword";
    SyntaxKind["ContinueStatement"] = "ContinueStatement";
    SyntaxKind["Count"] = "Count";
    SyntaxKind["DebuggerKeyword"] = "DebuggerKeyword";
    SyntaxKind["DebuggerStatement"] = "DebuggerStatement";
    SyntaxKind["DeclareKeyword"] = "DeclareKeyword";
    SyntaxKind["Decorator"] = "Decorator";
    SyntaxKind["DefaultClause"] = "DefaultClause";
    SyntaxKind["DefaultKeyword"] = "DefaultKeyword";
    SyntaxKind["DeleteExpression"] = "DeleteExpression";
    SyntaxKind["DeleteKeyword"] = "DeleteKeyword";
    SyntaxKind["DoKeyword"] = "DoKeyword";
    SyntaxKind["DoStatement"] = "DoStatement";
    SyntaxKind["DotDotDotToken"] = "DotDotDotToken";
    SyntaxKind["DotToken"] = "DotToken";
    SyntaxKind["ElementAccessExpression"] = "ElementAccessExpression";
    SyntaxKind["ElseKeyword"] = "ElseKeyword";
    SyntaxKind["EmptyStatement"] = "EmptyStatement";
    SyntaxKind["EndOfDeclarationMarker"] = "EndOfDeclarationMarker";
    SyntaxKind["EndOfFileToken"] = "EndOfFileToken";
    SyntaxKind["EnumDeclaration"] = "EnumDeclaration";
    SyntaxKind["EnumKeyword"] = "EnumKeyword";
    SyntaxKind["EnumMember"] = "EnumMember";
    SyntaxKind["EqualsEqualsEqualsToken"] = "EqualsEqualsEqualsToken";
    SyntaxKind["EqualsEqualsToken"] = "EqualsEqualsToken";
    SyntaxKind["EqualsGreaterThanToken"] = "EqualsGreaterThanToken";
    SyntaxKind["EqualsToken"] = "EqualsToken";
    SyntaxKind["ExclamationEqualsEqualsToken"] = "ExclamationEqualsEqualsToken";
    SyntaxKind["ExclamationEqualsToken"] = "ExclamationEqualsToken";
    SyntaxKind["ExclamationToken"] = "ExclamationToken";
    SyntaxKind["ExportAssignment"] = "ExportAssignment";
    SyntaxKind["ExportDeclaration"] = "ExportDeclaration";
    SyntaxKind["ExportKeyword"] = "ExportKeyword";
    SyntaxKind["ExportSpecifier"] = "ExportSpecifier";
    SyntaxKind["ExpressionStatement"] = "ExpressionStatement";
    SyntaxKind["ExpressionWithTypeArguments"] = "ExpressionWithTypeArguments";
    SyntaxKind["ExtendsKeyword"] = "ExtendsKeyword";
    SyntaxKind["ExternalModuleReference"] = "ExternalModuleReference";
    SyntaxKind["FalseKeyword"] = "FalseKeyword";
    SyntaxKind["FinallyKeyword"] = "FinallyKeyword";
    SyntaxKind["FirstAssignment"] = "FirstAssignment";
    SyntaxKind["FirstBinaryOperator"] = "FirstBinaryOperator";
    SyntaxKind["FirstCompoundAssignment"] = "FirstCompoundAssignment";
    SyntaxKind["FirstFutureReservedWord"] = "FirstFutureReservedWord";
    SyntaxKind["FirstJSDocNode"] = "FirstJSDocNode";
    SyntaxKind["FirstJSDocTagNode"] = "FirstJSDocTagNode";
    SyntaxKind["FirstKeyword"] = "FirstKeyword";
    SyntaxKind["FirstLiteralToken"] = "FirstLiteralToken";
    SyntaxKind["FirstNode"] = "FirstNode";
    SyntaxKind["FirstPunctuation"] = "FirstPunctuation";
    SyntaxKind["FirstReservedWord"] = "FirstReservedWord";
    SyntaxKind["FirstStatement"] = "FirstStatement";
    SyntaxKind["FirstTemplateToken"] = "FirstTemplateToken";
    SyntaxKind["FirstToken"] = "FirstToken";
    SyntaxKind["FirstTriviaToken"] = "FirstTriviaToken";
    SyntaxKind["FirstTypeNode"] = "FirstTypeNode";
    SyntaxKind["ForInStatement"] = "ForInStatement";
    SyntaxKind["ForKeyword"] = "ForKeyword";
    SyntaxKind["ForOfStatement"] = "ForOfStatement";
    SyntaxKind["ForStatement"] = "ForStatement";
    SyntaxKind["FromKeyword"] = "FromKeyword";
    SyntaxKind["FunctionDeclaration"] = "FunctionDeclaration";
    SyntaxKind["FunctionExpression"] = "FunctionExpression";
    SyntaxKind["FunctionKeyword"] = "FunctionKeyword";
    SyntaxKind["FunctionType"] = "FunctionType";
    SyntaxKind["GetAccessor"] = "GetAccessor";
    SyntaxKind["GetKeyword"] = "GetKeyword";
    SyntaxKind["GlobalKeyword"] = "GlobalKeyword";
    SyntaxKind["GreaterThanEqualsToken"] = "GreaterThanEqualsToken";
    SyntaxKind["GreaterThanGreaterThanEqualsToken"] = "GreaterThanGreaterThanEqualsToken";
    SyntaxKind["GreaterThanGreaterThanGreaterThanEqualsToken"] = "GreaterThanGreaterThanGreaterThanEqualsToken";
    SyntaxKind["GreaterThanGreaterThanGreaterThanToken"] = "GreaterThanGreaterThanGreaterThanToken";
    SyntaxKind["GreaterThanGreaterThanToken"] = "GreaterThanGreaterThanToken";
    SyntaxKind["GreaterThanToken"] = "GreaterThanToken";
    SyntaxKind["HeritageClause"] = "HeritageClause";
    SyntaxKind["Identifier"] = "Identifier";
    SyntaxKind["IfKeyword"] = "IfKeyword";
    SyntaxKind["IfStatement"] = "IfStatement";
    SyntaxKind["ImplementsKeyword"] = "ImplementsKeyword";
    SyntaxKind["ImportClause"] = "ImportClause";
    SyntaxKind["ImportDeclaration"] = "ImportDeclaration";
    SyntaxKind["ImportEqualsDeclaration"] = "ImportEqualsDeclaration";
    SyntaxKind["ImportKeyword"] = "ImportKeyword";
    SyntaxKind["ImportSpecifier"] = "ImportSpecifier";
    SyntaxKind["ImportType"] = "ImportType";
    SyntaxKind["IndexedAccessType"] = "IndexedAccessType";
    SyntaxKind["IndexSignature"] = "IndexSignature";
    SyntaxKind["InferKeyword"] = "InferKeyword";
    SyntaxKind["InferType"] = "InferType";
    SyntaxKind["InKeyword"] = "InKeyword";
    SyntaxKind["InputFiles"] = "InputFiles";
    SyntaxKind["InstanceOfKeyword"] = "InstanceOfKeyword";
    SyntaxKind["InterfaceDeclaration"] = "InterfaceDeclaration";
    SyntaxKind["InterfaceKeyword"] = "InterfaceKeyword";
    SyntaxKind["IntersectionType"] = "IntersectionType";
    SyntaxKind["IsKeyword"] = "IsKeyword";
    SyntaxKind["JSDocAllType"] = "JSDocAllType";
    SyntaxKind["JSDocAugmentsTag"] = "JSDocAugmentsTag";
    SyntaxKind["JSDocAuthorTag"] = "JSDocAuthorTag";
    SyntaxKind["JSDocCallbackTag"] = "JSDocCallbackTag";
    SyntaxKind["JSDocClassTag"] = "JSDocClassTag";
    SyntaxKind["JSDocComment"] = "JSDocComment";
    SyntaxKind["JSDocEnumTag"] = "JSDocEnumTag";
    SyntaxKind["JSDocFunctionType"] = "JSDocFunctionType";
    SyntaxKind["JSDocImplementsTag"] = "JSDocImplementsTag";
    SyntaxKind["JSDocNamepathType"] = "JSDocNamepathType";
    SyntaxKind["JSDocNonNullableType"] = "JSDocNonNullableType";
    SyntaxKind["JSDocNullableType"] = "JSDocNullableType";
    SyntaxKind["JSDocOptionalType"] = "JSDocOptionalType";
    SyntaxKind["JSDocParameterTag"] = "JSDocParameterTag";
    SyntaxKind["JSDocPrivateTag"] = "JSDocPrivateTag";
    SyntaxKind["JSDocPropertyTag"] = "JSDocPropertyTag";
    SyntaxKind["JSDocProtectedTag"] = "JSDocProtectedTag";
    SyntaxKind["JSDocPublicTag"] = "JSDocPublicTag";
    SyntaxKind["JSDocReadonlyTag"] = "JSDocReadonlyTag";
    SyntaxKind["JSDocReturnTag"] = "JSDocReturnTag";
    SyntaxKind["JSDocSignature"] = "JSDocSignature";
    SyntaxKind["JSDocTag"] = "JSDocTag";
    SyntaxKind["JSDocTemplateTag"] = "JSDocTemplateTag";
    SyntaxKind["JSDocThisTag"] = "JSDocThisTag";
    SyntaxKind["JSDocTypedefTag"] = "JSDocTypedefTag";
    SyntaxKind["JSDocTypeExpression"] = "JSDocTypeExpression";
    SyntaxKind["JSDocTypeLiteral"] = "JSDocTypeLiteral";
    SyntaxKind["JSDocTypeTag"] = "JSDocTypeTag";
    SyntaxKind["JSDocUnknownType"] = "JSDocUnknownType";
    SyntaxKind["JSDocVariadicType"] = "JSDocVariadicType";
    SyntaxKind["JsxAttribute"] = "JsxAttribute";
    SyntaxKind["JsxAttributes"] = "JsxAttributes";
    SyntaxKind["JsxClosingElement"] = "JsxClosingElement";
    SyntaxKind["JsxClosingFragment"] = "JsxClosingFragment";
    SyntaxKind["JsxElement"] = "JsxElement";
    SyntaxKind["JsxExpression"] = "JsxExpression";
    SyntaxKind["JsxFragment"] = "JsxFragment";
    SyntaxKind["JsxOpeningElement"] = "JsxOpeningElement";
    SyntaxKind["JsxOpeningFragment"] = "JsxOpeningFragment";
    SyntaxKind["JsxSelfClosingElement"] = "JsxSelfClosingElement";
    SyntaxKind["JsxSpreadAttribute"] = "JsxSpreadAttribute";
    SyntaxKind["JsxText"] = "JsxText";
    SyntaxKind["JsxTextAllWhiteSpaces"] = "JsxTextAllWhiteSpaces";
    SyntaxKind["KeyOfKeyword"] = "KeyOfKeyword";
    SyntaxKind["Keyword"] = "Keyword";
    SyntaxKind["LabeledStatement"] = "LabeledStatement";
    SyntaxKind["LastAssignment"] = "LastAssignment";
    SyntaxKind["LastBinaryOperator"] = "LastBinaryOperator";
    SyntaxKind["LastCompoundAssignment"] = "LastCompoundAssignment";
    SyntaxKind["LastFutureReservedWord"] = "LastFutureReservedWord";
    SyntaxKind["LastJSDocNode"] = "LastJSDocNode";
    SyntaxKind["LastJSDocTagNode"] = "LastJSDocTagNode";
    SyntaxKind["LastKeyword"] = "LastKeyword";
    SyntaxKind["LastLiteralToken"] = "LastLiteralToken";
    SyntaxKind["LastPunctuation"] = "LastPunctuation";
    SyntaxKind["LastReservedWord"] = "LastReservedWord";
    SyntaxKind["LastStatement"] = "LastStatement";
    SyntaxKind["LastTemplateToken"] = "LastTemplateToken";
    SyntaxKind["LastToken"] = "LastToken";
    SyntaxKind["LastTriviaToken"] = "LastTriviaToken";
    SyntaxKind["LastTypeNode"] = "LastTypeNode";
    SyntaxKind["LessThanEqualsToken"] = "LessThanEqualsToken";
    SyntaxKind["LessThanLessThanEqualsToken"] = "LessThanLessThanEqualsToken";
    SyntaxKind["LessThanLessThanToken"] = "LessThanLessThanToken";
    SyntaxKind["LessThanSlashToken"] = "LessThanSlashToken";
    SyntaxKind["LessThanToken"] = "LessThanToken";
    SyntaxKind["LetKeyword"] = "LetKeyword";
    SyntaxKind["Literal"] = "Literal";
    SyntaxKind["LiteralType"] = "LiteralType";
    SyntaxKind["MappedType"] = "MappedType";
    SyntaxKind["MergeDeclarationMarker"] = "MergeDeclarationMarker";
    SyntaxKind["MetaProperty"] = "MetaProperty";
    SyntaxKind["MethodDeclaration"] = "MethodDeclaration";
    SyntaxKind["MethodSignature"] = "MethodSignature";
    SyntaxKind["MinusEqualsToken"] = "MinusEqualsToken";
    SyntaxKind["MinusMinusToken"] = "MinusMinusToken";
    SyntaxKind["MinusToken"] = "MinusToken";
    SyntaxKind["MissingDeclaration"] = "MissingDeclaration";
    SyntaxKind["ModuleBlock"] = "ModuleBlock";
    SyntaxKind["ModuleDeclaration"] = "ModuleDeclaration";
    SyntaxKind["ModuleKeyword"] = "ModuleKeyword";
    SyntaxKind["MultiLineCommentTrivia"] = "MultiLineCommentTrivia";
    SyntaxKind["NamedExports"] = "NamedExports";
    SyntaxKind["NamedImports"] = "NamedImports";
    SyntaxKind["NamespaceExport"] = "NamespaceExport";
    SyntaxKind["NamespaceExportDeclaration"] = "NamespaceExportDeclaration";
    SyntaxKind["NamespaceImport"] = "NamespaceImport";
    SyntaxKind["NamespaceKeyword"] = "NamespaceKeyword";
    SyntaxKind["NeverKeyword"] = "NeverKeyword";
    SyntaxKind["NewExpression"] = "NewExpression";
    SyntaxKind["NewKeyword"] = "NewKeyword";
    SyntaxKind["NewLineTrivia"] = "NewLineTrivia";
    SyntaxKind["NonNullExpression"] = "NonNullExpression";
    SyntaxKind["NoSubstitutionTemplateLiteral"] = "NoSubstitutionTemplateLiteral";
    SyntaxKind["NotEmittedStatement"] = "NotEmittedStatement";
    SyntaxKind["NullKeyword"] = "NullKeyword";
    SyntaxKind["NumberKeyword"] = "NumberKeyword";
    SyntaxKind["NumericLiteral"] = "NumericLiteral";
    SyntaxKind["ObjectBindingPattern"] = "ObjectBindingPattern";
    SyntaxKind["ObjectKeyword"] = "ObjectKeyword";
    SyntaxKind["ObjectLiteralExpression"] = "ObjectLiteralExpression";
    SyntaxKind["OfKeyword"] = "OfKeyword";
    SyntaxKind["OmittedExpression"] = "OmittedExpression";
    SyntaxKind["OpenBraceToken"] = "OpenBraceToken";
    SyntaxKind["OpenBracketToken"] = "OpenBracketToken";
    SyntaxKind["OpenParenToken"] = "OpenParenToken";
    SyntaxKind["OptionalType"] = "OptionalType";
    SyntaxKind["PackageKeyword"] = "PackageKeyword";
    SyntaxKind["Parameter"] = "Parameter";
    SyntaxKind["ParenthesizedExpression"] = "ParenthesizedExpression";
    SyntaxKind["ParenthesizedType"] = "ParenthesizedType";
    SyntaxKind["PartiallyEmittedExpression"] = "PartiallyEmittedExpression";
    SyntaxKind["PercentEqualsToken"] = "PercentEqualsToken";
    SyntaxKind["PercentToken"] = "PercentToken";
    SyntaxKind["PlusEqualsToken"] = "PlusEqualsToken";
    SyntaxKind["PlusPlusToken"] = "PlusPlusToken";
    SyntaxKind["PlusToken"] = "PlusToken";
    SyntaxKind["PostfixUnaryExpression"] = "PostfixUnaryExpression";
    SyntaxKind["PrefixUnaryExpression"] = "PrefixUnaryExpression";
    SyntaxKind["PrivateIdentifier"] = "PrivateIdentifier";
    SyntaxKind["PrivateKeyword"] = "PrivateKeyword";
    SyntaxKind["PropertyAccessExpression"] = "PropertyAccessExpression";
    SyntaxKind["PropertyAssignment"] = "PropertyAssignment";
    SyntaxKind["PropertyDeclaration"] = "PropertyDeclaration";
    SyntaxKind["PropertySignature"] = "PropertySignature";
    SyntaxKind["ProtectedKeyword"] = "ProtectedKeyword";
    SyntaxKind["PublicKeyword"] = "PublicKeyword";
    SyntaxKind["QualifiedName"] = "QualifiedName";
    SyntaxKind["QuestionDotToken"] = "QuestionDotToken";
    SyntaxKind["QuestionQuestionToken"] = "QuestionQuestionToken";
    SyntaxKind["QuestionToken"] = "QuestionToken";
    SyntaxKind["ReadonlyKeyword"] = "ReadonlyKeyword";
    SyntaxKind["RegularExpressionLiteral"] = "RegularExpressionLiteral";
    SyntaxKind["RequireKeyword"] = "RequireKeyword";
    SyntaxKind["RestType"] = "RestType";
    SyntaxKind["ReturnKeyword"] = "ReturnKeyword";
    SyntaxKind["ReturnStatement"] = "ReturnStatement";
    SyntaxKind["SemicolonClassElement"] = "SemicolonClassElement";
    SyntaxKind["SemicolonToken"] = "SemicolonToken";
    SyntaxKind["SetAccessor"] = "SetAccessor";
    SyntaxKind["SetKeyword"] = "SetKeyword";
    SyntaxKind["ShebangTrivia"] = "ShebangTrivia";
    SyntaxKind["ShorthandPropertyAssignment"] = "ShorthandPropertyAssignment";
    SyntaxKind["SingleLineCommentTrivia"] = "SingleLineCommentTrivia";
    SyntaxKind["SlashEqualsToken"] = "SlashEqualsToken";
    SyntaxKind["SlashToken"] = "SlashToken";
    SyntaxKind["SourceFile"] = "SourceFile";
    SyntaxKind["SpreadAssignment"] = "SpreadAssignment";
    SyntaxKind["SpreadElement"] = "SpreadElement";
    SyntaxKind["StaticKeyword"] = "StaticKeyword";
    SyntaxKind["StringKeyword"] = "StringKeyword";
    SyntaxKind["StringLiteral"] = "StringLiteral";
    SyntaxKind["SuperKeyword"] = "SuperKeyword";
    SyntaxKind["SwitchKeyword"] = "SwitchKeyword";
    SyntaxKind["SwitchStatement"] = "SwitchStatement";
    SyntaxKind["SymbolKeyword"] = "SymbolKeyword";
    SyntaxKind["SyntaxList"] = "SyntaxList";
    SyntaxKind["SyntheticExpression"] = "SyntheticExpression";
    SyntaxKind["SyntheticReferenceExpression"] = "SyntheticReferenceExpression";
    SyntaxKind["TaggedTemplateExpression"] = "TaggedTemplateExpression";
    SyntaxKind["TemplateExpression"] = "TemplateExpression";
    SyntaxKind["TemplateHead"] = "TemplateHead";
    SyntaxKind["TemplateMiddle"] = "TemplateMiddle";
    SyntaxKind["TemplateSpan"] = "TemplateSpan";
    SyntaxKind["TemplateTail"] = "TemplateTail";
    SyntaxKind["ThisKeyword"] = "ThisKeyword";
    SyntaxKind["ThisType"] = "ThisType";
    SyntaxKind["ThrowKeyword"] = "ThrowKeyword";
    SyntaxKind["ThrowStatement"] = "ThrowStatement";
    SyntaxKind["TildeToken"] = "TildeToken";
    SyntaxKind["TrueKeyword"] = "TrueKeyword";
    SyntaxKind["TryKeyword"] = "TryKeyword";
    SyntaxKind["TryStatement"] = "TryStatement";
    SyntaxKind["TupleType"] = "TupleType";
    SyntaxKind["TypeAliasDeclaration"] = "TypeAliasDeclaration";
    SyntaxKind["TypeAssertionExpression"] = "TypeAssertionExpression";
    SyntaxKind["TypeKeyword"] = "TypeKeyword";
    SyntaxKind["TypeLiteral"] = "TypeLiteral";
    SyntaxKind["TypeOfExpression"] = "TypeOfExpression";
    SyntaxKind["TypeOfKeyword"] = "TypeOfKeyword";
    SyntaxKind["TypeOperator"] = "TypeOperator";
    SyntaxKind["TypeParameter"] = "TypeParameter";
    SyntaxKind["TypePredicate"] = "TypePredicate";
    SyntaxKind["TypeQuery"] = "TypeQuery";
    SyntaxKind["TypeReference"] = "TypeReference";
    SyntaxKind["UndefinedKeyword"] = "UndefinedKeyword";
    SyntaxKind["UnionType"] = "UnionType";
    SyntaxKind["UniqueKeyword"] = "UniqueKeyword";
    SyntaxKind["Unknown"] = "Unknown";
    SyntaxKind["UnknownKeyword"] = "UnknownKeyword";
    SyntaxKind["UnparsedInternalText"] = "UnparsedInternalText";
    SyntaxKind["UnparsedPrepend"] = "UnparsedPrepend";
    SyntaxKind["UnparsedPrologue"] = "UnparsedPrologue";
    SyntaxKind["UnparsedSource"] = "UnparsedSource";
    SyntaxKind["UnparsedSyntheticReference"] = "UnparsedSyntheticReference";
    SyntaxKind["UnparsedText"] = "UnparsedText";
    SyntaxKind["VariableDeclaration"] = "VariableDeclaration";
    SyntaxKind["VariableDeclarationList"] = "VariableDeclarationList";
    SyntaxKind["VariableStatement"] = "VariableStatement";
    SyntaxKind["VarKeyword"] = "VarKeyword";
    SyntaxKind["VoidExpression"] = "VoidExpression";
    SyntaxKind["VoidKeyword"] = "VoidKeyword";
    SyntaxKind["WhileKeyword"] = "WhileKeyword";
    SyntaxKind["WhileStatement"] = "WhileStatement";
    SyntaxKind["WhitespaceTrivia"] = "WhitespaceTrivia";
    SyntaxKind["WithKeyword"] = "WithKeyword";
    SyntaxKind["WithStatement"] = "WithStatement";
    SyntaxKind["YieldExpression"] = "YieldExpression";
    SyntaxKind["YieldKeyword"] = "YieldKeyword";
})(SyntaxKind = exports.SyntaxKind || (exports.SyntaxKind = {}));
