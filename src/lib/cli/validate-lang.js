import childProcess from 'child_process';
import path from 'path';
import { logError, logProgress } from '../logger';
import { reportErrors } from '../error-reporter';

/**
 * A CLI command for validating language files
 * @param {ValidatorConfig} [config = {}]
 * @return {Promise<ValidationResult>}
 */
export default function validateLang(config = {}) {
    const child = childProcess.fork(path.join(__dirname, 'run'));
    const spinner = logProgress('Validating language files...');

    return new Promise((resolve, reject) => {
        child.on('message', ({ error, result }) => {
            if (error) {
                spinner.fail();
                logError(error);
                reject(error);
            } else {
                spinner.succeed();
                reportErrors(result.errors);
                resolve(result);
            }

            child.kill();
        });

        child.on('exit', (errorCode) => {
            if (!errorCode) {
                return;
            }

            const error = new Error('The validation ended unexpectedly');

            spinner.fail();
            logError(error);
            reject(error);
        });

        spinner.start();
        child.send(config);
    });
}
