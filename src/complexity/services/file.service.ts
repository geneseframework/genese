import * as fs from 'fs-extra';
import { Options } from '../models/options';
import { TsFolder } from '../models/ts-folder.model';
import { TsFile } from '../models/ts-file.model';

export function getFilename(pathFile = ''): string {
    const splittedPath = pathFile.split('/');
    return splittedPath[splittedPath.length - 1];
}

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


export function getPath(pathFile: string): string {
    const splittedPath = pathFile.split('/');
    splittedPath.pop();
    return splittedPath.join('/');
}


export function getRelativePath(pathRoot: string, path: string): string {
    if (!path || !pathRoot || path === pathRoot) {
        return '';
    }
    const pathWithoutEndSlash = path.charAt(path.length - 1) === `/` ? path.slice(0, path.length - 1) : path;
    const  relpath =pathRoot === pathWithoutEndSlash.slice(0, pathRoot.length) ? pathWithoutEndSlash.slice(pathRoot.length, pathWithoutEndSlash.length) : pathWithoutEndSlash;
    return relpath;
}


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


export function getRouteBetweenPaths(pathSource: string, pathTarget: string): string {
    if (pathSource === undefined || pathTarget === undefined) {
        return undefined;
    }
    let commonRoute = '';
    for (let i = 0; i < pathSource.length; i++) {
        if (pathSource.charAt(i) === pathTarget.charAt(i)) {
            commonRoute = `${commonRoute}${pathSource.charAt(i)}`
        } else {
            break;
        }
    }
    const backToCommonRoute = getRouteToRoot(pathSource.slice(commonRoute.length));
    return `${backToCommonRoute}${pathTarget.slice(commonRoute.length)}`;
}


export function getRouteFromFolderToFile(tsFolder: TsFolder, tsFile: TsFile): string {
    if (!tsFile || !tsFolder) {
        return undefined;
    }
    if (tsFile.tsFolder.path.slice(0, tsFolder.path.length) !== tsFolder.path) {
        console.log(`The file ${tsFile.name} is not inside the folder ${tsFolder.path}`);
        return undefined;
    } else {
        const linkStarter = tsFolder.relativePath === '' ? './' : '.';
        return `${linkStarter}${tsFile.tsFolder.path.slice(tsFolder.path.length)}`;
    }
}


export function getRouteFromFolderToSubFolder(folder: TsFolder, subfolder: TsFolder): string {
    if (!folder || !subfolder|| subfolder.path === folder.path ) {
        return undefined;
    }
    if (subfolder.path.slice(0, folder.path.length) !== folder.path) {
        console.log(`The folder ${subfolder.path} is not a subfolder of ${folder.path}`);
        return undefined;
    } else {
        const linkStarter = folder.relativePath === '' ? './' : '.';
        return `${linkStarter}${subfolder.path.slice(folder.path.length)}`;
    }
}


export function getExtension(filename: string): string {
    return filename ? filename.split('.').pop() : '';
}


export function getFilenameWithoutExtension(filename: string): string {
    if (!filename) {
        return '';
    }
    const extensionLength = getExtension(filename).length;
    return filename.slice(0, -(extensionLength + 1));
}


export function createRelativeDir(relativePath: string): void {
    const path = `${Options.pathReports}/${relativePath}`;
    if (fs.existsSync(path)) {
        fs.emptyDirSync(path);
    } else {
        fs.mkdirsSync(path);
    }
}


export function createOutDir(): void {
    if (fs.existsSync(Options.pathReports)) {
        fs.emptyDirSync(Options.pathReports);
    } else {
        fs.mkdirsSync(Options.pathReports);
    }
}


export function copyFile(originPath: string, targetPath: string): void {
    fs.copyFileSync(originPath, targetPath);
}
