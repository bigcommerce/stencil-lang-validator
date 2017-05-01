'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.parseLangFile = parseLangFile;
exports.extractLangKeys = extractLangKeys;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parse a language file
 * @param {string} fileContent
 * @return {Object}
 */
function parseLangFile(fileContent) {
    var langJson = JSON.parse(fileContent);

    return flattenLang(langJson);
}

/**
 * Extract language keys from a language file
 * @param {string} fileContent
 * @return {string[]}
 */
function extractLangKeys(fileContent) {
    return (0, _keys2.default)(parseLangFile(fileContent));
}

/**
 * Flatten a language object
 * @private
 * @param {Object} object
 * @param {Object} [result={}]
 * @param {string} [parentKey='']
 * @return {Object}
 */
function flattenLang(object) {
    var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var parentKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    (0, _keys2.default)(object).forEach(function (key) {
        var value = object[key];
        var resultKey = parentKey ? parentKey + '.' + key : key;

        if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
            flattenLang(value, result, resultKey);
            return;
        }

        result[resultKey] = value;
    });

    return result;
}
//# sourceMappingURL=lang-parser.js.map