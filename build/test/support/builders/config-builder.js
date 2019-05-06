const _ = require('lodash');

class ConfigBuilder {
    constructor(state) {
        this.state = state;
    }

    withSingleYamlEntry(name, file, title) {
        return new ConfigBuilder({[name]: {file, title}});
    }

    withYamlEntry(name, file, fragmentPrefix, title) {
        return new ConfigBuilder({...this.state, [name]: {file, title}});
    }

    build() {
        return {entries: _.cloneDeep(this.state)};
    }
}

module.exports = {configBuilder: new ConfigBuilder()};
