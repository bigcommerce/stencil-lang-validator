"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createTemplateError = createTemplateError;
exports.createScriptError = createScriptError;
/**
 * Create an error object for missing language keys found in templates
 * @param {string} langKey
 * @param {File} templateFile
 * @param {File} langFile
 * @param {string[]} matches
 * @return {ValidationError}
 */
function createTemplateError(langKey, templateFile, langFile, matches) {
    var newLines = templateFile.content.substr(0, matches.index).match(/\n/g);
    var lineNumber = newLines ? newLines.length + 1 : 1;

    return {
        file: templateFile.path,
        key: langKey,
        langFile: langFile.path,
        line: lineNumber
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
function createScriptError(langKey, templateFile, langFile, node) {
    return {
        file: templateFile.path,
        key: langKey,
        langFile: langFile.path,
        line: node.loc.start.line
    };
}
//# sourceMappingURL=error-factory.js.map