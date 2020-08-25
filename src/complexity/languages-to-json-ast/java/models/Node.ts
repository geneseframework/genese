export class compilationUnit {
    name?: string = '';
    children?: compilationUnitChildren = this.initializeCompilationUnitChildren();
    location?: Location = {
        startOffset: 0,
        startLine: 0,
        startColum: 0,
        endOffset: 0,
        endLine: 0,
        endColumn: 0,
    };

    initializeCompilationUnitChildren(): compilationUnitChildren{
        let children = new compilationUnitChildren();
        children.ordinaryCompilationUnit = [];
        children.EOF = [];
        return children;
    }
}

export class compilationUnitChildren {
    ordinaryCompilationUnit?: ordinaryCompilationUnit[] = [];
    EOF?;
}

export class Location {
    startOffset?: number;
    startLine?: number;
    startColum?: number;
    endOffset?: number;
    endLine?: number;
    endColumn?: number;
}

export class ordinaryCompilationUnit{
    ordinaryCompilationUnit?: ordinaryCompilationUnit[];
    name?: string = '';
    children?: {
        packageDeclaration,
        importDeclaration,
        typeDeclaration,
    };
    location?: Location = {
        startOffset: 0,
        startLine: 0,
        startColum: 0,
        endOffset: 0,
        endLine: 0,
        endColumn: 0,
    };
};

export class packageDeclaration{
    name?: string = '';
    children?: packageDeclarationChildren;
    location?: Location = {
        startOffset: 0,
        startLine: 0,
        startColum: 0,
        endOffset: 0,
        endLine: 0,
        endColumn: 0,
    };
}

export class packageDeclarationChildren {
    Package?: infos[];
    Identifier?: infos[];
    Dot?: infos[];
    Semicolon?: infos[];
}

export class infos{
    image?: string = '';
    startOffset?: number = 0;
    endOffset?: number = 0;
    startLine?: number = 0;
    endLine?: number = 0;
    startColum?: number = 0;
    endColumn?: number = 0;
    tokenTypeIdx?: number = 0;
}

export class importDeclaration{
    importDeclaration?: importDeclaration[];
    name?: string = '';
    children?: importChildren = this.initializeImportChildren();
    location?: Location = {
        startOffset: 0,
        startLine: 0,
        startColum: 0,
        endOffset: 0,
        endLine: 0,
        endColumn: 0,
    };

    initializeImportChildren(): importChildren{
        let children = new importChildren();
        children.Import;
        children.packageOrTypeName;
        children.Semicolon;
        return children;
    }
}

export class importChildren {
    Import?: infos;
    packageOrTypeName?: infos;
    Semicolon?: infos;
}

export class typeDeclaration{
    typeDeclaration?: typeDeclaration[];
    name?: string = '';
    children?: string = '';
    location?: Location = {
        startOffset: 0,
        startLine: 0,
        startColum: 0,
        endOffset: 0,
        endLine: 0,
        endColumn: 0,
    };
}

export class packageOrTypeName {
    name?: string = '';
    children?: packageOrTypeNameChildren = this.initializePackageOrTypeNameChildren();
    location?: Location = {
        startOffset: 0,
        startLine: 0,
        startColum: 0,
        endOffset: 0,
        endLine: 0,
        endColumn: 0,
    };

    initializePackageOrTypeNameChildren(): packageOrTypeNameChildren{
        let children = new packageOrTypeNameChildren();
        children.Identifier;
        children.Dot;
        return children;
    }
}

export class packageOrTypeNameChildren {
    Identifier?:infos[];
    Dot?:infos[];
}