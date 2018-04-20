const { expect } = require('chai');
const sinon = require('sinon');
const math = require('../math');

/* eslint no-undef:0 no-unused-expressions:0 */
describe('#Unit test for math.js', () => {
  it('Should 4 + 5 = 9', () => {
    const spy = sinon.spy(math, 'add');
    expect(math.add(5, 4)).to.be.equal(9);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, 5, 4);
    spy.restore();
  });
  it('Should 2 ^ 3 = 8', () => {
    const spy = sinon.stub(math, 'power');
    spy.returns(8);
    expect(math.power(2, 3)).to.be.equal(8);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, 2, 3);
    spy.restore();
  });
});

