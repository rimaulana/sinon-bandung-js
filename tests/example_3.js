const sinon = require('sinon');
const routes = require('../routes');
const IPRoute = require('../ip-route');

const entries = [
  { pref: '10.0.0.0/24', gw: '172.16.0.1', if: 'ens160' },
  { pref: '10.0.0.0/24', gw: '172.16.1.1', if: 'ens192' },
  { pref: '10.0.0.0/24', gw: '172.16.2.1', if: 'ens224' },
];
/* eslint no-undef:0 no-unused-expressions:0 */
describe('Unit test for routes.js', () => {
  beforeEach(() => {
    this.mock = sinon.mock(IPRoute);
  });
  afterEach(() => {
    this.mock.restore();
  });
  it('Should successfully install route when it doesn\'t exist', () => {
    this.mock.expects('isExisted').once().returns(false);
    this.mock.expects('add').once();
    routes.install('10.0.0.0/23', '172.16.1.1', 'ens160');
    this.mock.verify();
  });
  it('Should do nothing when route exist', () => {
    this.mock.expects('isExisted').once().returns(true);
    this.mock.expects('add').never();
    routes.install('10.0.0.0/23', '172.16.1.1', 'ens160');
    this.mock.verify();
  });
  it('Should delete route when exist', () => {
    this.mock.expects('isExisted').once().returns(true);
    this.mock.expects('del').once();
    routes.uninstall('10.0.0.0/23', '172.16.1.1', 'ens160');
    this.mock.verify();
  });
  it('Should throw an error when trying to delete route', () => {
    this.mock.expects('isExisted').once().returns(true);
    this.mock.expects('del').once().throws(new Error('Something went wrong'));
    routes.uninstall('10.0.0.0/23', '172.16.1.1', 'ens160');
    this.mock.verify();
  });
  it('Should delete routes before adding new one', () => {
    this.mock.expects('isExisted').never();
    this.mock.expects('get').once().returns(entries);
    this.mock.expects('del').exactly(entries.length);
    this.mock.expects('add').once();
    routes.replace('10.0.0.0/24', '172.16.3.1', 'ens256');
    this.mock.verify();
  });
  it('Should throw an error when trying to delete routes and add will never be called', () => {
    this.mock.expects('isExisted').never();
    this.mock.expects('get').once().returns(entries);
    this.mock.expects('del').twice()
      .onSecondCall()
      .throws(new Error('on purpose'));
    this.mock.expects('add').never();
    routes.replace('10.0.0.0/24', '172.16.3.1', 'ens256');
    this.mock.verify();
  });
});

