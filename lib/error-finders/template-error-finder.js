'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findTemplateErrors = findTemplateErrors;

var _errorFactory = require('../error-factory');

var _langParser = require('../parsers/lang-parser');

/**
 * Find language key errors in template files
 * @param {File} templateFile
 * @param {File} langFile
 * @param {ValidatorConfig} config
 * @return {ValidationError[]}
 */
function findTemplateErrors(templateFile, langFile, _ref) {
    var helperName = _ref.helperName,
        langKeyPrefix = _ref.langKeyPrefix;

    var langKeys = (0, _langParser.extractLangKeys)(langFile.content);
    var patterns = getHelperPatterns(helperName);
    var errors = [];

    patterns.forEach(function (regexp) {
        var matches = void 0;

        while (matches = regexp.exec(templateFile.content)) {
            var langKey = matches[2].replace(/\\'/g, '\'');

            if (langKeys.indexOf(langKeyPrefix ? langKeyPrefix + '.' + langKey : langKey) === -1) {
                errors.push((0, _errorFactory.createTemplateError)(langKey, templateFile, langFile, matches));
            }
        }
    });

    return errors;
}

/**
 * Get regexp patterns for matching template helpers
 * @private
 * @param {string} helperName
 * @return {RegExp[]}
 */
function getHelperPatterns(helperName) {
    var angularRegExp = new RegExp('\\s*(\'|"|&quot;|&#39;)(.*?)\\1\\s*\\|\\s*' + helperName, 'g');
    var handlebarsRegExp = new RegExp(helperName + '\\s*(\'|"|&quot;|&#39;)(.*?)\\1', 'g');

    return [angularRegExp, handlebarsRegExp];
}
//# sourceMappingURL=template-error-finder.js.map