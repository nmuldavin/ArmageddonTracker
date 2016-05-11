var React = require('react');

var DateBox = React.createClass({
  render: function() {
    var style = {
      height: 100,
      width: 20,
      letterSpacing: 6,
      padding: 4,
      float: "left",
      color: "#404040",
      fontSize: "1.7em",
      textAlign: "center",
      fontWeight: "bold"
    };

    var dateString = this.props.date.format("dddd MMMM Do, YYYY");

    return (
      <div style={style}>
        {dateString}
      </div>
    );
  }
});

module.exports = DateBox;