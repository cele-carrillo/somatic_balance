'use strict';

const fileSystem = require('./file-system');
const config = require('./config');
const {createPseudoPagesGenerator} = require('./pseudo-pages-generator');

module.exports = () => {
    const generator = createPseudoPagesGenerator({fileSystem, config});
    return generator.generate();
};
