"use strict";

var iperf = require("../iperf");
var expect = require("chai").expect;
var child = require("child_process");
var sinon = require("sinon");

describe("Testing for iperf.js file", function() {
    it("should get 0.0.0.0 route", function(done) {
        var exe = sinon.stub(child, "execSync");
        exe.returns("0.0.0.0#172.16.28.1#ens160");
        var route = iperf.isRouteExisted("0.0.0.0");
        expect(route).to.be.deep.equal({
            dest: "0.0.0.0",
            gw: "172.16.28.1",
            if: "ens160"
        });
        exe.restore();
        done();
    });
    it("should return null on non-existence route", function(done) {
        var exe = sinon.stub(child, "execSync");
        exe.returns("");
        var route = iperf.isRouteExisted("7.7.7.7");
        expect(route).to.be.null;
        exe.restore();
        done();
    });
    it("should spy on spyOnMe()", function(done) {
        var spy = sinon.spy(console, "log");
        iperf.spyOnMe();
        sinon.assert.calledWith(spy, "what a creep!");
        spy.restore();
        done();
    });
});
