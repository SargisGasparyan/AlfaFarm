'use strict';

const path = require('path');

module.exports = {
  plugins: ['scss', 'typescript'],
  modifyWebpackConfig({
    webpackConfig,
    env: { target, dev },
  }) {
    const appConfig = webpackConfig;
    if (target === 'node' && !dev) appConfig.externals = [];
    const srcPath = path.resolve("./src");
    appConfig.resolve.modules.push(srcPath);
    return appConfig;
  }
};