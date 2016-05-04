var React = require('react');
var Asteroid = require('./Asteroid');
var DateBox = require('./DateBox');

var DayBox = React.createClass({
  render: function() {

    var asteroids = this.props.data.map(function(ast) {
      return (
        <Asteroid data={ast} key={ast.id}/>
      )
    });

    return (
      <div className="day" >
        <DateBox date={this.props.date} />
        {asteroids}
      </div>
    );
  }
});

module.exports = DayBox;

