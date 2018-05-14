const caller = require('../caller');
const { expect } = require('chai');
const sinon = require('sinon');
const request = require('request');

/* eslint no-undef:0 no-unused-expressions:0 */
describe('#unit test for caller.js', () => {
  beforeEach(() => {
    this.stub = sinon.stub(request, 'get');
    // this.clock = sinon.useFakeTimers();
  });
  afterEach(() => {
    this.stub.restore();
  });
  it('Should retry three times and throw error', (done) => {
    this.stub.callsArgWith(1, new Error('error'), null, null);
    caller.callWithCallback('http://www.google.com', (error) => {
      expect(error.message).to.be.equal('error');
      done();
    });
  });
  it('Should retry two times and success', (done) => {
    this.stub.onFirstCall().callsArgWith(1, new Error('error'), null, null);
    this.stub.callsArgWith(1, null, null, JSON.stringify({ res: 'yeah' }));
    caller.callWithCallback('http://www.google.com', (error, data) => {
      expect(data).to.be.deep.equal(JSON.stringify({ res: 'yeah' }));
      done();
    });
  });
  // it('Should retry three times and throw error with timer', (done) => {
  //   const clock = sinon.useFakeTimers();
  //   this.stub.callsArgWith(1, new Error('error'), null, null);
  //   caller.callWithCallback('http://www.google.com', (error) => {
  //     expect(error.message).to.be.equal('error');
  //     clock.restore();
  //     done();
  //   });
  //   clock.tick(5000);
  //   clock.tick(5000);
  //   clock.tick(5000);
  // });
  // it('Should retry two times and success with timer', (done) => {
  //   const clock = sinon.useFakeTimers();
  //   this.stub.onFirstCall().callsArgWith(1, new Error('error'), null, null);
  //   this.stub.callsArgWith(1, null, null, JSON.stringify({ res: 'yeah' }));
  //   caller.callWithCallback('http://www.google.com', (error, data) => {
  //     expect(data).to.be.deep.equal(JSON.stringify({ res: 'yeah' }));
  //     clock.restore();
  //     done();
  //   });
  //   clock.tick(5000);
  // });
});
