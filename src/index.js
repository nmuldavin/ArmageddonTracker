var ReactDOM = require('react-dom');
var React = require('react');
var Calendar = require('./Calendar');

ReactDOM.render(
  <div>
    <div id="topbar">
      <h1 id="title">Armageddon Tracker</h1>
    </div>
    <Calendar />
  </div>

  ,
  document.getElementById('app')
);