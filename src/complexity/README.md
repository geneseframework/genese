# Genese Complexity

Genese Complexity is a part of the [genese framework]('https://github.com/geneseframework/genese') which improves you to increase your code quality by analysing the cognitive complexity and the cyclomatic complexity of all the Typescript files of your project.
This module creates an HTML report displaying the complexities scores of each folder, file or method which will give you an overview of the code quality of your project. Moreover, you will find for each method the reasons of the complexity score which will help you to refactor your code more easily.


![Dashboard Genese Complexity](./readme-dashboard.png?raw=true "Dashboard")

## Table of Contents
* [Why use Genese Complexity ?](#1-why-use-genese-complexity-)
* [Installation](#2-installation)
* [Usage](#3-usage)
* [Interpretation of results](#4-interpretation-of-results)
* [Configuration](#5-configuration)
* [Documentation](#6-documentation)
* [How to contribute ?](#7-how-to-contribute-)


## 1. Why use Genese Complexity ?

Genese Complexity is an audit tool which allows you to identify quickly the bad practices concerning cognitive or cyclomatic complexity. You will be able to find quickly the methods with too high complexity score (error) or which are near this threshold (warning) and fix the different bad smells.

## 2. Installation

Genese complexity is a part of the genese module itself, so if you installed globally genese yet, you have nothing to do. If not, please install globally the genese module :

```sh 
npm i -g genese
```

## 3. Usage

Genese complexity is launched with the Genese CLI included in the genese module. The main command-line is

```sh 
genese cpx [directory]
```

The "directory" param is the folder of the project to audit. It can be relative or absolute.

***Example :***
```sh 
genese cpx ./src/
```

Please note that the slash at the end of the path is mandatory.

This command line will generate a report in the folder `genese/complexity/reports` (it can be customized) named `folder-report.html`. You just need to open it in a browser to display the results.

## 4. Interpretation of results

### 4.1 Folder reports

The dashboard's header presents the global statistics of the analyzed project. These scores will give you an overview of its size.

The main part of the page consist in two pairs of charts : the left one is about cognitive complexity and the other one about cyclomatic complexity. The "doughnut chart" is an overview of the distribution of the project's methods statuses (correct, warning and error). The information on the left are reminding warning and error thresholds (which can be customized), and display the number of methods by status.
 
 The bar charts display the number of methods by complexity score. The first array displays the detailed information of each subfolder of the current one. The second presents informations of the files inside the current folder (but not the files inside its subfolders), and the third array displays the complexity scores of each method of each file located in the current folder or its subloders, sorted by decreasing cognitive complexity score.
 
 ### 4.2 File reports
 
 As folder reports, the file reports display complexity statistics of its methods. In addition, you will find detailed information of each of its methods, with explanations of the calculation mode of their cognitive complexity.
 
 ## 5. Configuration
 
 Some parameters are configurable by creating a file geneseconfig.json located on the folder where you will enter the command-line. This file must have this form :
 
 ```json 
{
    "complexity": {
        "option": "value"
    }
} 
```
 
 ### 5.1 Thresholds
 
 You can customize the warning and error thresholds of each kind of complexity like this :
 
 ```json 
{
    "complexity": {
        "cognitiveCpx": {
            "errorThreshold": 15, 
            "warningThreshold": 10
        },
        "cyclomaticCpx": {
            "errorThreshold": 15,
            "warningThreshold": 10
        },
    }
} 
```

The values by default are :

 ```json 
{
    "complexity": {
        "cognitiveCpx": {
            "errorThreshold": 10,
            "warningThreshold": 5
        },
        "cyclomaticCpx": {
            "errorThreshold": 10,
            "warningThreshold": 5
        },
    }
} 
```

### 5.2 Folders to ignore

You can ignore some folders like this :

```json
{
    "complexity": {
        "ignore": [
            ".git",
            ".idea",
            "api",
            "/node_modules",
            "./genese"
        ]
    }
}
``` 

The folders ignored by default are `/node_modules` and `./genese`.

### 5.3 Path of folder to analyse

By default, the folder to analyse is the folder where you enter the command-line. You can change it like this :

```json
{
    "complexity": {
        "pathFolderToAnalyze": "./src/"
    }
}
``` 

The last character must be a slash.

### 5.4 Reports path

By default, the genese complexity report will be located here : `current_folder/genese/`. You can change it like this:

```json
{
    "complexity": {
        "pathReports": "./my-report-folder"
    }
}
```

## 6. Documentation

### 6.1 Cyclomatic complexity

The cyclomatic complexity represents the difficulty to test a given method. The cyclomatic score is a measure of the testability of your code.

The force of the cyclomatic complexity is its simplicity: approximately, all breakflows (for, if, switch, ...) increase the score of 1. This simplicity is giving you an objective overview of the quality of your code, without subjective interpretations. Unfortunately, this lack of subjectivity involves the low relevance of the cyclomatic complexity when you want to measure the ***real maintainability*** of your code. If you want to be sure that your code will be easy to maintain, you must ask you this question: ***as a developer***, would it be easy to understand this code ?

If you are a human, you will read your code differently than a machine would do it. So if you want to know if your code is really maintainable, you must look at its cognitive complexity. 

### 6.2 Cognitive complexity

The cognitive complexity could be defined as ***a measure of the cognitive effort to understand some code***. 

A project is maintainable if each method of each file is easily understandable and that is the goal of the cognitive complexity, which should be seen as the most important indicator of code maintainability.

The definition above is perfect, but needs to be clarified. The "cognitive effort" is a concept easy to understand, but complex to define. There is no scientific definition of this concept : what is complex to understand and what is not ? Is an "if - else" more complex than a "for", a "while" or a "switch" ? How many times a recursive method is more complex than a "normal" one ? Shorthands like optional chaining or nullish coalescing clearly decrease the complexity of a method, but in which proportion ? There are no indisputable responses. We are condemned to weight each complexity factor with an arbitrary value which corresponds to our intuition.

The first try to define algorithmic rules allowing to calculate the cognitive complexity was done by Ann Campbell for SonarCloud in 2017. She used three basic rules to calculate the cognitive complexity score :

      1. Ignore structures that allow multiple statements to be readably shorthanded into one
      2. Increment (add one) for each break in the linear flow of the code
      3. Increment when flow-breaking structures are nested

This calculation method involves the following elements :

* Increment for breaks in the linear flow

    - Loop structures : for, while, do while, ... : + 1
    - Conditionals : ternary operators, if, ... : + 1
    - else, else if, ... : + 1 
    - catch : + 1 ("try" and "finally" are ignored)
    - switch : + 1 
    - logic doors : + 1 for the first one and + 1 for the next one if different of the previous one (a && b => +1 ; a && b && c => + 1 ; a && b || c => + 2)
    - recursion : + 1   

* Increment for nesting structures

    - Loop structures : for, while, do while, ... : + 1
    - Conditionals : ternary operators, if, ... : + 1
    - else, else if, ... : 0 (no nesting increment because *"the mental cost has already been paid when reading the if"*.
    - catch : + 1 ("try" and "finally" are ignored)
    - switch : + 1 (globally, not for each "case")
    - logic doors : 0   
    - recursion : 0   

## 7. How to contribute ?

### 7.1 Adding new languages

Genese Complexity was developed at first for TypeScript files, but you can now "plug" any language into this module.

What does it mean ? To be simple, Genese Complexity parses a Json file with a specific format : ***JsonAst***. This format corresponds to a simplified AST (Abstract Syntax Tree) of the source code. So if you want to be able to "plug" your language into Genese Complexity, you "just" need to convert the AST structure which is specific to your language to JsonAst format. In other words, your AST nodes must "match" with the AstNodes of the JsonAst format.

As Genese Complexity was created for TypeScript files, if your JsonAst files respect exactly the Typescript AST structure and conventions, Genese Complexity will be able to understand it. If you want to understand how TypeScript AST "runs", you can make some trials in the [TypeScript AST Viewer](https://ts-ast-viewer.com/#code/KYDwDg9gTgLgBAYwDYEMDOa4HFgDthrADCEAtmEqAJYwCecA3gFBNxtygrmUAUKAlI1bsRCCLjQRKAOiQQA5n34BuYWwC+auE01A).

There are hundreds kinds of TypeScript AST nodes, so it can be fastidious to "link" all of them to the AST nodes of your language. Fortunately, JsonAst only needs few kinds of nodes, not all the hundreds of TypeScript AST. You will find below the list of the AstNode kinds that you will need. 

#### 7.1.1 Kinds of AstNodes

You will find below the list of all the different kinds of AstNodes. If you want to understand exactly what they mean, you can refer yourself to the TypeScript documentation : for example, the AstNode kind "IfStatement" refers to the TypeScript AST node ts.SyntaxKind.IfStatement. The exhaustive list of TypeScript SyntakKinds are accessible [here](https://github.com/microsoft/TypeScript/blob/master/lib/typescript.d.ts) (from line 77 to 447).   

| AstNode Kind | Example | Comments |
| ------------ | ------- | -------- |
| AmpersandAmpersandToken | `&&` | The AND logic door. |
| ArrowFunction | `() => void`  |   |
| BarBarToken | `\|\|` | The OR logic door. |
| BinaryExpression | `a > 0 <br /> a === b`  | Comparison between two elements. |
| Block | `{ .... }`  | Abstract node containing some children nodes, like `IfStatement`. This AstNode doesn't increase complexity (empty AstNode). |
| CallExpression |  `a.filter(e => e + 1)` | Abstract node containing a call to a function. In this example, the CallExpression contains a first child which is a PropertyExpression (the a.filter) and a second one which is an ArrowFunction (the e => e + 1). |
| CatchClause | `try { ... } <br />catch(error) { ... }` | This node is considered as a Conditional node and increases the nesting complexity. |
| ClassDeclaration | `class MyClass { ... }` | Abstract node designating a declaration of a class. This node is the root node of a class. This AstNode doesn't increase complexity (empty AstNode). |
| ConditionalExpression | `a = b ? 0 : 1;` | This node is considered as a Conditional node and increases the nesting complexity. In this example, the ConditionalExpression node have 5 children : Identifier, QuestionToken, NumericLiteral, ColonToken and NumericLiteral. |
| DoStatement | `do { ... }` | Do instruction. Increases the nesting complexity. |
| ElementAccessExpression | `a[b]` | Considered as an array by Genese Complexity. In this example, the ElementAccessExpression is a node with two children : an Identifier and another Identifier. |
| EndOfFileToken | `... }` | The last element of the source code. |
| ExpressionStatement | `a = b ? 0 : 1; <br /> a.filter(e => e + 1)` | Abstract node containing an expression, like a BinaryExpression or a CallExpression. This AstNode doesn't increase complexity (empty AstNode). |
| ForStatement | `for (let i = 0; i < 2; i++) { ... }`  | For loop. Increases the nesting complexity. Caution : a.forEach(...) is considered as a PropertyAccessExpression, not as a ForStatement, but Genese Complexity analysis as a "for" loop. |
| ForInStatement | `for (let a of arr) { ... }` | For loop with `in` statement. Increases the nesting complexity. |
| ForOfStatement | `for (let a of arr) { ... }` | For loop with `of` statement. Increases the nesting complexity. |
| FunctionDeclaration | `function f() { ... }` | Abstract node designating a declaration of a function. This AstNode doesn't increase complexity (empty AstNode). |
| FunctionExpression | `f(function(b) { ... }` | Abstract node designating a function expression. Increases the nesting complexity. |
| Identifier | `f(a) { ... }` | The node corresponding to the identifier of a variable, a function, etc. In this example, there are two identifiers : `f` and `a`. An identifier is considered by Genese Complexity as an "atomic" node which increases the "atomic" complexity. |
| IfStatement | `if(a) { ... }` | The IF condition. Increases the nesting complexity. |
| MethodDeclaration | `myMethod() { ... }` | Abstract node designating a declaration of a method. This node is the root node of a class. This AstNode doesn't increase complexity (empty AstNode). |
| Parameter | `myMethod(a) { ... }` | Abstract node designating a parameter. Caution : the Parameter `a` is different than the Identifier `a`, which is a child of the node Parameter. This AstNode doesn't increase complexity (empty AstNode). |
| PropertyAccessExpression | `a.b = 3;` | Abstract node designating the access to a given property. The first child (`a`) is the expression and the second (`b`) is the property. This AstNode doesn't increase complexity (empty AstNode). |
| RegularExpressionLiteral | `/a-z/g` | Regular expression. |
| SwitchStatement | `switch(a) { ... }` | Switch statement. Increases the nesting complexity. |
| VariableDeclarationList | `for (const elt of arr) { ... }` | Abstract node declaring a list of variables. In this example, the VariableDeclarationList is `const elt`. This AstNode doesn't increase complexity (empty AstNode). |
| VariableStatement | `let a = 3;` | Abstract node declaring a variable. This AstNode doesn't increase complexity (empty AstNode). |
| WhileStatement | `while (a < 10) { ... }` | While loop. Increases the nesting complexity. |


Genese Complexity will consider all the other kinds of AST nodes as "atomic" nodes. That means that every node of your AST which will be present in the JsonAst file will add a cognitive complexity corresponding to "atomic" nodes, as "StringLiteral", "TrueKeyword", etc. If you want that some kinds of nodes not to increase complexity, you will be able to set a property "empty" to true in the corresponding AstNode.

#### 7.1.2 JsonAst specifications


##### ***JsonAst***

This is the root document (the .json file itself)

- Fixed fields

| Field name | Type | Required | Description |
| ---------- | ---- | -------- | ----------- |
| astFolder  | AstFolder | yes | The object containing all the information about the folder to analyze |



##### ***astFolder***

Corresponds to a folder to analyze.

- Fixed fields

| Field name | Type | Required | Description |
| ---------- | ---- | -------- | ----------- |
| astFiles  | AstFile[] | no | The array of AstFile corresponding to the files inside the folder (but not inside its subfolders) |
| children | AstFolder[] | no | The array of AstFolder corresponding to the subfolders of this AstFolder |
| path | String | yes | The absolute path of the folder |


##### ***astFile***

Corresponds to a file to analyze.

- Fixed fields

| Field name | Type | Required | Description |
| ---------- | ---- | -------- | ----------- |
| astNode  | AstNode | yes | The AstNode corresponding to the sourceFile itself (in Typescript, it is ts.SourceFile) |
| name | String | yes | The name of the file |
| text | String | yes | The source code of the file, including break lines |


##### ***astNode***

Corresponds to an AST node of the source code of a file.

- Fixed fields

| Field name | Type | Required | Description |
| ---------- | ---- | -------- | ----------- |
| children | AstNode[] | no | The array of AstNode corresponding to the children of the AST node |
| empty | Boolean | no | If true, the corresponding AstNode will not add any complexity |
| end  | Integer | yes | The position of the last character of the AST node in the source code of the file |
| kind | SyntaxKind | yes | The kind of the AST node |
| pos  | Integer | yes | The position of the first character of the AST node in the source code of the file |
| name | String | yes/no | The name of the AST node. This field MUST be present in the following cases, and optional in the others. ClassDeclaration, MethodDeclaration, FunctionDeclaration, Parameter, Identifier |


#### 7.1.3 Structure of the AST nodes

You must respect some conventions to be able to create JsonAst files correctly interpreted by Genese Complexity.

-  ***IfStatement***
   
   Supposing to be in this case :
   
```ts
if (a) {
    // ---
} else if (b) {
    // ---
} else {
    // ---
}
```

Your JsonAst MUST be structured like this :

```json
{
    "kind": "IfStatement",
    "children": [
    	{
    		"kind": "Identifier",
    		"name": "a"
    	},
    	{
    		"kind": "Block"
    	},
    	{
    		"kind": "IfStatement",
    		"children": [
    			{
    				"kind": "Identifier",
    				"name": "b"
    			},
    			{
    				"kind": "Block"
    			},
    			{
    				"kind": "Block"
    			}
    		]
    	}
    ]
}
```

The AstNode "IfStatement" always have a first son which is the inside of the brackets and a second son which is inside the "if condition". This AstNode CAN have a third son which is the AstNode corresponding to the "ElseStatement".

#### 7.1.4 Exhaustive list of the kinds of AstNode

This list corresponds to the [ts.SyntaxKind enum](https://github.com/microsoft/TypeScript/blob/master/lib/typescript.d.ts) (from line 77 to 447)
```
    Unknown
    EndOfFileToken
    SingleLineCommentTrivia
    MultiLineCommentTrivia
    NewLineTrivia
    WhitespaceTrivia
    ShebangTrivia
    ConflictMarkerTrivia
    NumericLiteral
    BigIntLiteral
    StringLiteral
    JsxText
    JsxTextAllWhiteSpaces
    RegularExpressionLiteral
    NoSubstitutionTemplateLiteral
    TemplateHead
    TemplateMiddle
    TemplateTail
    OpenBraceToken
    CloseBraceToken
    OpenParenToken
    CloseParenToken
    OpenBracketToken
    CloseBracketToken
    DotToken
    DotDotDotToken
    SemicolonToken
    CommaToken
    QuestionDotToken
    LessThanToken
    LessThanSlashToken
    GreaterThanToken
    LessThanEqualsToken
    GreaterThanEqualsToken
    EqualsEqualsToken
    ExclamationEqualsToken
    EqualsEqualsEqualsToken
    ExclamationEqualsEqualsToken
    EqualsGreaterThanToken
    PlusToken
    MinusToken
    AsteriskToken
    AsteriskAsteriskToken
    SlashToken
    PercentToken
    PlusPlusToken
    MinusMinusToken
    LessThanLessThanToken
    GreaterThanGreaterThanToken
    GreaterThanGreaterThanGreaterThanToken
    AmpersandToken
    BarToken
    CaretToken
    ExclamationToken
    TildeToken
    AmpersandAmpersandToken
    BarBarToken
    QuestionToken
    ColonToken
    AtToken
    QuestionQuestionToken
    BacktickToken
    EqualsToken
    PlusEqualsToken
    MinusEqualsToken
    AsteriskEqualsToken
    AsteriskAsteriskEqualsToken
    SlashEqualsToken
    PercentEqualsToken
    LessThanLessThanEqualsToken
    GreaterThanGreaterThanEqualsToken
    GreaterThanGreaterThanGreaterThanEqualsToken
    AmpersandEqualsToken
    BarEqualsToken
    CaretEqualsToken
    Identifier
    PrivateIdentifier
    BreakKeyword
    CaseKeyword
    CatchKeyword
    ClassKeyword
    ConstKeyword
    ContinueKeyword
    DebuggerKeyword
    DefaultKeyword
    DeleteKeyword
    DoKeyword
    ElseKeyword
    EnumKeyword
    ExportKeyword
    ExtendsKeyword
    FalseKeyword
    FinallyKeyword
    ForKeyword
    FunctionKeyword
    IfKeyword
    ImportKeyword
    InKeyword
    InstanceOfKeyword
    NewKeyword
    NullKeyword
    ReturnKeyword
    SuperKeyword
    SwitchKeyword
    ThisKeyword
    ThrowKeyword
    TrueKeyword
    TryKeyword
    TypeOfKeyword
    VarKeyword
    VoidKeyword
    WhileKeyword
    WithKeyword
    ImplementsKeyword
    InterfaceKeyword
    LetKeyword
    PackageKeyword
    PrivateKeyword
    ProtectedKeyword
    PublicKeyword
    StaticKeyword
    YieldKeyword
    AbstractKeyword
    AsKeyword
    AssertsKeyword
    AnyKeyword
    AsyncKeyword
    AwaitKeyword
    BooleanKeyword
    ConstructorKeyword
    DeclareKeyword
    GetKeyword
    InferKeyword
    IsKeyword
    KeyOfKeyword
    ModuleKeyword
    NamespaceKeyword
    NeverKeyword
    ReadonlyKeyword
    RequireKeyword
    NumberKeyword
    ObjectKeyword
    SetKeyword
    StringKeyword
    SymbolKeyword
    TypeKeyword
    UndefinedKeyword
    UniqueKeyword
    UnknownKeyword
    FromKeyword
    GlobalKeyword
    BigIntKeyword
    OfKeyword
    QualifiedName
    ComputedPropertyName
    TypeParameter
    Parameter
    Decorator
    PropertySignature
    PropertyDeclaration
    MethodSignature
    MethodDeclaration
    Constructor
    GetAccessor
    SetAccessor
    CallSignature
    ConstructSignature
    IndexSignature
    TypePredicate
    TypeReference
    FunctionType
    ConstructorType
    TypeQuery
    TypeLiteral
    ArrayType
    TupleType
    OptionalType
    RestType
    UnionType
    IntersectionType
    ConditionalType
    InferType
    ParenthesizedType
    ThisType
    TypeOperator
    IndexedAccessType
    MappedType
    LiteralType
    ImportType
    ObjectBindingPattern
    ArrayBindingPattern
    BindingElement
    ArrayLiteralExpression
    ObjectLiteralExpression
    PropertyAccessExpression
    ElementAccessExpression
    CallExpression
    NewExpression
    TaggedTemplateExpression
    TypeAssertionExpression
    ParenthesizedExpression
    FunctionExpression
    ArrowFunction
    DeleteExpression
    TypeOfExpression
    VoidExpression
    AwaitExpression
    PrefixUnaryExpression
    PostfixUnaryExpression
    BinaryExpression
    ConditionalExpression
    TemplateExpression
    YieldExpression
    SpreadElement
    ClassExpression
    OmittedExpression
    ExpressionWithTypeArguments
    AsExpression
    NonNullExpression
    MetaProperty
    SyntheticExpression
    TemplateSpan
    SemicolonClassElement
    Block
    EmptyStatement
    VariableStatement
    ExpressionStatement
    IfStatement
    DoStatement
    WhileStatement
    ForStatement
    ForInStatement
    ForOfStatement
    ContinueStatement
    BreakStatement
    ReturnStatement
    WithStatement
    SwitchStatement
    LabeledStatement
    ThrowStatement
    TryStatement
    DebuggerStatement
    VariableDeclaration
    VariableDeclarationList
    FunctionDeclaration
    ClassDeclaration
    InterfaceDeclaration
    TypeAliasDeclaration
    EnumDeclaration
    ModuleDeclaration
    ModuleBlock
    CaseBlock
    NamespaceExportDeclaration
    ImportEqualsDeclaration
    ImportDeclaration
    ImportClause
    NamespaceImport
    NamedImports
    ImportSpecifier
    ExportAssignment
    ExportDeclaration
    NamedExports
    NamespaceExport
    ExportSpecifier
    MissingDeclaration
    ExternalModuleReference
    JsxElement
    JsxSelfClosingElement
    JsxOpeningElement
    JsxClosingElement
    JsxFragment
    JsxOpeningFragment
    JsxClosingFragment
    JsxAttribute
    JsxAttributes
    JsxSpreadAttribute
    JsxExpression
    CaseClause
    DefaultClause
    HeritageClause
    CatchClause
    PropertyAssignment
    ShorthandPropertyAssignment
    SpreadAssignment
    EnumMember
    UnparsedPrologue
    UnparsedPrepend
    UnparsedText
    UnparsedInternalText
    UnparsedSyntheticReference
    SourceFile
    Bundle
    UnparsedSource
    InputFiles
    JSDocTypeExpression
    JSDocAllType
    JSDocUnknownType
    JSDocNullableType
    JSDocNonNullableType
    JSDocOptionalType
    JSDocFunctionType
    JSDocVariadicType
    JSDocNamepathType
    JSDocComment
    JSDocTypeLiteral
    JSDocSignature
    JSDocTag
    JSDocAugmentsTag
    JSDocImplementsTag
    JSDocAuthorTag
    JSDocClassTag
    JSDocPublicTag
    JSDocPrivateTag
    JSDocProtectedTag
    JSDocReadonlyTag
    JSDocCallbackTag
    JSDocEnumTag
    JSDocParameterTag
    JSDocReturnTag
    JSDocThisTag
    JSDocTypeTag
    JSDocTemplateTag
    JSDocTypedefTag
    JSDocPropertyTag
    SyntaxList
    NotEmittedStatement
    PartiallyEmittedExpression
    CommaListExpression
    MergeDeclarationMarker
    EndOfDeclarationMarker
    SyntheticReferenceExpression
    Count
    FirstAssignment
    LastAssignment
    FirstCompoundAssignment
    LastCompoundAssignment
    FirstReservedWord
    LastReservedWord
    FirstKeyword
    LastKeyword
    FirstFutureReservedWord
    LastFutureReservedWord
    FirstTypeNode
    LastTypeNode
    FirstPunctuation
    LastPunctuation
    FirstToken
    LastToken
    FirstTriviaToken
    LastTriviaToken
    FirstLiteralToken
    LastLiteralToken
    FirstTemplateToken
    LastTemplateToken
    FirstBinaryOperator
    LastBinaryOperator
    FirstStatement
    LastStatement
    FirstNode
    FirstJSDocNode
    LastJSDocNode
    FirstJSDocTagNode
    LastJSDocTagNode

```
