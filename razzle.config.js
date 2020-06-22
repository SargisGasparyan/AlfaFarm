'use strict';

const path = require('path');

module.exports = {
  plugins: ['scss', 'typescript'],
  modify(config, { target, dev }) {
    const appConfig = config;
    if (target === 'node' && !dev) appConfig.externals = [];

    const srcPath = path.resolve("./src");
    appConfig.resolve.modules.push(srcPath);
    return appConfig;
  }
};