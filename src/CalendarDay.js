var React = require('react');
var Asteroid = require('./Asteroid');
var DateBox = require('./DateBox');

var CalendarDay = React.createClass({
  render: function() {

    var style = {
      height: 206,
      width: 2000,
      float: "left",
      whiteSpace: "nowrap",
      overflowX: "scroll",
      overflowY: "visible",
      padding: 3,
      margin: 0,
      borderBottom: "1px solid #262626"
    };

    var asteroids = this.props.data.map(function(ast) {
      return (
        <Asteroid data={ast} key={ast.id}/>
      )
    });

    return (
      <div style={style}>
        <DateBox date={this.props.date}/>
        {asteroids}
      </div>
    );
  }
});

module.exports = CalendarDay;