const child = require('child_process');

// check whether the is running the platform is linux
// const isLinux = process.platform === 'linux';

const spyOnMe = () => {
  console.log('what a creep!');
};

const isRouteExisted = (route) => {
  let result = child.execSync(`route -n | awk 'NR>2{if($1=="${route}") print $1"#"$2"#"$8;}'`);
  result = result.toString().split('#');
  if (result.length === 3) {
    return {
      dest: result[0].trim(),
      gw: result[1].trim(),
      if: result[2].trim(),
    };
  }
  return null;
};

const addRoute = (params) => {
  try {
    const route = isRouteExisted(params.dest);
    if (route) {
      child.execSync(`ip route del ${route.dest} via ${route.gw} dev ${route.if}`);
    }
    child.execSync(`ip route add ${params.dest} via ${params.gw} dev ${params.if}`);
  } catch (error) {
    console.log(`Error in adding route ${error.message}`);
  }
};

module.exports = {
  isRouteExisted,
  addRoute,
  spyOnMe,
};
