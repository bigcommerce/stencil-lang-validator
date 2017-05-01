'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseOptions = parseOptions;

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pkgDir = require('pkg-dir');

var _pkgDir2 = _interopRequireDefault(_pkgDir);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parse CLI options
 * @param {Object} argv
 * @return {ValidatorConfig}
 */
function parseOptions(argv) {
    var pkg = getPackage();

    _commander2.default.version(pkg.version).usage('[options]').option('-l, --lang-path [path]', 'Configure the path to a language file. Pass a glob pattern to validate multiple files').option('-s, --script-path [path]', 'Configure the path to a script file. Pass a glob pattern to validate multiple files').option('-t, --template-path [path]', 'Configure the path to a template file. Pass a glob pattern to validate multiple files').option('-F, --fail-on-error', 'Fail when there is a missing key', false).option('--helper-name [name]', 'Configure the helper name used to retrieve language strings in HTML templates').option('--instance-name [name]', 'Configure the name of an instance responsible for retrieving language strings in JS files').option('--lang-key-prefix [prefix]', 'Configure the prefix applied to language keys').option('--method-name [name]', 'Configure the name of a method responsible for retrieving language strings in JS files').option('--validate-region', 'Validate region-specific language files', false).parse(argv);

    return (0, _lodash.pick)((0, _lodash.omitBy)(_commander2.default, _lodash.isNil), ['failOnError', 'helperName', 'instanceName', 'langKeyPrefix', 'langPath', 'methodName', 'scriptPath', 'templatePath', 'validateRegion']);
}

/**
 * Get package.json
 * @private
 * @return {Object}
 */
function getPackage() {
    var filePath = _path2.default.join(_pkgDir2.default.sync(__dirname), 'package.json');

    return JSON.parse(_fs2.default.readFileSync(filePath, 'utf8'));
}
//# sourceMappingURL=option-parser.js.map