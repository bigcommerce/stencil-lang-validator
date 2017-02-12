import chalk from 'chalk';
import pad from 'pad';
import path from 'path';
import pluralize from 'pluralize';
import { groupBy } from 'lodash';
import { logError, logInfo, logSuccess } from './logger';

/**
 * Report errors in the log
 * @param {ValidationError[]} errors
 * @return {void}
 */
export function reportErrors(errors) {
    const groupedErrors = groupBy(errors, 'file');

    Object.keys(groupedErrors).forEach((file) => {
        logInfo(`${file}`);

        groupedErrors[file].forEach(({ langFile, key, line }) => {
            const formattedLine = chalk.gray(pad(`${line}`, 5));
            const formattedKey = chalk.yellow(key);
            const langFileName = path.basename(langFile);

            logInfo(`  ${formattedLine} ${formattedKey} is not defined in ${langFileName}`);
        });

        logInfo('');
    });

    if (errors.length > 0) {
        logError(`✗ ${errors.length} ${pluralize('problem', errors.length)} found`);
    } else {
        logSuccess('✓ 0 problems found');
    }
}
