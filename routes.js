const IPRoute = require('./ip-route');

/* eslint no-console:0 */
const replace = (prefix, gateway, dev) => {
  try {
    const existed = IPRoute.get(prefix);
    existed.forEach((route) => {
      IPRoute.del(route);
    });
    IPRoute.add({ pref: prefix, gw: gateway, if: dev });
  } catch (error) {
    console.log(`Error in replacing route: ${error.message}`);
  }
};

const manipulate = (command, prefix, gateway, dev) => {
  try {
    const route = { pref: prefix, gw: gateway, if: dev };
    const existed = IPRoute.isExisted(route);
    if (!existed && command === 'install') {
      IPRoute.add(route);
    }
    if (existed && command === 'uninstall') {
      IPRoute.del(route);
    }
  } catch (error) {
    console.log(`Error in ${command}ing route: ${error.message}`);
  }
};

const install = (prefix, gateway, dev) => {
  manipulate('install', prefix, gateway, dev);
};

const uninstall = (prefix, gateway, dev) => {
  manipulate('uninstall', prefix, gateway, dev);
};

module.exports = {
  replace, uninstall, install,
};
