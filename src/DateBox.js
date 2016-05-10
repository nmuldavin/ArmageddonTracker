var React = require('react');
var dateFormat = require('dateformat');

var DateBox = React.createClass({
  render: function() {
    var style = {
      height: 100,
      width: 20,
      letterSpacing: 6,
      padding: 4,
      float: "left",
      color: "#262626",
      fontSize: "1.7em",
      textAlign: "center",
      fontWeight: "bold"
    };

    var dateString = dateFormat(this.props.date, "dddd mmmm dS, yyyy");
    return (
      <div style={style}>
        {dateString}
      </div>
    );
  }
});

module.exports = DateBox;