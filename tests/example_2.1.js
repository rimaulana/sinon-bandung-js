const sinon = require('sinon');
const file = require('../file');
const fs = require('fs');
const { expect } = require('chai');
const request = require('request');

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

const expectedString = 'rimaulana@172.16.1.92:689';
const returnedString = '#USER_NAME@#SERVER_IP:#SERVER_PORT';

/* eslint no-undef:0 no-new-func:0 */
describe('Unit test for file.js with stub', () => {
  it('Example_2.1 stubbing request.get', () => {
    const anon = sinon.spy();
    const stub = sinon.stub(request, 'get');
    const url = 'https://email-gw.com/template.txt';
    stub.callsArgWith(1, null, null, returnedString);
    file.generate(url, map, anon);
    sinon.assert.called(anon);
    expect(anon.args[0][1]).to.be.equal(expectedString);
    stub.restore();
  });
  it('Example_2.1 stubbing fs.readFile', (done) => {
    const stub = sinon.stub(fs, 'readFile');
    const url = 'bla-bla-bla';
    stub.callsArgWith(1, null, returnedString);
    file.generate(url, map, (error, data) => {
      expect(data).to.be.equal(expectedString);
      stub.restore();
      done();
    });
  });
});
