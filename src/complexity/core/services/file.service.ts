import * as fs from 'fs-extra';
import { Options, WINDOWS } from '../models/options.model';

/**
 * Tools about files or folders
 */


/**
 * Returns the name of the file at a given path
 * @param pathFile      // The path of the file
 */
export function getFilename(pathFile = ''): string {
    const splittedPath = pathFile.split('/');
    return splittedPath[splittedPath.length - 1];
}


/**
 * Returns the array of files included in a given folder and its subfolders
 * The files are returned as strings
 * @param dirPath           // The path of the folder
 * @param arrayOfFiles      // Recursion parameter
 */
export function getAllFiles(dirPath: string, arrayOfFiles?: string[]): string[] {
    const files = fs.readdirSync(dirPath)
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(`${dirPath}/${file}`);
        }
    })
    return arrayOfFiles;
}


/**
 * Returns an array of paths with a ./ at the beginning
 * @param paths         // The array of paths
 */
export function getArrayOfPathsWithDotSlash(paths: string[]): string[] {
    if (!Array.isArray(paths)) {
        return undefined;
    }
    const pathsWithDotSlash: string[] = [];
    for (const path of paths) {
        pathsWithDotSlash.push(getPathWithDotSlash(path));
    }
    return pathsWithDotSlash;
}


/**
 * Returns a path with a ./ at the beginning
 * @param path      // The path to analyse
 */
export function getPathWithDotSlash(path: string): string {
    let pathWithDotSlash = path;
    if (path?.slice(0, 1) === '/') {
        pathWithDotSlash = `.${pathWithDotSlash}`;
    } else if (path?.slice(0,2) !== './') {
        pathWithDotSlash = `./${path}`;
    }
    return pathWithDotSlash;
}


/**
 * Returns a path with a ./ at the beginning
 * @param path      // The path to analyse
 */
export function getPathWithSlash(path: string): string {
    return path?.slice(-1) !== '/' ? `${path}/` : path;
}


/**
 * Returns the path between a subfolder and its root
 * For example, if relativePath = 'my/relative/path', it will return '../../..
 * @param relativePath      // The path to analyse
 */
export function getRouteToRoot(relativePath: string): string {
    if (!relativePath) {
        return '';
    }
    let relativeRoot = '/..';
    for (let i = 0; i < relativePath.length; i++) {
        relativeRoot = relativePath.charAt(i) === '/' ? `/..${relativeRoot}` : relativeRoot;
    }
    return relativeRoot.slice(1);
}


/**
 * Returns the extension of a file
 * @param filename      // The name of the file
 */
export function getFileExtension(filename: string): string {
    return filename ? filename.split('.').pop() : '';
}


/**
 * Returns the filename without its extension
 * @param filename      // The name of the file
 */
export function getFilenameWithoutExtension(filename: string): string {
    if (!filename) {
        return '';
    }
    const extensionLength = getFileExtension(filename).length;
    return filename.slice(0, -(extensionLength + 1));
}


export function getLanguageExtensions(language: string): string[] {
    switch (language) {
        case 'java':
            return ['java'];
        case 'json':
            return ['json'];
        case 'php':
            return ['php'];
        case 'typescript':
        case 'ts':
            return ['ts'];
        default:
            return ['json'];
    }
}


/**
 * Creates a subFolder of the outDir folder
 * @param relativePath      // The relative path of the subfolder compared to the outDir path
 */
export function createRelativeDir(relativePath: string): void {
    const path = `${Options.pathOutDir}/${relativePath}`;
    if (fs.existsSync(path)) {
        fs.emptyDirSync(path);
    } else {
        fs.mkdirsSync(path);
    }
}


/**
 * Creates the outDir folder
 */
export function createOutDir(): void {
    if (fs.existsSync(Options.pathOutDir)) {
        fs.emptyDirSync(Options.pathOutDir);
    } else {
        fs.mkdirsSync(Options.pathOutDir);
    }
}


/**
 * Copy a file from a path to another one
 * @param originPath        // The origin's path
 * @param targetPath        // The target's path
 */
export function copyFile(originPath: string, targetPath: string): void {
    fs.copyFileSync(platformPath(originPath), platformPath(targetPath));
}


export function platformPath(path: string): string {
    return WINDOWS ? windowsPath(path) : path;
}


export function windowsPath(path: string): string {
    return path.replace(/\//g, '\\').replace(/\\/g, '\\\\')
}


/**
 * Copy a file from a path to another one
 * @param path
 * @param content
 */
export function createFile(path: string, content: string): void {
    fs.writeFileSync(path, content, {encoding: 'utf-8'});
}
