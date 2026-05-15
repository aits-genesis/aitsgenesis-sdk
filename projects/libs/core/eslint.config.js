// @ts-check
const { defineConfig } = require('eslint/config');
const rootConfig = require('../../../eslint.config.js');

// Extend root config — all @angular-eslint rules and plugins are already
// configured there for projects/**. No need to redeclare them here.
module.exports = defineConfig([...rootConfig]);
