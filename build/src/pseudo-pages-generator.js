'use strict';
const yaml = require('js-yaml');

class PseudoPagesGenerator {
    constructor(fileSystem, config) {
        this.config = config;
        this.fileSystem = fileSystem;
    }

    generate() {
        const processedEntries = Object.keys(this.config.entries)
            .map((destination) => this.processEntry(destination, this.config.entries[destination]));
        return Promise.all(processedEntries);
    }

    async processEntry(entryId, entry) {
        const entryContent = await this.loadEntry(entry);
        await this.fileSystem.createDir(entryId);

        await this.createIndexPseudoPage(entryId, entry.title)
        return Promise.all(
            Object.keys(entryContent)
                .map((pageId) => this.createPseudoPage(entryId, pageId, entryContent[pageId]))
        );
    }

    async loadEntry(entry) {
        const content = await this.fileSystem.readFile(entry.file);
        return yaml.safeLoad(content);
    }

    async createIndexPseudoPage(entryId, title) {
        const destinationPage = `${entryId}/index.html`;
        const content = '---\n' +
            'layout: pseudo-page\n' +
            `title: ${title}\n` +
            `fragment: ${entryId}\n` +
            '---\n';
        await this.fileSystem.writeFile(destinationPage, content);
    }

    async createPseudoPage(entryId, pageId, pageDescriptor) {
        const destinationPage = `${entryId}/${pageId}.html`;
        const content = '---\n' +
            'layout: pseudo-page\n' +
            `title: ${pageDescriptor.title}\n` +
            `fragment: ${entryId}-${pageId}\n` +
            '---\n';
        await this.fileSystem.writeFile(destinationPage, content);
    }
}

const createPseudoPagesGenerator = ({fileSystem, config}) => new PseudoPagesGenerator(fileSystem, config);

module.exports = {createPseudoPagesGenerator};
