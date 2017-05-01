'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _langValidator = require('./lang-validator');

Object.defineProperty(exports, 'LangValidator', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_langValidator).default;
  }
});

var _validateLang = require('./cli/validate-lang');

Object.defineProperty(exports, 'validateLang', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_validateLang).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map