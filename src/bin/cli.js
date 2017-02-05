#! /usr/bin/env node

import { validateLang } from '../lib/cli';
import { parseOptions } from './option-parser';

/**
 * Run CLI command
 * @return {void}
 */
async function run() {
    const options = parseOptions(process.argv);
    const result = await validateLang(options);

    if (options.failOnError && result.errors.length) {
        process.exit(1);
    }
}

run();
