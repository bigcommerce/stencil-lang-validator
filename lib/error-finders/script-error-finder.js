'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findScriptErrors = findScriptErrors;

var _errorFactory = require('../error-factory');

var _langParser = require('../parsers/lang-parser');

var _scriptParser = require('../parsers/script-parser');

/**
 * Find language key errors in script files
 * @param {File} scriptFile
 * @param {File} langFile
 * @param {ValidatorConfig} config
 * @return {ValidationError[]}
 */
function findScriptErrors(scriptFile, langFile, _ref) {
    var instanceName = _ref.instanceName,
        methodName = _ref.methodName,
        langKeyPrefix = _ref.langKeyPrefix;

    var langKeys = (0, _langParser.extractLangKeys)(langFile.content);
    var errors = [];

    (0, _scriptParser.eachNode)(scriptFile, function (err, node) {
        if (!(0, _scriptParser.isMethod)(node, instanceName, methodName)) {
            return;
        }

        var langKey = (0, _scriptParser.getExpressionValue)(node.arguments[0]);

        if (langKey && langKeys.indexOf(langKeyPrefix ? langKeyPrefix + '.' + langKey : langKey) === -1) {
            errors.push((0, _errorFactory.createScriptError)(langKey, scriptFile, langFile, node));
        }
    });

    return errors;
}
//# sourceMappingURL=script-error-finder.js.map