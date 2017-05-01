import { LangValidator } from '../src/lib';

describe('LangValidator', () => {
    describe('#validateTemplates()', () => {
        it('validates language keys used in Stencil template files', (done) => {
            const langValidator = new LangValidator({
                langPath: 'test/mocks/*.json',
                templatePath: 'test/mocks/invalid-stencil-*.html',
            });

            langValidator.validateTemplates()
                .then(({ errors }) => {
                    expect(errors).toEqual([
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
                        {
                            file: `${__dirname}/mocks/invalid-stencil-template.html`,
                            key: 'message_1',
                            langFile: `${__dirname}/mocks/en.json`,
                            line: 3,
                        },
                    ]);
                })
                .then(done)
                .catch(done.fail);
        });

        it('validates language keys used in Angular template files', (done) => {
            const langValidator = new LangValidator({
                langPath: 'test/mocks/*.json',
                templatePath: 'test/mocks/invalid-angular-*.html',
            });

            langValidator.validateTemplates()
                .then(({ errors }) => {
                    expect(errors).toEqual([
                        {
                            file: `${__dirname}/mocks/invalid-angular-template.html`,
                            key: 'test',
                            langFile: `${__dirname}/mocks/en.json`,
                            line: 1,
                        },
                        {
                            file: `${__dirname}/mocks/invalid-angular-template.html`,
                            key: 'another.test',
                            langFile: `${__dirname}/mocks/en.json`,
                            line: 2,
                        },
                        {
                            file: `${__dirname}/mocks/invalid-angular-template.html`,
                            key: 'message_1',
                            langFile: `${__dirname}/mocks/en.json`,
                            line: 3,
                        },
                    ]);
                })
                .then(done)
                .catch(done.fail);
        });

        it('validates region-specific language files if configured', (done) => {
            const langValidator = new LangValidator({
                langPath: 'test/mocks/*.json',
                templatePath: 'test/mocks/valid-stencil-*.html',
                validateRegion: true,
            });

            langValidator.validateTemplates()
                .then(({ errors }) => {
                    expect(errors).toEqual([
                        {
                            file: `${__dirname}/mocks/valid-stencil-template.html`,
                            key: 'top_level_message_1',
                            langFile: `${__dirname}/mocks/en-AU.json`,
                            line: 1,
                        },
                    ]);
                })
                .then(done)
                .catch(done.fail);
        });

        it('returns no errors if there are no invalid language keys in template files', (done) => {
            const langValidator = new LangValidator({
                langPath: 'test/mocks/*.json',
                templatePath: 'test/mocks/valid-*.html',
            });

            langValidator.validateTemplates()
                .then(({ errors }) => {
                    expect(errors).toEqual([]);
                })
                .then(done)
                .catch(done.fail);
        });

        it('returns no errors if language keys have a registered prefix', (done) => {
            const langValidator = new LangValidator({
                langPath: 'test/mocks/*.json',
                templatePath: 'test/mocks/invalid-*.html',
                langKeyPrefix: 'prefixed',
            });

            langValidator.validateTemplates()
                .then(({ errors }) => {
                    expect(errors).not.toContain(jasmine.objectContaining({
                        key: 'prefixed.message_1',
                    }));
                })
                .then(done)
                .catch(done.fail);
        });

        it('returns an error if unable to locate any language file', (done) => {
            const langValidator = new LangValidator({
                langPath: 'test/mocks/missing-*.json',
                templatePath: 'test/mocks/*.html',
            });

            langValidator.validateTemplates()
                .catch((err) => {
                    expect(err).toEqual(jasmine.any(Error));
                })
                .then(done)
                .catch(done.fail);
        });

        it('returns an error if unable to locate any template file', (done) => {
            const langValidator = new LangValidator({
                langPath: 'test/mocks/*.json',
                templatePath: 'test/mocks/missing-*.html',
            });

            langValidator.validateTemplates()
                .catch((err) => {
                    expect(err).toEqual(jasmine.any(Error));
                })
                .then(done)
                .catch(done.fail);
        });
    });

    describe('#validateScripts()', () => {
        it('validates language keys used in script files', (done) => {
            const langValidator = new LangValidator({
                langPath: 'test/mocks/*.json',
                scriptPath: 'test/mocks/invalid-*.js',
            });

            langValidator.validateScripts()
                .then(({ errors }) => {
                    expect(errors).toEqual([
                        {
                            file: `${__dirname}/mocks/invalid-script.js`,
                            key: 'test',
                            langFile: `${__dirname}/mocks/en.json`,
                            line: 12,
                        },
                        {
                            file: `${__dirname}/mocks/invalid-script.js`,
                            key: 'another.test',
                            langFile: `${__dirname}/mocks/en.json`,
                            line: 13,
                        },
                        {
                            file: `${__dirname}/mocks/invalid-script.js`,
                            key: 'message_1',
                            langFile: `${__dirname}/mocks/en.json`,
                            line: 14,
                        },
                    ]);
                })
                .then(done)
                .catch(done.fail);
        });

        it('validates region-specific language files if configured', (done) => {
            const langValidator = new LangValidator({
                langPath: 'test/mocks/*.json',
                scriptPath: 'test/mocks/valid-*.js',
                validateRegion: true,
            });

            langValidator.validateScripts()
                .then(({ errors }) => {
                    expect(errors).toEqual([
                        {
                            file: `${__dirname}/mocks/valid-script.js`,
                            key: 'top_level_message_1',
                            langFile: `${__dirname}/mocks/en-AU.json`,
                            line: 12,
                        },
                    ]);
                })
                .then(done)
                .catch(done.fail);
        });

        it('returns no errors if there are no invalid language keys in script files', (done) => {
            const langValidator = new LangValidator({
                langPath: 'test/mocks/*.json',
                scriptPath: 'test/mocks/valid-*.js',
            });

            langValidator.validateScripts()
                .then(({ errors }) => {
                    expect(errors).toEqual([]);
                })
                .then(done)
                .catch(done.fail);
        });

        it('returns no errors if language keys have a registered prefix', (done) => {
            const langValidator = new LangValidator({
                langPath: 'test/mocks/*.json',
                scriptPath: 'test/mocks/valid-*.js',
                langKeyPrefix: 'prefixed',
            });

            langValidator.validateScripts()
                .then(({ errors }) => {
                    expect(errors).not.toContain(jasmine.objectContaining({
                        key: 'prefixed.message_1',
                    }));
                })
                .then(done)
                .catch(done.fail);
        });

        it('returns an error if unable to locate any language file', (done) => {
            const langValidator = new LangValidator({
                langPath: 'test/mocks/missing-*.json',
                scriptPath: 'test/mocks/*.js',
            });

            langValidator.validateScripts()
                .catch((err) => {
                    expect(err).toEqual(jasmine.any(Error));
                })
                .then(done)
                .catch(done.fail);
        });

        it('returns an error if unable to locate any script file', (done) => {
            const langValidator = new LangValidator({
                langPath: 'test/mocks/*.json',
                scriptPath: 'test/mocks/missing-*.js',
            });

            langValidator.validateScripts()
                .catch((err) => {
                    expect(err).toEqual(jasmine.any(Error));
                })
                .then(done)
                .catch(done.fail);
        });
    });

    describe('#validate()', () => {
        it('validates both language and script files', (done) => {
            const langValidator = new LangValidator({
                langPath: 'test/mocks/*.json',
                scriptPath: 'test/mocks/invalid-*.js',
                templatePath: 'test/mocks/invalid-*.html',
            });

            const expectedErrors = [
                {
                    file: `${__dirname}/mocks/invalid-stencil-template.html`,
                    key: 'test',
                    langFile: `${__dirname}/mocks/en.json`,
                    line: 1,
                },
                {
                    file: `${__dirname}/mocks/invalid-script.js`,
                    key: 'test',
                    langFile: `${__dirname}/mocks/en.json`,
                    line: 12,
                },
            ];

            spyOn(langValidator, 'validateTemplates').and.returnValue({ errors: [expectedErrors[0]] });
            spyOn(langValidator, 'validateScripts').and.returnValue({ errors: [expectedErrors[1]] });

            langValidator.validate()
                .then(({ errors }) => {
                    expect(langValidator.validateScripts).toHaveBeenCalled();
                    expect(langValidator.validateTemplates).toHaveBeenCalled();
                    expect(errors).toEqual(expectedErrors);
                })
                .then(done)
                .catch(done.fail);
        });

        it('returns an error if unable to validate a template or script file', (done) => {
            const langValidator = new LangValidator({
                langPath: 'test/mocks/*.json',
                scriptPath: 'test/mocks/invalid-*.js',
                templatePath: 'test/mocks/invalid-*.html',
            });
            const expectedError = new Error('File not found');

            spyOn(langValidator, 'validateTemplates').and.returnValue(Promise.reject(expectedError));
            spyOn(langValidator, 'validateScripts').and.callThrough();

            langValidator.validate()
                .catch((error) => {
                    expect(error).toEqual(expectedError);
                })
                .then(done)
                .catch(done.fail);
        });
    });
});
