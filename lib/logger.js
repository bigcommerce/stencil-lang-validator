'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logWarning = logWarning;
exports.logError = logError;
exports.logSuccess = logSuccess;
exports.logInfo = logInfo;
exports.logProgress = logProgress;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Log warning
 * @param {string} message
 * @return {void}
 */
/* eslint-disable no-console */

function logWarning(message) {
  console.warn(_chalk2.default.yellow(message));
}

/**
 * Log error
 * @param {string} message
 * @return {void}
 */
function logError(message) {
  console.error(_chalk2.default.red(message));
}

/**
 * Log success
 * @param {string} message
 * @return {void}
 */
function logSuccess(message) {
  console.error(_chalk2.default.green(message));
}

/**
 * Log info
 * @param {string} message
 * @return {void}
 */
function logInfo(message) {
  console.info(message);
}

/**
 * Log progress
 * @param {string} message
 * @return {Ora}
 */
function logProgress(message) {
  return (0, _ora2.default)(message);
}
//# sourceMappingURL=logger.js.map