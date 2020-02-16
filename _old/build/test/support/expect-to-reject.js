const expectToReject = async (promise) => {
    let result;
    try {
        result = await promise;
    } catch (e) {
        return e
    }

    throw new Error(`Expected promise to be rejected but was resolved with ${result}`);
};

module.exports = expectToReject;
