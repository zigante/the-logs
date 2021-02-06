const fs = require('fs');
const path = require('path');

const ORIG_PKG_PATH = path.resolve(__dirname, '../package.json');
const CACHED_PKG_PATH = path.resolve(__dirname, './cached-package.json');
const pkgData = require(ORIG_PKG_PATH);

fs.writeFile(CACHED_PKG_PATH, JSON.stringify(pkgData), err => {
  if (err) throw err;
});

Object.keys(pkgData.scripts).forEach(scriptName => {
  if (!['prepublish', 'postpublish'].includes(scriptName)) delete pkgData.scripts[scriptName];
});

delete pkgData.devDependencies;

fs.writeFile(ORIG_PKG_PATH, JSON.stringify(pkgData, null, 2), err => {
  if (err) throw err;
});
