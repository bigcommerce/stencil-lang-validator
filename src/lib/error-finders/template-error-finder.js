import { createTemplateError } from '../error-factory';
import { extractLangKeys } from '../parsers/lang-parser';

/**
 * Find language key errors in template files
 * @param {File} templateFile
 * @param {File} langFile
 * @param {ValidatorConfig} config
 * @return {ValidationError[]}
 */
export function findTemplateErrors(templateFile, langFile, { helperName, langKeyPrefix }) {
    const langKeys = extractLangKeys(langFile.content);
    const patterns = getHelperPatterns(helperName);
    const errors = [];

    patterns.forEach((regexp) => {
        let matches;

        while (matches = regexp.exec(templateFile.content)) {
            const langKey = matches[2].replace(/\\'/g, '\'');

            if (langKeys.indexOf(langKeyPrefix ? `${langKeyPrefix}.${langKey}` : langKey) === -1) {
                errors.push(createTemplateError(langKey, templateFile, langFile, matches));
            }
        }
    });

    return errors;
}

/**
 * Get regexp patterns for matching template helpers
 * @param {string} helperName
 * @return {RegExp[]}
 */
function getHelperPatterns(helperName) {
    const angularRegExp = new RegExp(`\\s*('|"|&quot;|&#39;)(.*?)\\1\\s*\\|\\s*${helperName}`, 'g');
    const handlebarsRegExp = new RegExp(`${helperName}\\s*('|"|&quot;|&#39;)(.*?)\\1`, 'g');

    return [angularRegExp, handlebarsRegExp];
}
