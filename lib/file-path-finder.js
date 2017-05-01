'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.findFilePaths = findFilePaths;

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get file paths from a glob pattern
 * @param {string} filePattern
 * @return {void}
 */
function findFilePaths(filePattern) {
    var options = { absolute: true };

    return new _promise2.default(function (resolve, reject) {
        (0, _glob2.default)(filePattern, options, function (error, filePaths) {
            if (error) {
                reject(error);
            } else {
                resolve(filePaths);
            }
        });
    });
}
//# sourceMappingURL=file-path-finder.js.map