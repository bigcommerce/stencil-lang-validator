/**
 * Parse a language file
 * @param {string} fileContent
 * @return {Object}
 */
export function parseLangFile(fileContent) {
    const langJson = JSON.parse(fileContent);

    return flattenLang(langJson);
}

/**
 * Extract language keys from a language file
 * @param {string} fileContent
 * @return {string[]}
 */
export function extractLangKeys(fileContent) {
    return Object.keys(parseLangFile(fileContent));
}

/**
 * Flatten a language object
 * @private
 * @param {Object} object
 * @param {Object} [result={}]
 * @param {string} [parentKey='']
 * @return {Object}
 */
function flattenLang(object, result = {}, parentKey = '') {
    Object.keys(object).forEach((key) => {
        const value = object[key];
        const resultKey = parentKey ? `${parentKey}.${key}` : key;

        if (typeof value === 'object') {
            flattenLang(value, result, resultKey);
            return;
        }

        result[resultKey] = value;
    });

    return result;
}
