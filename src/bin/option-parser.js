import commander from 'commander';
import fs from 'fs';
import { isNil, omitBy, pick } from 'lodash';

/**
 * Parse CLI options
 * @param {Object} argv
 * @return {ValidatorConfig}
 */
export function parseOptions(argv) {
    const pkg = getPackage();

    commander.version(pkg.version)
        .usage('[options]')
        .option('-l, --lang-path [path]', 'Configure the path to a language file. Pass a glob pattern to validate multiple files')
        .option('-s, --script-path [path]', 'Configure the path to a script file. Pass a glob pattern to validate multiple files')
        .option('-t, --template-path [path]', 'Configure the path to a template file. Pass a glob pattern to validate multiple files')
        .option('-F, --fail-on-error', 'Fail when there is a missing key', false)
        .option('--helper-name [name]', 'Configure the helper name used to retrieve language strings in HTML templates')
        .option('--instance-name [name]', 'Configure the name of an instance responsible for retrieving language strings in JS files')
        .option('--lang-key-prefix [prefix]', 'Configure the prefix applied to language keys')
        .option('--method-name [name]', 'Configure the name of a method responsible for retrieving language strings in JS files')
        .option('--validate-region', 'Validate region-specific language files', false)
        .parse(argv);

    return pick(omitBy(commander, isNil), [
        'failOnError',
        'helperName',
        'instanceName',
        'langKeyPrefix',
        'langPath',
        'methodName',
        'scriptPath',
        'templatePath',
        'validateRegion',
    ]);
}

/**
 * Get package.json
 * @return {Object}
 */
function getPackage() {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
}
