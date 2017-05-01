'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _defaultConfig = require('./default-config');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

var _fileReader = require('./file-reader');

var _scriptErrorFinder = require('./error-finders/script-error-finder');

var _templateErrorFinder = require('./error-finders/template-error-finder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A class for validating of language keys
 */
var LangValidator = function () {
    (0, _createClass3.default)(LangValidator, null, [{
        key: 'create',

        /**
         * Create an instance
         * @param {ValidatorConfig} [config]
         * @return {LangValidator}
         */
        value: function create(config) {
            return new LangValidator(config);
        }

        /**
         * @param {ValidatorConfig} [config={}]
         * @return {void}
         */

    }]);

    function LangValidator() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck3.default)(this, LangValidator);

        this.config = (0, _extends3.default)({}, _defaultConfig2.default, config);
    }

    /**
     * Validate all files
     * @return {Promise<ValidationResult>}
     */


    (0, _createClass3.default)(LangValidator, [{
        key: 'validate',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var scriptResult, templateResult;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.validateScripts();

                            case 2:
                                scriptResult = _context.sent;
                                _context.next = 5;
                                return this.validateTemplates();

                            case 5:
                                templateResult = _context.sent;
                                return _context.abrupt('return', {
                                    errors: [].concat((0, _toConsumableArray3.default)(templateResult.errors), (0, _toConsumableArray3.default)(scriptResult.errors))
                                });

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function validate() {
                return _ref.apply(this, arguments);
            }

            return validate;
        }()

        /**
         * Validate each template file
         * @return {Promise<ValidationResult>}
         */

    }, {
        key: 'validateTemplates',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                var _this = this;

                var _config, langPath, templatePath, validateRegion, langFiles, templateFiles, errors;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _config = this.config, langPath = _config.langPath, templatePath = _config.templatePath, validateRegion = _config.validateRegion;
                                _context2.next = 3;
                                return (0, _fileReader.readLangFiles)(langPath, validateRegion);

                            case 3:
                                langFiles = _context2.sent;
                                _context2.next = 6;
                                return (0, _fileReader.readFiles)(templatePath);

                            case 6:
                                templateFiles = _context2.sent;
                                errors = [];


                                langFiles.forEach(function (langFile) {
                                    templateFiles.forEach(function (templateFile) {
                                        errors = [].concat((0, _toConsumableArray3.default)(errors), (0, _toConsumableArray3.default)((0, _templateErrorFinder.findTemplateErrors)(templateFile, langFile, _this.config)));
                                    });
                                });

                                return _context2.abrupt('return', { errors: errors });

                            case 10:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function validateTemplates() {
                return _ref2.apply(this, arguments);
            }

            return validateTemplates;
        }()

        /**
         * Validate each script file
         * @return {Promise<ValidationResult>}
         */

    }, {
        key: 'validateScripts',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
                var _this2 = this;

                var _config2, langPath, scriptPath, validateRegion, langFiles, scriptFiles, errors;

                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _config2 = this.config, langPath = _config2.langPath, scriptPath = _config2.scriptPath, validateRegion = _config2.validateRegion;
                                _context3.next = 3;
                                return (0, _fileReader.readLangFiles)(langPath, validateRegion);

                            case 3:
                                langFiles = _context3.sent;
                                _context3.next = 6;
                                return (0, _fileReader.readFiles)(scriptPath);

                            case 6:
                                scriptFiles = _context3.sent;
                                errors = [];


                                langFiles.forEach(function (langFile) {
                                    scriptFiles.forEach(function (scriptFile) {
                                        errors = [].concat((0, _toConsumableArray3.default)(errors), (0, _toConsumableArray3.default)((0, _scriptErrorFinder.findScriptErrors)(scriptFile, langFile, _this2.config)));
                                    });
                                });

                                return _context3.abrupt('return', { errors: errors });

                            case 10:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function validateScripts() {
                return _ref3.apply(this, arguments);
            }

            return validateScripts;
        }()
    }]);
    return LangValidator;
}();

exports.default = LangValidator;
//# sourceMappingURL=lang-validator.js.map