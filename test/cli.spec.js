import chalk from 'chalk';
import { validateLang } from '../src/lib';
import * as logger from '../src/lib/logger';

describe('validateLang()', () => {
    beforeEach(() => {
        const spinner = jasmine.createSpyObj('spinner', ['start', 'succeed', 'fail']);

        chalk.enabled = false;

        spyOn(logger, 'logError');
        spyOn(logger, 'logInfo');
        spyOn(logger, 'logSuccess');
        spyOn(logger, 'logProgress').and.returnValue(spinner);
    });

    afterEach(() => {
        chalk.enabled = true;
    });

    it('logs error messages if some language keys are invalid', (done) => {
        validateLang({
            langPath: 'test/mocks/*.json',
            scriptPath: 'test/mocks/valid-*.js',
            templatePath: 'test/mocks/invalid-stencil-*.html',
        })
            .then(() => {
                expect(logger.logProgress).toHaveBeenCalledWith('Validating language files...');
                expect(logger.logInfo).toHaveBeenCalledWith(`${__dirname}/mocks/invalid-stencil-template.html`);
                expect(logger.logInfo).toHaveBeenCalledWith('  1     test is not defined in en.json');
                expect(logger.logInfo).toHaveBeenCalledWith('  2     another.test is not defined in en.json');
                expect(logger.logInfo).toHaveBeenCalledWith('  3     message_1 is not defined in en.json');
                expect(logger.logError).toHaveBeenCalledWith('✗ 3 problems found');
            })
            .then(done)
            .catch(done.fail);
    });

    it('logs a success message if all lanugage keys are valid', (done) => {
        validateLang({
            langPath: 'test/mocks/*.json',
            scriptPath: 'test/mocks/valid-*.js',
            templatePath: 'test/mocks/valid-stencil-*.html',
        })
            .then(() => {
                expect(logger.logProgress).toHaveBeenCalledWith('Validating language files...');
                expect(logger.logSuccess).toHaveBeenCalledWith('✓ 0 problems found');
            })
            .then(done)
            .catch(done.fail);
    });
});
