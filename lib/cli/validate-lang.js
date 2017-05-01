'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = validateLang;

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('../logger');

var _errorReporter = require('../error-reporter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A CLI command for validating language files
 * @param {ValidatorConfig} [config = {}]
 * @return {Promise<ValidationResult>}
 */
function validateLang() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var child = _child_process2.default.fork(_path2.default.join(__dirname, 'run'));
    var spinner = (0, _logger.logProgress)('Validating language files...');

    return new _promise2.default(function (resolve, reject) {
        child.on('message', function (_ref) {
            var error = _ref.error,
                result = _ref.result;

            if (error) {
                spinner.fail();
                (0, _logger.logError)(error);
                reject(error);
            } else {
                spinner.succeed();
                (0, _errorReporter.reportErrors)(result.errors);
                resolve(result);
            }

            child.kill();
        });

        child.on('exit', function (errorCode) {
            if (!errorCode) {
                return;
            }

            var error = new Error('The validation ended unexpectedly');

            spinner.fail();
            (0, _logger.logError)(error);
            reject(error);
        });

        spinner.start();
        child.send(config);
    });
}
//# sourceMappingURL=validate-lang.js.map