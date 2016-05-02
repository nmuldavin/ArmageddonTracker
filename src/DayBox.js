var React = require('react');
var Asteroid = require('./Asteroid');

var DayBox = React.createClass({
  render: function() {

    var asteroids = this.props.data.map(function(ast) {
      return (
        <Asteroid data={ast} key={ast.id}/>
      )
    });

    return (
      <div>
        <p>{this.props.date.toString()}</p>
        {asteroids}
      </div>
    );
  }
});

module.exports = DayBox;

