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
var _cpxFactors, _cyclomaticCpx, _cpxIndex, _displayedCode, _name, _originalCode, _treeNode;
Object.defineProperty(exports, "__esModule", { value: true });
const ast_service_1 = require("../../services/ast.service");
const cyclomatic_complexity_service_1 = require("../../services/cyclomatic-complexity.service");
const evaluation_status_enum_1 = require("../../enums/evaluation-status.enum");
const complexity_type_enum_1 = require("../../enums/complexity-type.enum");
const code_service_1 = require("../../services/code.service");
const factor_category_enum_1 = require("../../enums/factor-category.enum");
const cpx_factors_1 = require("../../cpx-factors");
const log_service_1 = require("../../services/tree/log.service");
const code_model_1 = require("../../models/code/code.model");
const options_1 = require("../../models/options");
const code_line_model_1 = require("../../models/code/code-line.model");
/**
 * Element of the TreeNode structure corresponding to a given method
 */
class AstMethod {
    constructor() {
        this.codeService = new code_service_1.CodeService(); // The service managing Code objects
        this.cognitiveStatus = evaluation_status_enum_1.MethodStatus.CORRECT; // The cognitive status of the method
        _cpxFactors.set(this, undefined);
        _cyclomaticCpx.set(this, 0);
        _cpxIndex.set(this, undefined); // The complexity index of the method
        this.cyclomaticStatus = evaluation_status_enum_1.MethodStatus.CORRECT; // The cyclomatic status of the method
        _displayedCode.set(this, undefined); // The code to display in the report
        _name.set(this, undefined); // The name of the method
        _originalCode.set(this, undefined); // The original Code of the method (as Code object)
        _treeNode.set(this, undefined); // The AST of the method itself
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get cpxFactors() {
        return __classPrivateFieldGet(this, _cpxFactors);
    }
    set cpxFactors(cpxFactors) {
        __classPrivateFieldSet(this, _cpxFactors, cpxFactors);
    }
    get cpxIndex() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _cpxIndex)) !== null && _a !== void 0 ? _a : this.calculateCpxIndex();
    }
    get cyclomaticCpx() {
        return __classPrivateFieldGet(this, _cyclomaticCpx);
    }
    set cyclomaticCpx(cyclomaticCpx) {
        __classPrivateFieldSet(this, _cyclomaticCpx, cyclomaticCpx);
    }
    get displayedCode() {
        return __classPrivateFieldGet(this, _displayedCode);
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
     * Creates the method's code to display, with comments
     * @param treeNode  // The TreeNode to analyse (by default: the TreeNode associated to this TreeMethod)
     */
    createDisplayedCode(treeNode = this.treeNode) {
        this.setDisplayedCodeLines();
        this.setCpxFactorsToDisplayedCode(treeNode, false);
        __classPrivateFieldGet(this, _displayedCode).setLinesDepthAndNestingCpx();
        this.addCommentsToDisplayedCode();
        this.calculateCpxIndex();
        __classPrivateFieldGet(this, _displayedCode).setTextWithLines();
    }
    /**
     * Creates the Code object corresponding to the code to display
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
     * Calculates the complexity factors of each CodeLine
     * @param treeNode                  // The TreeNode of the method
     * @param startedUncommentedLines   // Param for recursion (checks if the current line is the first uncommented one)
     */
    setCpxFactorsToDisplayedCode(treeNode, startedUncommentedLines = false) {
        for (const childTree of treeNode.children) {
            let issue = this.codeService.getLineIssue(__classPrivateFieldGet(this, _originalCode), childTree.position - this.position);
            const codeLine = __classPrivateFieldGet(this, _displayedCode).lines[issue];
            if (ast_service_1.Ast.isElseStatement(childTree.node)) {
                childTree.cpxFactors.basic.node = cpx_factors_1.cpxFactors.basic.node;
                issue--;
            }
            if (!startedUncommentedLines && treeNode.isFunctionOrMethodDeclaration && !codeLine.isCommented) {
                this.increaseLineCpxFactors(treeNode, codeLine);
                startedUncommentedLines = true;
            }
            else if (startedUncommentedLines) {
                this.increaseLineCpxFactors(childTree, codeLine);
            }
            __classPrivateFieldGet(this, _displayedCode).lines[issue].treeNodes.push(childTree);
            this.setCpxFactorsToDisplayedCode(childTree, startedUncommentedLines);
        }
    }
    /**
     * Adds the Complexity of a TreeNode to its CodeLine
     * @param treeNode      // The TreeNode inside the line of code
     * @param codeLine      // The CodeLine containing the TreeNode
     */
    increaseLineCpxFactors(treeNode, codeLine) {
        if (!codeLine.isCommented) {
            codeLine.cpxFactors = codeLine.cpxFactors.add(treeNode === null || treeNode === void 0 ? void 0 : treeNode.cpxFactors);
        }
    }
    /**
     * Adds information about complexity factors for each line of the displayed code
     */
    addCommentsToDisplayedCode() {
        __classPrivateFieldGet(this, _displayedCode).lines
            .filter(line => line.cpxFactors.total > 0)
            .forEach(line => {
            let comment = `+${line.cpxFactors.total.toFixed(1)} Complexity index (+${line.cpxFactors.totalBasic.toFixed(1)} ${factor_category_enum_1.FactorCategory.BASIC}`;
            comment = line.cpxFactors.totalAggregation > 0 ? `${comment}, +${line.cpxFactors.totalAggregation} ${factor_category_enum_1.FactorCategory.AGGREGATION}` : comment;
            comment = line.cpxFactors.totalNesting > 0 ? `${comment}, +${line.cpxFactors.totalNesting} nesting` : comment;
            comment = line.cpxFactors.totalDepth > 0 ? `${comment}, +${line.cpxFactors.totalDepth} depth` : comment;
            comment = line.cpxFactors.totalRecursion > 0 ? `${comment}, +${line.cpxFactors.totalRecursion} recursivity` : comment;
            comment = line.cpxFactors.totalStructural > 0 ? `${comment}, +${line.cpxFactors.totalStructural} ${factor_category_enum_1.FactorCategory.STRUCTURAL}` : comment;
            comment = `${comment})`;
            __classPrivateFieldGet(this, _displayedCode).lines[line.issue - 1].text = __classPrivateFieldGet(this, _originalCode).addComment(comment, __classPrivateFieldGet(this, _originalCode).lines[line.issue - 1]);
        });
    }
}
exports.AstMethod = AstMethod;
_cpxFactors = new WeakMap(), _cyclomaticCpx = new WeakMap(), _cpxIndex = new WeakMap(), _displayedCode = new WeakMap(), _name = new WeakMap(), _originalCode = new WeakMap(), _treeNode = new WeakMap();
