const _ = require('lodash');
const yaml = require('js-yaml');

class EntryBuilder {
    constructor(state) {
        this.state = state;
    }

    withSinglePageItem(key, pageTitle) {
        return new EntryBuilder({[key]: {title: pageTitle}});
    }

    withPageItem(key, pageTitle) {
        return new EntryBuilder({...this.state, [key]: {title: pageTitle}});
    }

    build() {
        return _.cloneDeep(this.state);
    }

    buildAsYaml() {
        return yaml.safeDump(this.build());
    }
}

module.exports = {entryBuilder: new EntryBuilder({})};
