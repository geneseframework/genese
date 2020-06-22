"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = exports.copyFile = exports.createOutDir = exports.createRelativeDir = exports.getLanguageExtensions = exports.getFilenameWithoutExtension = exports.getFileExtension = exports.getRouteToRoot = exports.getPathWithSlash = exports.getPathWithDotSlash = exports.getArrayOfPathsWithDotSlash = exports.getAllFiles = exports.getFilename = void 0;
const fs = require("fs-extra");
const options_model_1 = require("../models/options.model");
/**
 * Tools about files or folders
 */
/**
 * Returns the name of the file at a given path
 * @param pathFile      // The path of the file
 */
function getFilename(pathFile = '') {
    const splittedPath = pathFile.split('/');
    return splittedPath[splittedPath.length - 1];
}
exports.getFilename = getFilename;
/**
 * Returns the array of files included in a given folder and its subfolders
 * The files are returned as strings
 * @param dirPath           // The path of the folder
 * @param arrayOfFiles      // Recursion parameter
 */
function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        }
        else {
            arrayOfFiles.push(`${dirPath}/${file}`);
        }
    });
    return arrayOfFiles;
}
exports.getAllFiles = getAllFiles;
/**
 * Returns an array of paths with a ./ at the beginning
 * @param paths         // The array of paths
 */
function getArrayOfPathsWithDotSlash(paths) {
    if (!Array.isArray(paths)) {
        return undefined;
    }
    const pathsWithDotSlash = [];
    for (const path of paths) {
        pathsWithDotSlash.push(getPathWithDotSlash(path));
    }
    return pathsWithDotSlash;
}
exports.getArrayOfPathsWithDotSlash = getArrayOfPathsWithDotSlash;
/**
 * Returns a path with a ./ at the beginning
 * @param path      // The path to analyse
 */
function getPathWithDotSlash(path) {
    let pathWithDotSlash = path;
    if ((path === null || path === void 0 ? void 0 : path.slice(0, 1)) === '/') {
        pathWithDotSlash = `.${pathWithDotSlash}`;
    }
    else if ((path === null || path === void 0 ? void 0 : path.slice(0, 2)) !== './') {
        pathWithDotSlash = `./${path}`;
    }
    return pathWithDotSlash;
}
exports.getPathWithDotSlash = getPathWithDotSlash;
/**
 * Returns a path with a ./ at the beginning
 * @param path      // The path to analyse
 */
function getPathWithSlash(path) {
    return (path === null || path === void 0 ? void 0 : path.slice(0, 1)) !== '/' ? `${path}/` : path;
}
exports.getPathWithSlash = getPathWithSlash;
/**
 * Returns the path between a subfolder and its root
 * For example, if relativePath = 'my/relative/path', it will return '../../..
 * @param relativePath      // The path to analyse
 */
function getRouteToRoot(relativePath) {
    if (!relativePath) {
        return '';
    }
    let relativeRoot = '/..';
    for (let i = 0; i < relativePath.length; i++) {
        relativeRoot = relativePath.charAt(i) === '/' ? `/..${relativeRoot}` : relativeRoot;
    }
    const zzz = relativeRoot.slice(1);
    // console.log('REL PATTHHH', relativePath, zzz)
    return zzz;
}
exports.getRouteToRoot = getRouteToRoot;
/**
 * Returns the extension of a file
 * @param filename      // The name of the file
 */
function getFileExtension(filename) {
    return filename ? filename.split('.').pop() : '';
}
exports.getFileExtension = getFileExtension;
/**
 * Returns the filename without its extension
 * @param filename      // The name of the file
 */
function getFilenameWithoutExtension(filename) {
    if (!filename) {
        return '';
    }
    const extensionLength = getFileExtension(filename).length;
    return filename.slice(0, -(extensionLength + 1));
}
exports.getFilenameWithoutExtension = getFilenameWithoutExtension;
function getLanguageExtensions(language) {
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
exports.getLanguageExtensions = getLanguageExtensions;
/**
 * Creates a subFolder of the outDir folder
 * @param relativePath      // The relative path of the subfolder compared to the outDir path
 */
function createRelativeDir(relativePath) {
    const path = `${options_model_1.Options.pathOutDir}/${relativePath}`;
    if (fs.existsSync(path)) {
        fs.emptyDirSync(path);
    }
    else {
        fs.mkdirsSync(path);
    }
}
exports.createRelativeDir = createRelativeDir;
/**
 * Creates the outDir folder
 */
function createOutDir() {
    if (fs.existsSync(options_model_1.Options.pathOutDir)) {
        fs.emptyDirSync(options_model_1.Options.pathOutDir);
    }
    else {
        fs.mkdirsSync(options_model_1.Options.pathOutDir);
    }
}
exports.createOutDir = createOutDir;
/**
 * Copy a file from a path to another one
 * @param originPath        // The origin's path
 * @param targetPath        // The target's path
 */
function copyFile(originPath, targetPath) {
    fs.copyFileSync(originPath, targetPath);
}
exports.copyFile = copyFile;
/**
 * Copy a file from a path to another one
 * @param path
 * @param content
 */
function createFile(path, content) {
    fs.writeFileSync(path, content, { encoding: 'utf-8' });
}
exports.createFile = createFile;
