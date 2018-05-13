const sinon = require('sinon');
const file = require('../file');
const fs = require('fs');
const request = require('request');

/* eslint no-undef:0 no-new-func:0 */
describe('Unit test for file.js with stub', () => {
  it('Should successfully parse the file', (done) => {
    const expected = { message: 'bandung.js #12' };
    const stub = sinon.stub(fs, 'readFile');
    const spy = sinon.spy();
    stub.callsArgWith(1, null, JSON.stringify(expected));
    file.read('./test2.json', spy);
    setTimeout(() => {
      sinon.assert.calledWith(spy, null, expected);
      stub.restore();
      done();
    }, 30);
  });
  it('Should successfully download', () => {
    const expected = 'welcome to bandung.js #12';
    const stub = sinon.stub(request, 'get');
    const spy = sinon.spy();
    stub.callsArgWith(1, null, null, expected);
    file.download('www.google.com', spy);
    sinon.assert.calledWith(spy, null, expected);
    stub.restore();
  });
});
