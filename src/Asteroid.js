var React = require('react');

var Asteroid = React.createClass({
  render: function() {
    return (
      <p>{this.props.key}</p>
    )
  }
});

module.exports = Asteroid;