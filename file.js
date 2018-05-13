const fs = require('fs');
const request = require('request');

const parseJSON = data => new Promise((resolve, reject) => {
  try {
    const result = JSON.parse(data);
    resolve(result);
  } catch (error) {
    reject(error);
  }
});

const read = (url, callback) => {
  fs.readFile(url, (error, data) => {
    if (error) {
      callback(error.message, null);
    } else {
      parseJSON(data.toString())
        .then(result => callback(null, result))
        .catch(err => callback(err.message, null));
    }
  });
};

const download = (url, callback) => {
  request.get(url, (error, res, body) => {
    callback(error, body);
  });
};

module.exports = {
  read, parseJSON, download,
};
