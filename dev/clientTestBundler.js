import 'babel-polyfill';
import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();

// require all `.spec.js` anywhere in the client src code
const testsContext = require.context('../src/client/', true, /\.spec\.js$/);

testsContext.keys().forEach(testsContext);

// require all `src/client/**/*.js` except for top level files
if (REPORT_COVERAGE) {
  const componentsContext = require.context(
    '../src/client/',
    true,
    /^((?!main|hotReload|index|createStore|\.spec).)*\.js$/
  );

  componentsContext.keys().forEach(componentsContext);
}
