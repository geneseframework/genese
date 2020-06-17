import * as chalk from 'chalk';
import * as ts from 'typescript';
import { Logg } from '../../../core/interfaces/logg.interface';
import { TsNode } from './ts-node.model';

export class TsFile implements Logg {

    #end: number = undefined;
    #name: string = undefined;
    #sourceFile?: ts.SourceFile = undefined;                    // The Typescript JsonAst
    #text ?= '';
    #tsNode?: TsNode = undefined;                             // The TsNode corresponding to the file itself



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


    get end(): number {
        return this.#end ?? this.#tsNode?.end;
    }


    set end(end: number) {
        this.#end = end;
    }


    get name(): string {
        return this.#name ?? this.#tsNode?.name;
    }


    set name(name: string) {
        this.#name = name;
    }

    get sourceFile(): ts.SourceFile {
        return this.#sourceFile;
    }


    set sourceFile(source: ts.SourceFile) {
        this.#sourceFile = source;
    }



    get text(): string {
        return this.#text;
    }


    set text(text: string) {
        this.#text = text;
    }


    get tsNode(): TsNode {
        return this.#tsNode;
    }


    set tsNode(tsNode: TsNode) {
        this.#tsNode = tsNode;
    }



    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------



    logg(message?: string): void {
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message ?? 'AST_FILE'));
        console.log(this.name);
        console.log('-----------------------------');
        console.log(chalk.blueBright('end :'), this.end);
        console.log(chalk.blueBright('text :'), this.text);
        console.log(chalk.blueBright('tsNode :'), this.tsNode?.kind);
    }


}
