const sinon = require('sinon');
const file = require('../file');
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
    }, 30);
  });
  it('Example_1.1 Anonymous spy(2)', (done) => {
    const suprspy = sinon.spy();
    file.read('non-existent', suprspy);
    setTimeout(() => {
      assert(suprspy.calledOnce);
      // assert(suprspy.calledWith('ENOENT: no such file or directory, open \'non-existent\'', null));
      done();
    }, 30);
  });
  it('Example_1.1 Anonymous spy(3)', (done) => {
    const suprspy = sinon.spy();
    file.read('.gitignore', suprspy);
    setTimeout(() => {
      assert(suprspy.calledOnce);
      assert(suprspy.calledWith('Unexpected token . in JSON at position 0', null));
      done();
    }, 30);
  });
});
