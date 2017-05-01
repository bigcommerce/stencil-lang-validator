'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * The default validator config
 * @type {ValidatorConfig}
 */
var DEFAULT_CONFIG = {
    helperName: 'lang',
    instanceName: 'langService',
    langKeyPrefix: '',
    langPath: 'lang/**/*.json',
    methodName: 'translate',
    scriptPath: 'assets/**/*.js',
    templatePath: 'templates/**/*.html',
    validateRegion: false
};

exports.default = DEFAULT_CONFIG;
//# sourceMappingURL=default-config.js.map