"use strict";
exports.__esModule = true;
var fs = require("fs-extra");
var options_1 = require("../models/options");
function getFilename(pathFile) {
    if (pathFile === void 0) { pathFile = ''; }
    var splittedPath = pathFile.split('/');
    return splittedPath[splittedPath.length - 1];
}
exports.getFilename = getFilename;
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
function getRelativePath(pathRoot, path) {
    if (!path || !pathRoot || path === pathRoot) {
        return '';
    }
    var pathWithoutEndSlash = path.charAt(path.length - 1) === "/" ? path.slice(0, path.length - 1) : path;
    return pathRoot === pathWithoutEndSlash.slice(0, pathRoot.length) ? pathWithoutEndSlash.slice(pathRoot.length, pathWithoutEndSlash.length) : pathWithoutEndSlash;
}
exports.getRelativePath = getRelativePath;
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
function getRouteBetweenPaths(pathSource, pathTarget) {
    if (pathSource === undefined || pathTarget === undefined) {
        return undefined;
    }
    var commonRoute = '';
    for (var i = 0; i < pathSource.length; i++) {
        if (pathSource.charAt(i) === pathTarget.charAt(i)) {
            commonRoute = "" + commonRoute + pathSource.charAt(i);
        }
        else {
            break;
        }
    }
    var backToCommonRoute = getRouteToRoot(pathSource.slice(commonRoute.length));
    return "" + backToCommonRoute + pathTarget.slice(commonRoute.length);
}
exports.getRouteBetweenPaths = getRouteBetweenPaths;
function getRouteFromFolderToFile(tsFolder, tsFile) {
    if (!tsFile || !tsFolder) {
        return undefined;
    }
    if (tsFile.treeFolder.path.slice(0, tsFolder.path.length) !== tsFolder.path) {
        console.log("The file " + tsFile.name + " is not inside the folder " + tsFolder.path);
        return undefined;
    }
    else {
        var linkStarter = tsFolder.relativePath === '' ? './' : '.';
        return "" + linkStarter + tsFile.treeFolder.path.slice(tsFolder.path.length);
    }
}
exports.getRouteFromFolderToFile = getRouteFromFolderToFile;
function getRouteFromFolderToSubFolder(folder, subfolder) {
    if (!folder || !subfolder || subfolder.path === folder.path) {
        return undefined;
    }
    if (subfolder.path.slice(0, folder.path.length) !== folder.path) {
        console.log("The folder " + subfolder.path + " is not a subfolder of " + folder.path);
        return undefined;
    }
    else {
        var linkStarter = folder.relativePath === '' ? './' : '.';
        return "" + linkStarter + subfolder.path.slice(folder.path.length);
    }
}
exports.getRouteFromFolderToSubFolder = getRouteFromFolderToSubFolder;
function getExtension(filename) {
    return filename ? filename.split('.').pop() : '';
}
exports.getExtension = getExtension;
function getFilenameWithoutExtension(filename) {
    if (!filename) {
        return '';
    }
    var extensionLength = getExtension(filename).length;
    return filename.slice(0, -(extensionLength + 1));
}
exports.getFilenameWithoutExtension = getFilenameWithoutExtension;
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
function createOutDir() {
    if (fs.existsSync(options_1.Options.pathOutDir)) {
        fs.emptyDirSync(options_1.Options.pathOutDir);
    }
    else {
        fs.mkdirsSync(options_1.Options.pathOutDir);
    }
}
exports.createOutDir = createOutDir;
function copyFile(originPath, targetPath) {
    fs.copyFileSync(originPath, targetPath);
}
exports.copyFile = copyFile;
