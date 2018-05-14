const sinon = require('sinon');
const file = require('../file');
const fs = require('fs');
const { assert } = require('chai');

/* eslint no-undef:0 no-unused-expressions:0 */
describe('Unit test for file.js', () => {
  it('Example_1.1 Anonymous spy(1)', (done) => {
    const superspy = sinon.spy();
    file.read('./test.json', superspy);
    setTimeout(() => {
      sinon.assert.calledOnce(superspy);
      sinon.assert.calledWith(superspy, null, { message: 'bandung.js #12' });
      done();
    }, 10);
  });
  it('Example_1.1 Anonymous spy(2)', (done) => {
    const suprspy = sinon.spy();
    file.read('non-existent', suprspy);
    setTimeout(() => {
      assert(suprspy.calledOnce);
      assert(/^ENOENT:.*/.test(suprspy.args[0]), 'Error message should match ENONET');
      done();
    }, 10);
  });
  it('Example_1.1 Anonymous spy(3)', (done) => {
    const suprspy = sinon.spy();
    file.read('.gitignore', suprspy);
    setTimeout(() => {
      assert(suprspy.calledOnce);
      assert(/Unexpected token.*/.test(suprspy.args[0]), 'Error message should match Unexpected token');
      done();
    }, 10);
  });
  it('Example_1.2 Wrapper spy', () => {
    const spy = sinon.spy(fs, 'readFileSync');
    fs.readFileSync('./test.json');
    assert(spy.withArgs('./test.json').calledOnce);
  });
});
