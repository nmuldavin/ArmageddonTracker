var React = require('react');

var Header = React.createClass({
  render: function() {
    var containerStyle = {
      width: "100%",
      height: 200,
      minWidth: 2000,
      display: "block",
      float: "left",
      borderBottom: "1px solid #262626",
      paddingBottom: 5
    };

    var titleStyle = {
      fontSize: "4em",
      letterSpacing: 13,
      color: "white"
    };

    var titleBoxStyle = {
      width: window.innerWidth,
      top: "50%",
      position: "relative",
      transform: "translateY(-50%)",
      textAlign: "center"
    };

    return (
      <div style={containerStyle}>
        <div style={titleBoxStyle}>
          <div style={titleStyle}>Armageddon Tracker</div>
        </div>
      </div>
    );
  }
});

module.exports = Header;