/**
 * The default validator config
 * @type {ValidatorConfig}
 */
const DEFAULT_CONFIG = {
    helperName: 'lang',
    instanceName: 'langService',
    langKeyPrefix: '',
    langPath: 'lang/**/*.json',
    methodName: 'translate',
    scriptPath: 'assets/**/*.js',
    templatePath: 'templates/**/*.html',
    validateRegion: false,
};

export default DEFAULT_CONFIG;
