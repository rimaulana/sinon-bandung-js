var child = require("child_process");

// check whether the is running the platform is linux
var isLinux = process.platform === "linux";

function spyOnMe() {
    console.log("what a creep!");
}

function isRouteExisted(route) {
    var result = child.execSync("route -n | awk 'NR>2{if($1==\"" + route + '") print $1"#"$2"#"$8;}\'');
    result = result.toString().split("#");
    if (result.length == 3) {
        return {
            dest: result[0].trim(),
            gw: result[1].trim(),
            if: result[2].trim()
        };
    } else {
        return null;
    }
}

function addRoute(params) {
    try {
        var route = isRouteExisted(params.dest);
        if (route) {
            child.execSync("ip route del " + route.dest + " via " + route.gw + " dev " + route.if);
        }
        child.execSync("ip route add " + params.dest + " via " + params.gw + " dev " + params.if);
    } catch (error) {
        console.log("Error in adding route " + error.message);
    }
}

module.exports = {
    isRouteExisted: isRouteExisted,
    addRoute: addRoute,
    spyOnMe: spyOnMe
};
