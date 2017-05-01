# stencil-lang-validator

[![Build Status](https://travis-ci.org/bigcommerce/stencil-lang-validator.svg?branch=master)](https://travis-ci.org/bigcommerce/stencil-lang-validator)

The purpose of this module is to validate language keys used in templates and scripts of a Stencil theme. If you use language keys that are not defined in your language files, you will get a warning when you run the validator. It is a static checker intended to be used as a part of your build process.

## Usage

You can validate your language files directly in your terminal using the CLI of this module.

### CLI

Install the module globally.

```sh
$ npm install -g @bigcommerce/stencil-lang-validator
```

And run

```sh
$ validate-lang --lang-path './lang/*.json' --template-path './templates/**/*.html'
```

If there are invalid language keys, you'll see an error report in your console.

```sh
/codebases/stencil/templates/components/account/messages-form.html
  2     forms.inbox.send_message is not defined in en-CA.json
  24    forms.inbox.message is not defined in zh.json
  25    common.required is not defined in zh.json
  31    forms.inbox.submit_value is not defined in zh.json
  32    forms.inbox.clear_value is not defined in zh.json

/codebases/stencil/templates/components/account/messages-list.html
  1     account.messages.heading is not defined in en.json
  16    account.messages.merchant_said is not defined in en.json
  18    account.messages.customer_said is not defined in zh.json

✗ 8 problems found
```

Alternatively, you can install the module locally and run it using a npm script.

```json
{
    "scripts": {
        "validate-lang": "validate-lang --lang-path './lang/*.json' --template-path './templates/**/*.html'"
    },
    "devDependencies": {
        "@bigcommerce/stencil-lang-validator": "^1.0.0"
    }
}
```

```sh
$ npm run validate-lang
```

### Node

Install the module locally.

```sh
$ npm install --save-dev @bigcommerce/stencil-lang-validator
```

And import it in your build script.

```js
const { LangValidator } = require('@bigcommerce/stencil-lang-validator');

const validator = LangValidator.create({
    langPath: './lang/*.json',
    templatePath: './templates/**/*.html',
    scriptPath: './assets/**/*.js',
});

validator.validate()
    .then((result) => {
        console.log(result.errors);
    })
    .then((error) => {
        console.log(error);
    });
```

## Options

Below is a list of options you can pass to the validator.

#### langPath

**Type:** string  
**Default:** `'lang/*.json'`  
**CLI:** `--lang-path`  
**Description:** Configure the path to a language file. Pass a glob pattern to validate multiple files.  

#### templatePath

**Type:** string  
**Default:** `'templates/**/*.html'`  
**CLI:** `--template-path`  
**Description:** Configure the path to a template file. Pass a glob pattern to validate multiple files.  

#### scriptPath

**Type:** string  
**Default:** `'assets/**/*.js'`  
**CLI:** `--script-path`  
**Description:** Configure the path to a script file. Pass a glob pattern to validate multiple files.  

#### helperName

**Type:** string  
**Default:** `'lang'`  
**CLI:** `--helper-name`  
**Description:** Configure the helper name used to retrieve language strings in HTML templates.  

#### instanceName

**Type:** string  
**Default:** `'langService'`  
**CLI:** `--instance-name`  
**Description:** Configure the name of an instance responsible for retrieving language strings in JS files.  

#### methodName

**Type:** string  
**Default:** `'translate'`  
**CLI:** `--method-name`  
**Description:** Configure the name of a method responsible for retrieving language strings in JS files.  

#### langKeyPrefix

**Type:** string  
**Default:** `''`  
**CLI:** `--lang-key-prefix`  
**Description:** Configure the prefix applied to language keys.

## Contributing

If you want to contribute, please fork this repository and make a PR with your changes.

To test
```sh
$ npm test
```

To build
```sh
$ npm run build
```
