'use strict';

require('./main.scss');
require('./main');
require('./test');
let packageV = require('../../package.json');

console.log(packageV.dependencies);