'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.reportErrors = reportErrors;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _pad = require('pad');

var _pad2 = _interopRequireDefault(_pad);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _lodash = require('lodash');

var _logger = require('./logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Report errors in the log
 * @param {ValidationError[]} errors
 * @return {void}
 */
function reportErrors(errors) {
    var groupedErrors = (0, _lodash.groupBy)(errors, 'file');

    (0, _keys2.default)(groupedErrors).forEach(function (file) {
        (0, _logger.logInfo)('' + file);

        groupedErrors[file].forEach(function (_ref) {
            var langFile = _ref.langFile,
                key = _ref.key,
                line = _ref.line;

            var formattedLine = _chalk2.default.gray((0, _pad2.default)('' + line, 5));
            var formattedKey = _chalk2.default.yellow(key);
            var langFileName = _path2.default.basename(langFile);

            (0, _logger.logInfo)('  ' + formattedLine + ' ' + formattedKey + ' is not defined in ' + langFileName);
        });

        (0, _logger.logInfo)('');
    });

    if (errors.length > 0) {
        (0, _logger.logError)('\u2717 ' + errors.length + ' ' + (0, _pluralize2.default)('problem', errors.length) + ' found');
    } else {
        (0, _logger.logSuccess)('✓ 0 problems found');
    }
}
//# sourceMappingURL=error-reporter.js.map