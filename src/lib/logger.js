/* eslint-disable no-console */

import chalk from 'chalk';
import ora from 'ora';

/**
 * Log warning
 * @param {string} message
 * @return {void}
 */
export function logWarning(message) {
    console.warn(chalk.yellow(message));
}

/**
 * Log error
 * @param {string} message
 * @return {void}
 */
export function logError(message) {
    console.error(chalk.red(message));
}

/**
 * Log success
 * @param {string} message
 * @return {void}
 */
export function logSuccess(message) {
    console.error(chalk.green(message));
}

/**
 * Log info
 * @param {string} message
 * @return {void}
 */
export function logInfo(message) {
    console.info(message);
}

/**
 * Log progress
 * @param {string} message
 * @return {Ora}
 */
export function logProgress(message) {
    return ora(message);
}
