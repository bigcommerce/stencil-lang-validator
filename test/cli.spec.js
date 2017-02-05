import chalk from 'chalk';
import { LangValidator, validateLang } from '../src/lib';
import * as logger from '../src/lib/logger';

describe('validateLang()', () => {
    beforeEach(() => {
        chalk.enabled = false;
    });

    it('logs error messages if some language keys are invalid', (done) => {
        spyOn(LangValidator, 'create').and.returnValue({
            validate() {
                return Promise.resolve({
                    errors: [
                        {
                            file: `${__dirname}/mocks/invalid-stencil-template.html`,
                            key: 'test',
                            langFile: `${__dirname}/mocks/en.json`,
                            line: 1,
                        },
                        {
                            file: `${__dirname}/mocks/invalid-stencil-template.html`,
                            key: 'another.test',
                            langFile: `${__dirname}/mocks/en.json`,
                            line: 2,
                        },
                    ],
                });
            },
        });

        spyOn(logger, 'logError');
        spyOn(logger, 'logInfo');

        validateLang()
            .then(() => {
                expect(logger.logInfo).toHaveBeenCalledWith('Validating language files...');
                expect(logger.logInfo).toHaveBeenCalledWith(`${__dirname}/mocks/invalid-stencil-template.html`);
                expect(logger.logInfo).toHaveBeenCalledWith('  1     test is not defined in en.json');
                expect(logger.logInfo).toHaveBeenCalledWith('  2     another.test is not defined in en.json');
                expect(logger.logError).toHaveBeenCalledWith('✗ 2 problems found');

                done();
            })
            .catch(done.fail);
    });

    it('logs a success message if all lanugage keys are valid', (done) => {
        spyOn(LangValidator, 'create').and.returnValue({
            validate() {
                return Promise.resolve({
                    errors: [],
                });
            },
        });

        spyOn(logger, 'logInfo');
        spyOn(logger, 'logSuccess');

        validateLang()
            .then(() => {
                expect(logger.logInfo).toHaveBeenCalledWith('Validating language files...');
                expect(logger.logSuccess).toHaveBeenCalledWith('✓ 0 problems found');

                done();
            })
            .catch(done.fail);
    });
});
