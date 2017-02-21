/**
 * Create an error object for missing language keys found in templates
 * @param {string} langKey
 * @param {File} templateFile
 * @param {File} langFile
 * @param {string[]} matches
 * @return {ValidationError}
 */
export function createTemplateError(langKey, templateFile, langFile, matches) {
    const newLines = templateFile.content.substr(0, matches.index).match(/\n/g);
    const lineNumber = newLines ? newLines.length + 1 : 1;

    return {
        file: templateFile.path,
        key: langKey,
        langFile: langFile.path,
        line: lineNumber,
    };
}

/**
 * Create an error object for missing language keys found in scripts
 * @param {string} langKey
 * @param {File} templateFile
 * @param {File} langFile
 * @param {Object} node
 * @return {ValidationError}
 */
export function createScriptError(langKey, templateFile, langFile, node) {
    return {
        file: templateFile.path,
        key: langKey,
        langFile: langFile.path,
        line: node.loc.start.line,
    };
}
