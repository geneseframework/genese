import * as fs from 'fs-extra';
import { Options } from '../models/options';

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
 * Returns the route from a folder to a subfolder
 * @param pathRoot          // The path of the parent folder
 * @param pathSubfolder     // The path of the subFolder (this path MUST be a path of a subFolder of pathRoot)
 */
export function getRelativePath(pathRoot: string, pathSubfolder: string): string {
    if (!pathSubfolder || !pathRoot || pathSubfolder === pathRoot) {
        return '';
    }
    const pathWithoutEndSlash = getPathWithoutEndSlash(pathSubfolder);
    return pathRoot === pathWithoutEndSlash.slice(0, pathRoot.length) ? pathWithoutEndSlash.slice(pathRoot.length, pathWithoutEndSlash.length) : pathWithoutEndSlash;
}


/**
 * Returns a path without the eventual slash at the end
 * @param path      // The path to analyse
 */
export function getPathWithoutEndSlash(path: string): string {
    return path.charAt(path.length - 1) === `/` ? path.slice(0, path.length - 1) : path;
}


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


export function getPathWithDotSlash(path: string): string {
    return path?.slice(0,2) !== './' ? `./${path}` : path;
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
export function getExtension(filename: string): string {
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
    const extensionLength = getExtension(filename).length;
    return filename.slice(0, -(extensionLength + 1));
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
    fs.copyFileSync(originPath, targetPath);
}
