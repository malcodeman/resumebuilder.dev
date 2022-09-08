# [resumebuilder.dev](https://www.resumebuilder.dev)

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)](https://cypress.io)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/malcodeman/resumebuilder.dev/blob/master/LICENSE)

Free resume builder for developers.

![Screenshot](readme/screenshot.png)

## Getting started

```
git clone https://github.com/malcodeman/resumebuilder.dev.git
cd resumebuilder.dev
yarn install
yarn dev
```

## Testing

Project contains both unit(`jest`) and e2e(`cypress`) tests.

```
"test": "jest --watch",
"test:ci": "jest --ci",
"cypress:open": "cypress open",
"cypress:ci": "cypress run --headless"
```

## License

[MIT](./LICENSE)
