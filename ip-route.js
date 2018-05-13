const child = require('child_process');

const get = (prefix) => {
  const routes = child.execSync(`ip route | grep ${prefix}`).split('\n');
  const result = [];
  routes.forEach((route) => {
    const buffer = route.split(' ');
    if (buffer.length === 5) {
      result.push({
        pref: buffer[0].trim(),
        gw: buffer[2].trim(),
        if: buffer[4].trim(),
      });
    }
  });
  return result;
};

const isExisted = (params) => {
  const exist = child.execSync(`ip route | grep ${params.pref} | grep ${params.gw} | grep ${params.if}`);
  if (exist !== '') {
    return true;
  }
  return false;
};

const add = (params) => {
  child.execSync(`ip route add ${params.pref} via ${params.gw} dev ${params.if}`);
};

const del = (params) => {
  child.execSync(`ip route del ${params.pref} via ${params.gw} dev ${params.if}`);
};

module.exports = {
  get, add, del, isExisted,
};
