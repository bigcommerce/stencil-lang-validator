import * as babylon from 'babylon';
import { each } from 'lodash';

/**
 * Parse a script file and return AST
 * @param {string} scriptFile
 * @return {Object}
 */
export function parseScript(scriptFile) {
    return babylon.parse(scriptFile, {
        sourceType: 'module',
        plugins: [
            'jsx',
            'objectRestSpread',
            'decorators',
            'classProperties',
            'exportExtensions',
            'functionBind',
        ],
    });
}

/**
 * Check if a node is a method
 * @param {Object} node
 * @param {string} calleeName
 * @param {string} methodName
 * @return {boolean}
 */
export function isMethod(node, calleeName, methodName) {
    if (!node || !node.callee || !node.callee.object || !node.callee.property || !node.arguments || !node.arguments.length) {
        return false;
    }

    if (node.type !== 'CallExpression' || node.callee.type !== 'MemberExpression') {
        return false;
    }

    if (node.callee.property.name !== methodName) {
        return false;
    }

    if (node.callee.object.name !== calleeName && (node.callee.object.property && node.callee.object.property.name !== calleeName)) {
        return false;
    }

    return true;
}

/**
 * Get the value of an expression node
 * @param {Object} node
 * @return {string}
 */
export function getExpressionValue(node) {
    let expression = '';

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
export function eachNode(scriptFile, callback) {
    try {
        const ast = parseScript(scriptFile.content);

        stepInto(ast, node => callback(null, node));
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

    each(node, (innerNode) => {
        if (typeof innerNode === 'object') {
            stepInto(innerNode, callback);
        }
    });
}
