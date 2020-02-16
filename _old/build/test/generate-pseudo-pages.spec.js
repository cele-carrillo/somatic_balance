'use strict';

const {createPseudoPagesGenerator} = require('../src/pseudo-pages-generator');
const {createMockFileSystem} = require('./support/mocks/mock-filesystem');
const {configBuilder} = require('./support/builders/config-builder');
const {entryBuilder} = require('./support/builders/entry-builder');
const expectToReject = require('./support/expect-to-reject');

describe('generatePseudoPages', () => {

    let mockFileSystem;
    let mockConfig;

    const whenGenrateIsInvoked = () => {
        const pseudoPagesGenerator = createPseudoPagesGenerator({fileSystem: mockFileSystem, config: mockConfig});
        return pseudoPagesGenerator.generate();
    };

    beforeEach(() => {
        mockConfig = configBuilder.withYamlEntry('defaultEntry', 'defaultPath').build();
        mockFileSystem = createMockFileSystem();
    });

    it('should open the yaml file entry defined in config', async () => {
        mockConfig = configBuilder.withSingleYamlEntry('someEntry', 'some-path/some-file.yml').build();

        await whenGenrateIsInvoked();

        expect(mockFileSystem.readFile).toHaveBeenCalledWith('some-path/some-file.yml');
    });

    it('should open the yaml file for each entry defined in config', async () => {
        mockConfig = configBuilder
            .withYamlEntry('a', 'a.yml')
            .withYamlEntry('b', 'b.yml')
            .build();

        await whenGenrateIsInvoked();

        expect(mockFileSystem.readFile).toHaveBeenCalledTimes(2);
        expect(mockFileSystem.readFile).toHaveBeenCalledWith('a.yml');
        expect(mockFileSystem.readFile).toHaveBeenCalledWith('b.yml');
    });

    it('should fail when the file can not be opened', async () => {
        const fileSystemError = new Error('file system error');
        mockFileSystem.givenReadFileRejects(fileSystemError);

        const error = await expectToReject(whenGenrateIsInvoked());

        expect(error).toEqual(fileSystemError);
    });

    it('should fail when the content of the file can not be parsed as yaml', async () => {
        mockFileSystem.givenReadFileResolves('{invalid yaml');

        const error = await expectToReject(whenGenrateIsInvoked());

        expect(error.message).toContain('unexpected end of the stream within a flow collection');
    });

    it('should create a directory named after the config entry key', async () => {
        mockConfig = configBuilder.withSingleYamlEntry('someEntry', 'some-path/some-file.yml').build();

        await whenGenrateIsInvoked();

        expect(mockFileSystem.createDir).toHaveBeenCalledWith('someEntry');
    });

    it('should fail when the target directory can not be created', async () => {
        const fileSystemError = new Error('file system error');
        mockFileSystem.givenCreateDirRejects(fileSystemError);

        const error = await expectToReject(whenGenrateIsInvoked());

        expect(error).toEqual(fileSystemError);
    });

    it('should create a file in the target dir named after an page item key in the entry file', async () => {
        mockConfig = configBuilder.withSingleYamlEntry('someEntry', 'some-path/some-file.yml').build();
        mockFileSystem.givenReadFileResolves(entryBuilder.withSinglePageItem('some-page-id', 'foo').buildAsYaml());

        await whenGenrateIsInvoked();

        expect(mockFileSystem.writeFile).toHaveBeenCalledWith('someEntry/some-page-id.html', jasmine.anything());
    });

    it('should create a file in the target dir for each item key in the entry file', async () => {
        mockConfig = configBuilder.withSingleYamlEntry('someEntry', 'some-path/some-file.yml').build();
        mockFileSystem.givenReadFileResolves(
            entryBuilder
                .withPageItem('some-page-id', 'foo')
                .withPageItem('another-page-id', 'foo')
                .buildAsYaml());

        await whenGenrateIsInvoked();

        expect(mockFileSystem.writeFile).toHaveBeenCalledWith('someEntry/some-page-id.html', jasmine.anything());
        expect(mockFileSystem.writeFile).toHaveBeenCalledWith('someEntry/another-page-id.html', jasmine.anything());
    });

    it('should include the jekyll content with title in the created pseudo page', async () => {
        mockConfig = configBuilder.withSingleYamlEntry('an-entry', 'some-path/some-file.yml').build();
        mockFileSystem.givenReadFileResolves(
            entryBuilder.withSinglePageItem('some-page-id', 'The Title').buildAsYaml()
        );

        await whenGenrateIsInvoked();

        const expectedContent = '---\n' +
            'layout: pseudo-page\n' +
            'title: The Title\n' +
            'fragment: an-entry-some-page-id\n' +
            '---\n';
        expect(mockFileSystem.writeFile).toHaveBeenCalledWith(jasmine.anything(), expectedContent);
    });

    it('should generate an index pseudo page file', async () => {
        mockConfig = configBuilder.withSingleYamlEntry('someEntry', 'a-path', 'index title').build();
        mockFileSystem.givenReadFileResolves();

        await whenGenrateIsInvoked();

        const expectedContent = '---\n' +
            'layout: pseudo-page\n' +
            'title: index title\n' +
            'fragment: someEntry\n' +
            '---\n';
        expect(mockFileSystem.writeFile).toHaveBeenCalledWith('someEntry/index.html', expectedContent);
    });
});
