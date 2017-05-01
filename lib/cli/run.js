'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _langValidator = require('../lang-validator');

var _langValidator2 = _interopRequireDefault(_langValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Run the language validator in a separate process
 * @return {void}
 */
function run() {
    var _this = this;

    process.on('message', function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(config) {
            var validator, result;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            validator = _langValidator2.default.create(config);
                            _context.next = 4;
                            return validator.validate();

                        case 4:
                            result = _context.sent;


                            process.send({ result: result });
                            _context.next = 11;
                            break;

                        case 8:
                            _context.prev = 8;
                            _context.t0 = _context['catch'](0);

                            process.send({ error: '' + _context.t0 });

                        case 11:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 8]]);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }());
}

run();
//# sourceMappingURL=run.js.map