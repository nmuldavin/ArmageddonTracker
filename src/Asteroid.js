var React = require('react');
var ExpandingCircle = require('./ExpandingCircle');
var formatNumber = require('format-number-with-string');

var asteroidStyle = {
  backgroundColor: "gray",
  fontFamily: "Orbitron",
};

var wholeNumber = function(num) {
  return formatNumber(num, '##,##0.');
};

var Asteroid = React.createClass({
  render: function() {
    var moreInfo = (
      <div>Sheeeeeit</div>
    );
    return (
      <ExpandingCircle
        dimensions={{standardRadius: 60, expandedRadius: 100}}
        style={asteroidStyle}
        extraContent={moreInfo}
      >
        <p style={{marginTop: 35}}>{this.props.data.name}</p>
      </ExpandingCircle>
    );
  }
});

module.exports = Asteroid;