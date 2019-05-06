'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');

class FileSystem {
    readFile(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        })
    }

    writeFile(path, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, content, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    createDir(path) {
        return new Promise((resolve, reject) => {
            mkdirp(path, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = new FileSystem();
