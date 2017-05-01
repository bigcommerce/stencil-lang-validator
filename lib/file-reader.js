'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.readLangFiles = exports.readFiles = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Read text files
 * @param {string} filePattern
 * @return {Promise<File[]>}
 */
var readFiles = exports.readFiles = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(filePattern) {
        var filePaths, filePromises;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _filePathFinder.findFilePaths)(filePattern);

                    case 2:
                        filePaths = _context.sent;
                        filePromises = filePaths.map(function (filePath) {
                            return readFile(filePath);
                        });
                        return _context.abrupt('return', _promise2.default.all(filePromises));

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function readFiles(_x) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * Read language files
 * @param {string} filePattern
 * @param {boolean} validateRegion
 * @return {Promise<File[]>}
 */


var readLangFiles = exports.readLangFiles = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(filePattern, validateRegion) {
        var filePaths, filePromises;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return (0, _filePathFinder.findFilePaths)(filePattern);

                    case 2:
                        filePaths = _context2.sent;
                        filePromises = filePaths.reduce(function (result, filePath) {
                            if (!validateRegion && _path2.default.basename(filePath, '.json').includes('-')) {
                                return result;
                            }

                            return [].concat((0, _toConsumableArray3.default)(result), [readFile(filePath)]);
                        }, []);
                        return _context2.abrupt('return', _promise2.default.all(filePromises));

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function readLangFiles(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * Read a file asynchronously
 * @private
 * @param {string} filePath
 * @return {Promise<File>}
 */


var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _filePathFinder = require('./file-path-finder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readFile(filePath) {
    return new _promise2.default(function (resolve, reject) {
        _fs2.default.readFile(filePath, 'utf8', function (error, fileContent) {
            if (error) {
                reject(error);
            } else {
                resolve({ content: fileContent, path: filePath });
            }
        });
    });
}
//# sourceMappingURL=file-reader.js.map