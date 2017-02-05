import LangValidator from './lang-validator';
import { logError, logInfo } from './logger';
import { reportErrors } from './error-reporter';

/**
 * Run language validator for CLI
 * @param {ValidatorConfig} [config]
 * @return {Promise<ValidationResult>}
 */
export async function validateLang(config) {
    const validator = LangValidator.create(config);

    try {
        logInfo('Validating language files...');

        const result = await validator.validate();

        reportErrors(result.errors);

        return result;
    } catch (error) {
        logError(error);

        throw error;
    }
}
