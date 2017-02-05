import { createScriptError } from '../error-factory';
import { extractLangKeys } from '../parsers/lang-parser';
import { eachNode, getExpressionValue, isMethod } from '../parsers/script-parser';

/**
 * Find language key errors in script files
 * @param {File} scriptFile
 * @param {File} langFile
 * @param {ValidatorConfig} config
 * @return {ValidationError[]}
 */
export function findScriptErrors(scriptFile, langFile, { instanceName, methodName, langKeyPrefix }) {
    const langKeys = extractLangKeys(langFile.content);
    const errors = [];

    eachNode(scriptFile, (err, node) => {
        if (!isMethod(node, instanceName, methodName)) {
            return;
        }

        const langKey = getExpressionValue(node.arguments[0]);

        if (langKey && langKeys.indexOf(langKeyPrefix ? `${langKeyPrefix}.${langKey}` : langKey) === -1) {
            errors.push(createScriptError(langKey, scriptFile, langFile, node));
        }
    });

    return errors;
}
