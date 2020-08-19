
export interface JavaNodeInterface {
    name: string;
    children: string;
    location: Location;
}

export interface Location {
    startOffset: string;
    startLine: string;
    startColumn: string;
    endOffset: string;
    endLine: string;
    endColumn: string;
}