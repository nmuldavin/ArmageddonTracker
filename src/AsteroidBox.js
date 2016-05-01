var React = require('react');
var request = require('browser-request');

var AsteroidBox = React.createClass({
  getInitialState: function() {
    return {
      data: "sheeeeit"
    };
  },
  render: function() {
    return <p>{this.state.data}</p>
  }
});

module.exports = AsteroidBox;