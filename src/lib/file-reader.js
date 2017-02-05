import fs from 'fs';
import path from 'path';
import { findFilePaths } from './file-path-finder';

/**
 * Read text files
 * @param {string} filePattern
 * @return {Promise<File[]>}
 */
export async function readFiles(filePattern) {
    const filePaths = await findFilePaths(filePattern);
    const filePromises = filePaths.map(filePath => readFile(filePath));

    return Promise.all(filePromises);
}

/**
 * Read language files
 * @param {string} filePattern
 * @param {boolean} validateRegion
 * @return {Promise<File[]>}
 */
export async function readLangFiles(filePattern, validateRegion) {
    const filePaths = await findFilePaths(filePattern);
    const filePromises = filePaths.reduce((result, filePath) => {
        if (!validateRegion && path.basename(filePath, '.json').includes('-')) {
            return result;
        }

        return [...result, readFile(filePath)];
    }, []);

    return Promise.all(filePromises);
}

/**
 * Read a file asynchronously
 * @param {string} filePath
 * @return {Promise<File>}
 */
function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (error, fileContent) => {
            if (error) {
                reject(error);
            } else {
                resolve({ content: fileContent, path: filePath });
            }
        });
    });
}
