import glob from 'glob';

/**
 * Get file paths from a glob pattern
 * @param {string} filePattern
 * @return {void}
 */
export function findFilePaths(filePattern) {
    const options = { absolute: true };

    return new Promise((resolve, reject) => {
        glob(filePattern, options, (error, filePaths) => {
            if (error) {
                reject(error);
            } else {
                resolve(filePaths);
            }
        });
    });
}
