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

#### 6.2.1 Definition
The cognitive complexity could be defined as below :

   >#### Cognitive Complexity
   > The Cognitive Complexity is a quantitative measure of the time required for a human to understand a program’s source code 
  

A project is maintainable if each method of each file is easily understandable. That is the goal of the cognitive complexity, which should be seen as the most important indicator of code maintainability.

The definition above needs to be clarified: what is difficult to understand and what is not ? Is an `if - else` more complex than a `for`, a `while` or a `switch` ? How many times a recursive method is more complex than a "normal" one ? Optional chaining or nullish coalescing clearly decrease the complexity of a method, but in which proportion ? There are no indisputable responses.

That's why we need to weight each complexity factor with a value which corresponds to its relative difficulty. To be able to do that, we need at first to define the measure unit of cognitive complexity.

#### 6.2.2 Measure unit

A measure unit must be relative to an "atomic" piece of code, something which can be defined accurately. That's why we use the below definition :

   >#### Measure unit
   > The measure unit of the Cognitive Complexity is the time required for a human to understand the logic door `if`. 

With this measure unit, we can calculate the Cognitive Complexity of any method with precision by comparing the time needed to understand it with the time required to understand to the logic door `if`. For example, a method with a Cognitive Complexity of 10 is a method which needs the same time to understand than a method with 10 `if`.

We must insist on an important point : the measure unit must be "atomic" to be defined precisely and to be able to quantify it "in the reality", ie by measuring the average time to understand it. So, the measure unit definition is based on the "logic door `if`" and not on "a `if` with sometimes inside".

The code below is not atomic, because there is a `console.log` inside it. The difficulty of a `console.log` is low, but not null. That's why we can't use the code below as measure unit.
```ts
if (a) {
    console.log(a);
}
``` 

We have the same problem with the code below, which is not atomic too. The `a` is not "nothing" and me bust be understand. Moreover, `if(a)` have different significations according to the used language. For example, in JavaScript / TypeScript, it doesn't mean "if a is true" but "if a is not a falsy value", which is slightly different.
```ts
if (a) {

}
``` 
The only real "atomic" code is the "mathematic" `if`, understood as a pure logic door :
```ts
if () {
    
}
``` 

#### 6.2.3 Complexity Index

With the definition of the measure unit of the cognitive complexity, we can now define the Complexity Index :

   > #### Complexity Index
   > The Complexity Index is the measure of the Cognitive Complexity of a program’s source code by considering the logic door `if` as measure unit.


### 6.3 Complexity Factors

The level of cognitive complexity depends on multiple factors of different importance which can be grouped in different categories. The following is an overview of these different factors with their different weights. However, we must keep in mind that these weights and categories are for now only based on intuition and feedbacks. ***They SHOULD NOT be interpreted as objective and definitive values***. These elements ARE NOT static and will change as the Cognitive Complexity knowledge will increase.

Every time someone will demonstrate that a factor should be weighted differently or that another category should be taken into account, this page will be updated with a new version number.

#### 6.3.1 Factor categories

- ***Atomic***

Each unbreakable piece of code have a weak Complexity Index, but not null. The name of a variable or a method, a keyword like `this`, `import`, `class`, `if`, ... are trivial, but they need to be red, taken in account and memorized by the human brain. A long method, even when it does not pose particular problems, is more long to understand than a short one with the same "density of complexity".

That's each of these trivial or "atomic" blocks should be weighted in a specific category : the Atomic Factor Category.

Example

```ts
if (a) {  // ------------------------- + 0.2 (0.1 for the "if" and 0.1 for the "a")
    console.log(a);  // -------------- + 0.3 (0.1 for the "console", 0.1 for the "log" and 0.1 for the "a")
}
```
=> Total of atomic complexity : 0.5 

- ***Structural***

Some code structures present an intrinsic difficulty. Independently of their use, the human brain needs some time to taken in account the logic implications of these code structures. That's what we call the ***structural category***.

In this category, we will find the loops (`for`, `while`, ...), the logic doors (`&&`, `||`), the conditions (`if`, `else`, `switch`, ...), the recursions, the callbacks, the regular expressions, etc. You will find the exhaustive list of the structural factors in the table below.  

- ***Nesting***

Independently of their intrinsic complexity, some elements add specific difficulty due to the nesting inside them.
 
Example
  
  The complexity of the code below is only due to the addition of the complexities of the two `if`.
  
```ts
if (a) { // ------------------------------ + x  
}
if (b) { // ------------------------------ + y
}
```
=> Total of atomic complexity : `x + y`

If the fisrt condition has a Complexity Index equals to `x` and if the second `if` equals to `y`, the total Complexity Index will be equal to `x + y`.

Now, if the same conditions are nested, an additional difficulty is due to the obligation to remember in the second `if` that the condition `a` must be true. This additional complexity is called `nesting complexity` and increases the Complexity Index of the source code, which will be strictly higher than `x + y`.

Example
  ```ts
if (a) { // ---------------------------------- + x  
    if (b) { // ------------------------------ + y + n (the nesting complexity due to the imbrication in the "if (a) {"
}
```
=> Total of atomic complexity : `x + y + n`

Genese complexity adds nesting complexity for the loops (`for`, `while`, ...), the conditions (`if`, `else`, `switch`, ...), the ternaries (`a = b ? 0 : 1`), the arrays (`a[b[c]]`) and the functions (`a = b.f(e => e + 1))`).

- ***Aggregation***

The principle of "aggregation complexity" is the same as with "nesting complexity", but is relative to consecutive elements and not nested elements. The idea is simple : an array is simple to understand, but an array of arrays is less trivial. The additional complexity is due to the aggregation of the elements. We find this problematic iin other cases, like regular expressions : they have a structural complexity (a regex is difficult for itself), but their length (the aggregation of its characters) increases considerably their difficulty. (other factors affect the complexity of the regular expressions, but we use for now only the length as a first approximation)

Example
  ```ts
const arr = a[b][c];
```

Another use case of the aggregation complexity is logic doors, which are simple to understand when they are similar and complicated when they are different and without brackets.

Example
```ts
if (a && b && c) { // ---------------------- Easy to understand (same logic doors)
    // ---
}
if (a && (b || c)) { // -------------------- Easy to understand (thanks to brackets)
    // ---
}
if (a && b || c) { // ----------------- Difficult to understand (due to the lack of brackets)
    // ---
}
``` 
The third example is more difficult than the first and the second => additional complexity (aggregation of different logic doors) 
  
- ***Recursion***

Recursivity is easy for machines, but not for humans. A developer will always need to take care about the implications of a recursion and its side effects. 

The category "recursion" includes `recursive methods` and `callbacks`.

Example
  ```ts
function f(a) {
    return f(a + 1);
}
```

#### 6.3.2 Table of weights (v1.0.0)

This table of weights should never be seen as the exact way to calculate the Complexity Index. It's only the best approximation on the basis of the current knowledge.

| Category | Factor | Weight | Example | Comments |
| ---      | ---    | :---:  | ---     | --- |
| Aggregation | Arrays | 1 | ```a[b][c] // ---- Aggregation cpx = 1```| |
| Aggregation | Regex | 0.1 by char | ```/[^.[\]]+/ // ---- Aggregation cpx = 0.8 (and 1 more for structural cpx of the regex)``` | |
| Aggregation | Different logic doors | 1 | ```if (a && b &#124;&#124; c) // ---- Aggregation cpx = 1 (and 1 more for structural cpx)``` | The brackets cancel the aggregation complexity |
| Atomic | Atomic | 0.1 | ```console.log(3) // ---- Atomic cpx = 0.3 (3 atoms)``` | Applies to each identifier, parameter, keyword, etc. |
| Nesting | Arrays | 1.5 | ```a[b[c]]``` | |
| Nesting | Conditions | 0.5 | ```if (a) { <br /> if (b) { // ---- Nesting cpx = 0.5 <br/> if (c) { // ---- Nesting cpx = 1 <br/> } <br/> }``` | Applies to `if`, `else`, `else if`, `switch` | 
| Nesting | Loops | 0.5 | ```for (const a of arr) { <br/>    for (const b of otherArr) { // ---- Nesting cpx = 0.5 <br/>    } <br/> }``` | Applies to `for`, `forEach`, `do ... while` |
| Nesting | Ternaries | 1 | ```a = b ? c ? : 0 : 1;``` | |
| Recursion | Recursive methods | 3 | ```f(a) { <br/> return f(a + 1); <br/> }``` | |
| Recursion | Callbacks | 2 | ```f(a) { <br/>return a(2); <br/> }``` | |
| Structural | Conditions | 1 | ```if (a) { ... }``` |  Applies to `if`, `else`, `else if`, `switch` |
| Structural | Functions | 1 | ```if (a) { ... }``` |  Applies to functions and methods declarations |
| Structural | Jumps | 1 | ```for (const a of arr) { <br/>    if (b) { <br/>        continue;<br/>    }<br/>}``` |  Applies to elements breaking loops |
| Structural | Logic door | 1 | `&&` or `&#124;&#124` | |
| Structural | Loops | 1 | ```for (const a of arr) { ... }``` |  Applies to `for`, `forEach`, `do ... while` |
| Structural | Regex | 1 | ```/[^.[\]]+/ // ---- Structural cpx = 1 (and 0.8 more for aggregation cpx)``` | |
| Structural | Ternary | 1 | ```const a = b ? 0 : 1;``` | |

 

## 7. How to contribute ?

### 7.1 Confirm, refute, specify

The estimation of the cognitive complexity will always be an approximation. The time required for a human to understand a source code depends of multiple factors 

### 7.1 Add new languages

We developed Genese Complexity at first for TypeScript files, but you can now "plug" any language into this module.

What does it mean ? To be simple, Genese Complexity parses a Json file with a specific format : ***JsonAst***. This format corresponds to a simplified AST (Abstract Syntax Tree) of the source code. So if you want to be able to "plug" your language into Genese Complexity, you "just" need to convert the AST structure which is specific to your language to JsonAst format. In other words, your AST nodes must "match" with the AstNodes of the JsonAst format.

As Genese Complexity was developed for TypeScript files, if your JsonAst files respect exactly the Typescript AST structure and conventions, Genese Complexity will be able to understand it. If you want to understand how TypeScript AST "runs", you can make some trials in the [TypeScript AST Viewer](https://ts-ast-viewer.com/#code/KYDwDg9gTgLgBAYwDYEMDOa4HFgDthrADCEAtmEqAJYwCecA3gFBNxtygrmUAUKAlI1bsRCCLjQRKAOiQQA5n34BuYWwC+auE01A).

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
