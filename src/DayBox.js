var React = require('react');
var Asteroid = require('./Asteroid');

var DayBox = React.createClass({
  render: function() {
    return (
      <p>{this.props.day}</p>
    )
  }
});

module.exports = DayBox;

