'use strict';

const path = require('path');
const fs = require('fs');

const raw = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

module.exports = raw.split('\n').filter((message) => message.length);
