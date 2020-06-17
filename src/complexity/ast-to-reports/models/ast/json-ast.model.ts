import { AstFolder } from './ast-folder.model';
import { Evaluate } from '../../interfaces/evaluate.interface';
import { Logg } from '../../../core/interfaces/logg.interface';
import { CpxFactors } from '../cpx-factor/cpx-factors.model';
import * as chalk from 'chalk';
import { AstNode } from './ast-node.model';

export class JsonAst implements Evaluate, Logg {

    #astFolder?: AstFolder = undefined;
    #cpxFactors?: CpxFactors = undefined;
    #cyclomaticCpx ?= 0;



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------



    get astFolder(): AstFolder {
        return this.#astFolder;
    }


    set astFolder(astFolder: AstFolder) {
        this.#astFolder = astFolder;
    }


    get cpxFactors(): CpxFactors {
        return this.#cpxFactors;
    }


    set cpxFactors(cpxFactors: CpxFactors) {
        this.#cpxFactors = cpxFactors;
    }


    get cyclomaticCpx(): number {
        return this.#cyclomaticCpx;
    }


    set cyclomaticCpx(cyclomaticCpx: number) {
        this.#cyclomaticCpx = cyclomaticCpx;
    }


    // ---------------------------------------------------------------------------------
    //                                Other methods
    // ---------------------------------------------------------------------------------


    evaluate(): void {
        this.cpxFactors = this.#astFolder.cpxFactors;
        this.#cyclomaticCpx = this.#astFolder.cyclomaticCpx;
    }



    logg(message?: string): void {
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message ?? 'JSON_AST'));
        console.log(this.astFolder?.path);
        console.log('-----------------------------');
        for (const astFile of this.astFolder?.astFiles ?? []) {
            console.log(chalk.blueBright('astFile'), astFile?.name);
            console.log(chalk.blueBright('astFile astNode'), astFile?.astNode?.kind);
            console.log(chalk.blueBright('astFile children'), astFile?.astNode?.children);
            this.loggChildren(astFile.astNode);
        }
        console.log(chalk.blueBright('children'), this.astFolder?.children);
    }


    loggChildren(astNode: AstNode, indent = ''): void {
        for (const childAstNode of astNode?.children) {
            const name = childAstNode?.name ?? '';
            console.log(chalk.blueBright(`${indent}node`), childAstNode.kind, name);
            this.loggChildren(childAstNode, `${indent}  `)
        }
    }

}
