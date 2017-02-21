import DEFAULT_CONFIG from './default-config';
import { readFiles, readLangFiles } from './file-reader';
import { findScriptErrors } from './error-finders/script-error-finder';
import { findTemplateErrors } from './error-finders/template-error-finder';

/**
 * A class for validating of language keys
 */
export default class LangValidator {
    /**
     * Create an instance
     * @param {ValidatorConfig} [config]
     * @return {LangValidator}
     */
    static create(config) {
        return new LangValidator(config);
    }

    /**
     * @param {ValidatorConfig} [config={}]
     * @return {void}
     */
    constructor(config = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
    }

    /**
     * Validate all files
     * @return {Promise<ValidationResult>}
     */
    async validate() {
        const scriptResult = await this.validateScripts();
        const templateResult = await this.validateTemplates();

        return {
            errors: [
                ...templateResult.errors,
                ...scriptResult.errors,
            ],
        };
    }

    /**
     * Validate each template file
     * @return {Promise<ValidationResult>}
     */
    async validateTemplates() {
        const { langPath, templatePath, validateRegion } = this.config;
        const langFiles = await readLangFiles(langPath, validateRegion);
        const templateFiles = await readFiles(templatePath);
        let errors = [];

        langFiles.forEach((langFile) => {
            templateFiles.forEach((templateFile) => {
                errors = [...errors, ...findTemplateErrors(templateFile, langFile, this.config)];
            });
        });

        return { errors };
    }

    /**
     * Validate each script file
     * @return {Promise<ValidationResult>}
     */
    async validateScripts() {
        const { langPath, scriptPath, validateRegion } = this.config;
        const langFiles = await readLangFiles(langPath, validateRegion);
        const scriptFiles = await readFiles(scriptPath);
        let errors = [];

        langFiles.forEach((langFile) => {
            scriptFiles.forEach((scriptFile) => {
                errors = [...errors, ...findScriptErrors(scriptFile, langFile, this.config)];
            });
        });

        return { errors };
    }
}
