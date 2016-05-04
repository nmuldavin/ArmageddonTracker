var React = require('react');
var dateFormat = require('dateformat');

var DateBox = React.createClass({
  render: function() {
    var day = dateFormat(this.props.date, "dddd");
    var dateString = dateFormat(this.props.date, "mmmm dS, yyyy");
    return (
      <div className="datebox">
        <div className="date">
          <h2>{day}</h2>
          <h2>{dateString}</h2>
        </div>
      </div>
    );
  }
});

module.exports = DateBox;