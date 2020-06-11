"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _cpxIndex, _displayedCode, _name, _originalCode, _treeNode;
Object.defineProperty(exports, "__esModule", { value: true });
const ast_service_1 = require("../../services/ast.service");
const cyclomatic_complexity_service_1 = require("../../services/cyclomatic-complexity.service");
const options_1 = require("../options");
const evaluation_status_enum_1 = require("../../enums/evaluation-status.enum");
const complexity_type_enum_1 = require("../../enums/complexity-type.enum");
const evaluable_model_1 = require("../evaluable.model");
const code_model_1 = require("../code/code.model");
const code_service_1 = require("../../services/code.service");
const factor_category_enum_1 = require("../../enums/factor-category.enum");
const code_line_model_1 = require("../code/code-line.model");
const cpx_factors_1 = require("../../cpx-factors");
const log_service_1 = require("../../services/tree/log.service");
/**
 * Element of the TreeNode structure corresponding to a given method
 */
class TreeMethod extends evaluable_model_1.Evaluable {
    constructor() {
        super();
        this.codeService = new code_service_1.CodeService(); // The service managing Code objects
        this.cognitiveStatus = evaluation_status_enum_1.MethodStatus.CORRECT; // The cognitive status of the method
        _cpxIndex.set(this, undefined); // The complexity index of the method
        this.cyclomaticStatus = evaluation_status_enum_1.MethodStatus.CORRECT; // The cyclomatic status of the method
        _displayedCode.set(this, undefined); // The code to display in the report
        _name.set(this, undefined); // The name of the method
        _originalCode.set(this, undefined); // The original Code of the method (as Code object)
        // #treeFile?: TreeFile = undefined;                               // The TreeFile which contains the TreeMethod
        _treeNode.set(this, undefined); // The AST of the method itself
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get displayedCode() {
        return __classPrivateFieldGet(this, _displayedCode);
    }
    get cpxIndex() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _cpxIndex)) !== null && _a !== void 0 ? _a : this.calculateCpxIndex();
    }
    get name() {
        var _a;
        if (__classPrivateFieldGet(this, _name)) {
            return __classPrivateFieldGet(this, _name);
        }
        __classPrivateFieldSet(this, _name, ast_service_1.Ast.getMethodName((_a = __classPrivateFieldGet(this, _treeNode)) === null || _a === void 0 ? void 0 : _a.node));
        return __classPrivateFieldGet(this, _name);
    }
    get originalCode() {
        return __classPrivateFieldGet(this, _originalCode);
    }
    set originalCode(code) {
        __classPrivateFieldSet(this, _originalCode, code);
    }
    get position() {
        var _a;
        return (_a = this.treeNode) === null || _a === void 0 ? void 0 : _a.position;
    }
    get sourceFile() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _treeNode)) === null || _a === void 0 ? void 0 : _a.sourceFile;
    }
    // get treeFile(): TreeFile {
    //     return this.#treeFile;
    // }
    //
    //
    // set treeFile(treeFile: TreeFile) {
    //     this.#treeFile = treeFile;
    // }
    get treeNode() {
        return __classPrivateFieldGet(this, _treeNode);
    }
    set treeNode(treeNode) {
        __classPrivateFieldSet(this, _treeNode, treeNode);
    }
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    /**
     * Evaluates the complexities of this TreeMethod
     */
    evaluate() {
        var _a;
        this.createDisplayedCode();
        log_service_1.LogService.printAllChildren(this.treeNode);
        this.cognitiveStatus = this.getComplexityStatus(complexity_type_enum_1.ComplexityType.COGNITIVE);
        this.cyclomaticCpx = cyclomatic_complexity_service_1.CyclomaticComplexityService.calculateCyclomaticComplexity((_a = __classPrivateFieldGet(this, _treeNode)) === null || _a === void 0 ? void 0 : _a.node);
        this.cyclomaticStatus = this.getComplexityStatus(complexity_type_enum_1.ComplexityType.CYCLOMATIC);
    }
    /**
     * Calculates the Complexity Index of the method
     */
    calculateCpxIndex() {
        var _a, _b, _c;
        if (!(((_b = (_a = __classPrivateFieldGet(this, _displayedCode)) === null || _a === void 0 ? void 0 : _a.lines) === null || _b === void 0 ? void 0 : _b.length) > 0)) {
            this.createDisplayedCode();
        }
        let count = 0;
        for (const line of (_c = __classPrivateFieldGet(this, _displayedCode)) === null || _c === void 0 ? void 0 : _c.lines) {
            count += line.cpxFactors.total;
        }
        return +count.toFixed(2);
    }
    /**
     * Get the complexity status of the method for a given complexity type
     * @param cpxType
     */
    getComplexityStatus(cpxType) {
        let status = evaluation_status_enum_1.MethodStatus.WARNING;
        if ((cpxType === complexity_type_enum_1.ComplexityType.COGNITIVE && this.cpxIndex <= options_1.Options.cognitiveCpx.warningThreshold)
            ||
                (cpxType === complexity_type_enum_1.ComplexityType.CYCLOMATIC && this.cyclomaticCpx <= options_1.Options.cyclomaticCpx.warningThreshold)) {
            status = evaluation_status_enum_1.MethodStatus.CORRECT;
        }
        else if ((cpxType === complexity_type_enum_1.ComplexityType.COGNITIVE && this.cpxIndex > options_1.Options.cognitiveCpx.errorThreshold)
            ||
                (cpxType === complexity_type_enum_1.ComplexityType.CYCLOMATIC && this.cyclomaticCpx > options_1.Options.cyclomaticCpx.errorThreshold)) {
            status = evaluation_status_enum_1.MethodStatus.ERROR;
        }
        return status;
    }
    /**
     * Creates the code to display with the original code of a TreeNode
     * @param tree  // The TreeNode to analyse
     */
    createDisplayedCode(tree = this.treeNode) {
        this.setDisplayedCodeLines();
        this.setCpxFactorsToDisplayedCode(tree, false);
        __classPrivateFieldGet(this, _displayedCode).setLinesDepthAndNestingCpx();
        this.addCommentsToDisplayedCode();
        this.calculateCpxIndex();
        __classPrivateFieldGet(this, _displayedCode).setTextWithLines();
    }
    /**
     * Sets the code to display in the TreeFile's report
     */
    setDisplayedCodeLines() {
        __classPrivateFieldSet(this, _displayedCode, new code_model_1.Code());
        for (const line of this.originalCode.lines) {
            const displayedLine = new code_line_model_1.CodeLine();
            displayedLine.issue = line.issue;
            displayedLine.text = line.text;
            displayedLine.position = line.position;
            __classPrivateFieldGet(this, _displayedCode).lines.push(displayedLine);
        }
    }
    /**
     * Sets the CodeLines of the displayed Code of this method
     * @param tree
     */
    setCpxFactorsToDisplayedCode(tree, startedUncommentedLines = false) {
        // let topNode = isTopNode;
        for (const childTree of tree.children) {
            let issue = this.codeService.getLineIssue(__classPrivateFieldGet(this, _originalCode), childTree.position - this.position);
            const codeLine = __classPrivateFieldGet(this, _displayedCode).lines[issue];
            if (ast_service_1.Ast.isElseStatement(childTree.node)) {
                childTree.cpxFactors.basic.node = cpx_factors_1.cpxFactors.basic.node;
                issue--;
            }
            console.log('zzz', tree.kind, childTree.kind);
            if (!startedUncommentedLines && tree.isFunctionOrMethodDeclaration && !codeLine.isCommented) {
                console.log('FIRSTTTT', codeLine.text);
                this.increaseLineCpxFactors(tree, codeLine);
                startedUncommentedLines = true;
            }
            else if (startedUncommentedLines) {
                console.log('AFTER FIRST COMMENTED LINE', codeLine.text);
                this.increaseLineCpxFactors(childTree, codeLine, false);
            }
            // startedUncommentedLines = startedUncommentedLines || !codeLine.isCommented;
            __classPrivateFieldGet(this, _displayedCode).lines[issue].treeNodes.push(childTree);
            this.setCpxFactorsToDisplayedCode(childTree, startedUncommentedLines);
        }
    }
    increaseLineCpxFactors(tree, codeLine, isTopNode) {
        console.log('RECURSION ?', tree.kind, tree.isRecursiveMethod, codeLine.cpxFactors.structural.recursion);
        if (!codeLine.isCommented) {
            codeLine.cpxFactors = codeLine.cpxFactors.add(tree === null || tree === void 0 ? void 0 : tree.cpxFactors);
            // console.log('RECURSION EQUALS ', tree.kind, codeLine.cpxFactors.structural.recursion)
        }
    }
    /**
     * Adds information about complexity increment reasons for each line of the displayed code
     */
    addCommentsToDisplayedCode() {
        __classPrivateFieldGet(this, _displayedCode).lines
            .filter(line => line.cpxFactors.total > 0)
            .forEach(line => {
            let comment = `+${line.cpxFactors.total.toFixed(1)} Complexity index (+${line.cpxFactors.totalBasic.toFixed(1)} ${factor_category_enum_1.FactorCategory.BASIC}`;
            comment = line.cpxFactors.totalAggregation > 0 ? `${comment}, +${line.cpxFactors.totalAggregation} ${factor_category_enum_1.FactorCategory.AGGREGATION}` : comment;
            comment = line.cpxFactors.totalNesting > 0 ? `${comment}, +${line.cpxFactors.totalNesting} nesting` : comment;
            comment = line.cpxFactors.totalDepth > 0 ? `${comment}, +${line.cpxFactors.totalDepth} depth` : comment;
            comment = line.cpxFactors.totalStructural > 0 ? `${comment}, +${line.cpxFactors.totalStructural} ${factor_category_enum_1.FactorCategory.STRUCTURAL}` : comment;
            comment = `${comment})`;
            __classPrivateFieldGet(this, _displayedCode).lines[line.issue - 1].text = __classPrivateFieldGet(this, _originalCode).addComment(comment, __classPrivateFieldGet(this, _originalCode).lines[line.issue - 1]);
        });
    }
}
exports.TreeMethod = TreeMethod;
_cpxIndex = new WeakMap(), _displayedCode = new WeakMap(), _name = new WeakMap(), _originalCode = new WeakMap(), _treeNode = new WeakMap();
