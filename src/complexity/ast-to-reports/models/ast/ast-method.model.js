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
var _astNode, _cpxFactors, _cyclomaticCpx, _cpxIndex, _displayedCode, _name, _originalCode;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstMethod = void 0;
const cyclomatic_complexity_service_1 = require("../../services/cyclomatic-complexity.service");
const code_model_1 = require("../code/code.model");
const code_service_1 = require("../../services/code.service");
const ast_service_1 = require("../../services/ast/ast.service");
const evaluation_status_enum_1 = require("../../enums/evaluation-status.enum");
const cpx_factors_model_1 = require("../cpx-factor/cpx-factors.model");
const complexity_type_enum_1 = require("../../enums/complexity-type.enum");
const code_line_model_1 = require("../code/code-line.model");
const cpx_factors_1 = require("../../../cpx-factors");
const factor_category_enum_1 = require("../../enums/factor-category.enum");
const options_1 = require("../options");
/**
 * Element of the AstNode structure corresponding to a given method
 */
class AstMethod {
    constructor() {
        _astNode.set(this, undefined); // The AST of the method itself
        this.codeService = new code_service_1.CodeService(); // The service managing Code objects
        this.cognitiveStatus = evaluation_status_enum_1.MethodStatus.CORRECT; // The cognitive status of the method
        _cpxFactors.set(this, undefined);
        _cyclomaticCpx.set(this, 0);
        _cpxIndex.set(this, undefined); // The complexity index of the method
        this.cyclomaticStatus = evaluation_status_enum_1.MethodStatus.CORRECT; // The cyclomatic status of the method
        _displayedCode.set(this, undefined); // The code to display in the report
        _name.set(this, undefined); // The name of the method
        _originalCode.set(this, undefined); // The original Code of the method (as Code object)
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
        if (__classPrivateFieldGet(this, _name)) {
            return __classPrivateFieldGet(this, _name);
        }
        __classPrivateFieldSet(this, _name, __classPrivateFieldGet(this, _astNode).name);
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
        return (_a = this.astNode) === null || _a === void 0 ? void 0 : _a.pos;
    }
    get astNode() {
        return __classPrivateFieldGet(this, _astNode);
    }
    set astNode(astNode) {
        __classPrivateFieldSet(this, _astNode, astNode);
    }
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    /**
     * Evaluates the complexities of this AstMethod
     */
    evaluate() {
        this.createDisplayedCode();
        // LogService.printAllChildren(this.astNode);
        this.cognitiveStatus = this.getComplexityStatus(complexity_type_enum_1.ComplexityType.COGNITIVE);
        this.cyclomaticCpx = cyclomatic_complexity_service_1.CyclomaticComplexityService.calculateCyclomaticComplexity(this.astNode);
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
     * Calculates the Complexity Index of the method
     */
    calculateCpxFactors() {
        var _a, _b, _c;
        if (!(((_b = (_a = __classPrivateFieldGet(this, _displayedCode)) === null || _a === void 0 ? void 0 : _a.lines) === null || _b === void 0 ? void 0 : _b.length) > 0)) {
            this.createDisplayedCode();
        }
        let cpxFactors = new cpx_factors_model_1.CpxFactors();
        for (const line of (_c = __classPrivateFieldGet(this, _displayedCode)) === null || _c === void 0 ? void 0 : _c.lines) {
            cpxFactors = cpxFactors.add(line.cpxFactors);
        }
        this.cpxFactors = cpxFactors;
        console.log('METHODDD CPX F', cpxFactors);
        return cpxFactors;
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
     * @param astNode  // The AstNode to analyse (by default: the AstNode associated to this AstMethod)
     */
    createDisplayedCode(astNode = this.astNode) {
        this.setDisplayedCodeLines();
        this.setCpxFactorsToDisplayedCode(astNode, false);
        __classPrivateFieldGet(this, _displayedCode).setLinesDepthAndNestingCpx();
        this.addCommentsToDisplayedCode();
        this.calculateCpxFactors();
        // this.calculateCpxIndex();
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
     * @param astNode                  // The AstNode of the method
     * @param startedUncommentedLines   // Param for recursion (checks if the current line is the first uncommented one)
     */
    setCpxFactorsToDisplayedCode(astNode, startedUncommentedLines = false) {
        for (const childAst of astNode.children) {
            let issue = this.codeService.getLineIssue(__classPrivateFieldGet(this, _originalCode), childAst.pos - this.position);
            const codeLine = __classPrivateFieldGet(this, _displayedCode).lines[issue];
            if (ast_service_1.Ast.isElseStatement(childAst)) {
                childAst.cpxFactors.basic.node = cpx_factors_1.cpxFactors.basic.node;
                issue--;
            }
            if (!startedUncommentedLines && astNode.isFunctionOrMethodDeclaration && !codeLine.isCommented) {
                this.increaseLineCpxFactors(astNode, codeLine);
                startedUncommentedLines = true;
            }
            else if (startedUncommentedLines) {
                this.increaseLineCpxFactors(childAst, codeLine);
            }
            __classPrivateFieldGet(this, _displayedCode).lines[issue].astNodes.push(childAst);
            this.setCpxFactorsToDisplayedCode(childAst, startedUncommentedLines);
        }
    }
    /**
     * Adds the Complexity of a AstNode to its CodeLine
     * @param astNode      // The AstNode inside the line of code
     * @param codeLine      // The CodeLine containing the AstNode
     */
    increaseLineCpxFactors(astNode, codeLine) {
        if (!codeLine.isCommented) {
            codeLine.cpxFactors = codeLine.cpxFactors.add(astNode === null || astNode === void 0 ? void 0 : astNode.cpxFactors);
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
_astNode = new WeakMap(), _cpxFactors = new WeakMap(), _cyclomaticCpx = new WeakMap(), _cpxIndex = new WeakMap(), _displayedCode = new WeakMap(), _name = new WeakMap(), _originalCode = new WeakMap();
