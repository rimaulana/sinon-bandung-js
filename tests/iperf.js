const iperf = require('../iperf');
const { expect } = require('chai');
const child = require('child_process');
const sinon = require('sinon');

/* eslint no-undef:0 no-unused-expressions:0 */
describe('#Unit test for iperf.js function isRouteExisted()', () => {
  beforeEach(() => {
    this.exe = sinon.stub(child, 'execSync');
  });
  afterEach(() => {
    this.exe.restore();
  });
  it('should get 0.0.0.0 route', (done) => {
    this.exe.returns('0.0.0.0#172.16.28.1#ens160');
    const route = iperf.isRouteExisted('0.0.0.0');
    expect(route).to.be.deep.equal({
      dest: '0.0.0.0',
      gw: '172.16.28.1',
      if: 'ens160',
    });
    done();
  });
  it('should return null on non-existence route', (done) => {
    this.exe.returns('');
    const route = iperf.isRouteExisted('7.7.7.7');
    expect(route).to.be.null;
    done();
  });
});
describe('#Unit test for iperf.js function spyOnMe()', () => {
  it('should be executed with param what a creep!', (done) => {
    const spy = sinon.spy(console, 'log');
    iperf.spyOnMe();
    sinon.assert.calledWith(spy, 'what a creep!');
    spy.restore();
    done();
  });
});
describe('#Unit test for iperf.js function addRoute()', () => {
  beforeEach(() => {
    this.childMock = sinon.mock(child);
  });
  afterEach(() => {
    this.childMock.restore();
  });
  it('Should delete route before adding new route', () => {
    this.childMock.expects('execSync').thrice().returns('0.0.0.0#172.16.28.1#ens160');
    iperf.addRoute({ dest: '0.0.0.0', gw: '172.16.28.1', if: 'ens160' });
    this.childMock.verify();
  });
  it('Should add right away when route doesn\'t existed', () => {
    this.childMock.expects('execSync').twice().returns('');
    iperf.addRoute({ dest: '0.0.0.0', gw: '172.16.28.1', if: 'ens160' });
    this.childMock.verify();
  });
  it('Should handle error when it is occurred', () => {
    this.childMock.expects('execSync').once().throws(new Error('Something went wrong'));
    iperf.addRoute({ dest: '0.0.0.0', gw: '172.16.28.1', if: 'ens160' });
    this.childMock.verify();
  });
});
