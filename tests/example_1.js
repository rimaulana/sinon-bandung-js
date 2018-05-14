const sinon = require('sinon');
const file = require('../file');
const request = require('request');
const fs = require('fs');
const { assert } = require('chai');

const map = [
  {
    Key: '#SERVER_IP',
    Replacement: '172.16.1.92',
  },
  {
    Key: '#SERVER_PORT',
    Replacement: '689',
  },
  {
    Key: '#USER_NAME',
    Replacement: 'rimaulana',
  },
];

const expectedString = '[config]\n\tserver_url=ldaps://172.16.1.92:689/\n\tusername=rimaulana';

/* eslint no-undef:0 no-unused-expressions:0 */
describe('Unit test for file.js', () => {
  it('Example_1.1 Anonymous spy(1)', (done) => {
    const anon = sinon.spy();
    file.generate('./template.txt', map, anon);
    setTimeout(() => {
      sinon.assert.called(anon);
      sinon.assert.calledWith(anon, null, expectedString);
      done();
    }, 10);
  });
  it('Example_1.1 Anonymous spy(2)', (done) => {
    const anon = sinon.spy();
    const url = 'https://raw.githubusercontent.com/rimaulana/sinon-bandung-js/master/template.txt';
    file.generate(url, map, anon);
    setTimeout(() => {
      sinon.assert.called(anon);
      sinon.assert.calledWith(anon, null, expectedString);
      done();
    }, 500);
  });
  it('Example_1.1 Anonymous spy(3)', (done) => {
    const anon = sinon.spy();
    file.generate('non-existent', map, anon);
    setTimeout(() => {
      assert(anon.calledOnce);
      assert(/^ENOENT:.*/.test(anon.args[0]), 'Error message should match ENONET');
      done();
    }, 10);
  });
  it('Example_1.2 wrapper spy(1)', (done) => {
    const wrapper = sinon.spy(request, 'get');
    const url = 'https://raw.githubusercontent.com/rimaulana/sinon-bandung-js/master/template.txt';
    file.generate(url, map, () => {
      assert(wrapper.args[0][0] === url, `should match ${url} instead get ${wrapper.args[0][0]}`);
      wrapper.restore();
      done();
    });
  });
  it('Example_1.2 wrapper spy(2)', (done) => {
    const wrapper = sinon.spy(fs, 'readFile');
    const url = './template.txt';
    file.generate(url, map, () => {
      sinon.assert.called(wrapper);
      assert(wrapper.args[0][0] === url, `should match ${url} instead get ${wrapper.args[0][0]}`);
      wrapper.restore();
      done();
    });
  });
});
