var React = require('react');

var Asteroid = React.createClass({
  render: function() {
    return (
      <p>{JSON.stringify(this.props.data)}</p>
    )
  }
});

module.exports = Asteroid;