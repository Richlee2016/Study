const path = require('path');

const SERVER_PATH = path.resolve(__dirname, '../server/app');
const DIR_PATH = 'web';

exports.root = p => path.join(SERVER_PATH, p);
exports.dirRoot = p => `${DIR_PATH}${p}`;
