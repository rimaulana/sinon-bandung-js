const request = require('request');

const retryWithCallback = (params, callback, times, delay) => {
  let retries = times;
  let error;
  const attempt = () => {
    if (retries === 0) {
      callback(error, null);
    } else {
      request.get(params, (errs, response, body) => {
        if (errs) {
          error = errs;
          retries -= 1;
          setTimeout(() => { attempt(); }, delay);
        } else {
          callback(null, body);
        }
      });
    }
  };
  attempt();
};

const callWithCallback = (url, callback) => {
  retryWithCallback(url, callback, 3, 20);
};

module.exports = {
  callWithCallback,
};
