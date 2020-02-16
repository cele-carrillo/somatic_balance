const createMockFileSystem = () => {
    const mock = jasmine.createSpyObj('FileSystem', ['readFile', 'createDir', 'writeFile']);

    mock.givenReadFileResolves = (content) => {
        mock.readFile.and.returnValue(Promise.resolve(content));
    };

    mock.givenReadFileRejects = (error) => {
        mock.readFile.and.returnValue(Promise.reject(error));
    };

    mock.givenCreateDirResolves = () => {
        mock.createDir.and.returnValue(Promise.resolve());
    };

    mock.givenCreateDirRejects = (error) => {
        mock.createDir.and.returnValue(Promise.reject(error));
    };

    mock.givenWriteFileResolves = () => {
        mock.writeFile.and.returnValue(Promise.resolve());
    };

    mock.givenWriteFileRejects = (error) => {
        mock.writeFile.and.returnValue(Promise.reject(error));
    };

    mock.givenReadFileResolves('default-content');
    mock.givenCreateDirResolves();
    mock.givenWriteFileResolves();

    return mock
};

module.exports = {createMockFileSystem};
