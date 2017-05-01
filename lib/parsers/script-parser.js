'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.parseScript = parseScript;
exports.isMethod = isMethod;
exports.getExpressionValue = getExpressionValue;
exports.eachNode = eachNode;

var _babylon = require('babylon');

var babylon = _interopRequireWildcard(_babylon);

var _lodash = require('lodash');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parse a script file and return AST
 * @param {string} scriptFile
 * @return {Object}
 */
function parseScript(scriptFile) {
    return babylon.parse(scriptFile, {
        sourceType: 'module',
        plugins: ['jsx', 'objectRestSpread', 'decorators', 'classProperties', 'exportExtensions', 'functionBind']
    });
}

/**
 * Check if a node is a method
 * @param {Object} node
 * @param {string} calleeName
 * @param {string} methodName
 * @return {boolean}
 */
function isMethod(node, calleeName, methodName) {
    if (!node || !node.callee || !node.callee.object || !node.callee.property || !node.arguments || !node.arguments.length) {
        return false;
    }

    if (node.type !== 'CallExpression' || node.callee.type !== 'MemberExpression') {
        return false;
    }

    if (node.callee.property.name !== methodName) {
        return false;
    }

    if (node.callee.object.name !== calleeName && node.callee.object.property && node.callee.object.property.name !== calleeName) {
        return false;
    }

    return true;
}

/**
 * Get the value of an expression node
 * @param {Object} node
 * @return {string}
 */
function getExpressionValue(node) {
    var expression = '';

    if (node.type === 'StringLiteral') {
        expression = node.value;
    }

    if (node.type === 'BinaryExpression' && node.operator === '+') {
        expression += getExpressionValue(node.left);
        expression += getExpressionValue(node.right);
    }

    return expression;
}

/**
 * Iterate over each AST node
 * @param {Object} scriptFile
 * @param {Function} callback
 * @return {void}
 */
function eachNode(scriptFile, callback) {
    try {
        var ast = parseScript(scriptFile.content);

        stepInto(ast, function (node) {
            return callback(null, node);
        });
    } catch (error) {
        callback(error);
    }
}

/**
 * Step into AST node
 * @private
 * @param {Object} node
 * @param {Function} callback
 * @return {void}
 */
function stepInto(node, callback) {
    callback(node);

    (0, _lodash.each)(node, function (innerNode) {
        if ((typeof innerNode === 'undefined' ? 'undefined' : (0, _typeof3.default)(innerNode)) === 'object') {
            stepInto(innerNode, callback);
        }
    });
}
//# sourceMappingURL=script-parser.js.map