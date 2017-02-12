import LangValidator from '../lang-validator';

/**
 * Run the language validator in a separate process
 * @return {void}
 */
function run() {
    process.on('message', async (config) => {
        try {
            const validator = LangValidator.create(config);
            const result = await validator.validate();

            process.send({ result });
        } catch (error) {
            process.send({ error: `${error}` });
        }
    });
}

run();
