const fs = require("fs");

function readDirectory(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (error, files) => {
      if (error) {
        reject(error);
      } else {
        resolve(files);
      }
    });
  });
}

module.exports = {
  readDirectory,
};
