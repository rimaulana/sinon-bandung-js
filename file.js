const fs = require('fs');
const request = require('request');

const read = (url, callback) => {
  fs.readFile(url, (error, data) => {
    callback(error, data);
  });
};

const generate = (templatePath, map, callback) => {
  const urlRegex = new RegExp('(http[s]?:\\/\\/)([^\\/\\s]+\\/)(.*)');
  const innerCallback = (error, data) => {
    if (error) {
      callback(error.message, null);
    } else {
      let result = data.toString();
      map.forEach((item) => {
        result = result.replace(item.Key, item.Replacement);
      });
      callback(null, result);
    }
  };
  if (templatePath.match(urlRegex)) {
    download(templatePath, innerCallback);
  } else {
    read(templatePath, innerCallback);
  }
};

const download = (url, callback) => {
  request.get(url, (error, res, body) => {
    callback(error, body);
  });
};

module.exports = {
  download, read, generate,
};
