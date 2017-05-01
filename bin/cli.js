#! /usr/bin/env node
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Run CLI command
 * @return {void}
 */
var run = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var options, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        options = (0, _optionParser.parseOptions)(process.argv);
                        _context.next = 3;
                        return (0, _lib.validateLang)(options);

                    case 3:
                        result = _context.sent;


                        if (options.failOnError && result.errors.length) {
                            process.exit(1);
                        }

                        process.exit(0);

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function run() {
        return _ref.apply(this, arguments);
    };
}();

var _lib = require('../lib');

var _optionParser = require('./option-parser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

run();
//# sourceMappingURL=cli.js.map