"use strict";
exports.__esModule = true;
var fs = require("fs-extra");
var options_1 = require("../models/options");
/**
 * Tools about files or folders
 */
/**
 * Returns the name of the file at a given path
 * @param pathFile      // The path of the file
 */
function getFilename(pathFile) {
    if (pathFile === void 0) { pathFile = ''; }
    var splittedPath = pathFile.split('/');
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
    var files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        }
        else {
            arrayOfFiles.push(dirPath + "/" + file);
        }
    });
    return arrayOfFiles;
}
exports.getAllFiles = getAllFiles;
/**
 * Returns the route from a folder to a subfolder
 * @param pathRoot          // The path of the parent folder
 * @param pathSubfolder     // The path of the subFolder (this path MUST be a path of a subFolder of pathRoot)
 */
function getRelativePath(pathRoot, pathSubfolder) {
    if (!pathSubfolder || !pathRoot || pathSubfolder === pathRoot) {
        return '';
    }
    var pathWithoutEndSlash = getPathWithoutEndSlash(pathSubfolder);
    return pathRoot === pathWithoutEndSlash.slice(0, pathRoot.length) ? pathWithoutEndSlash.slice(pathRoot.length, pathWithoutEndSlash.length) : pathWithoutEndSlash;
}
exports.getRelativePath = getRelativePath;
/**
 * Returns a path without the eventual slash at the end
 * @param path      // The path to analyse
 */
function getPathWithoutEndSlash(path) {
    return path.charAt(path.length - 1) === "/" ? path.slice(0, path.length - 1) : path;
}
exports.getPathWithoutEndSlash = getPathWithoutEndSlash;
/**
 * Returns the path between a subfolder and its root
 * For example, if relativePath = 'my/relative/path', it will return '../../..
 * @param relativePath      // The path to analyse
 */
function getRouteToRoot(relativePath) {
    if (!relativePath) {
        return '';
    }
    var relativeRoot = '/..';
    for (var i = 0; i < relativePath.length; i++) {
        relativeRoot = relativePath.charAt(i) === '/' ? "/.." + relativeRoot : relativeRoot;
    }
    return relativeRoot.slice(1);
}
exports.getRouteToRoot = getRouteToRoot;
/**
 * Returns the extension of a file
 * @param filename      // The name of the file
 */
function getExtension(filename) {
    return filename ? filename.split('.').pop() : '';
}
exports.getExtension = getExtension;
/**
 * Returns the filename without its extension
 * @param filename      // The name of the file
 */
function getFilenameWithoutExtension(filename) {
    if (!filename) {
        return '';
    }
    var extensionLength = getExtension(filename).length;
    return filename.slice(0, -(extensionLength + 1));
}
exports.getFilenameWithoutExtension = getFilenameWithoutExtension;
/**
 * Creates a subFolder of the outDir folder
 * @param relativePath      // The relative path of the subfolder compared to the outDir path
 */
function createRelativeDir(relativePath) {
    var path = options_1.Options.pathOutDir + "/" + relativePath;
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
    if (fs.existsSync(options_1.Options.pathOutDir)) {
        fs.emptyDirSync(options_1.Options.pathOutDir);
    }
    else {
        fs.mkdirsSync(options_1.Options.pathOutDir);
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
