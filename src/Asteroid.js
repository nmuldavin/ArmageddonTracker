var React = require('react');
var ExpandingCircle = require('./ExpandingCircle');
var formatNumber = require('format-number-with-string');

var wholeNumber = function(num) {
  return formatNumber(num, '##,##0.');
};

var Asteroid = React.createClass({
  render: function() {
    var asteroidStyle = {
      position: "relative",
      top: "50%",
      fontSize: "115%",
      margin: 0,
      transform: "translateY(-50%)",
      float: "left",
      backgroundColor: "gray"
    };

    var contentStyle = {
      fontSize: "70%",
      display: "inlineBlock",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translateX(-50%) translateY(-45%)"
    };

    var tableStyle = {
      textAlign: "left",
      whiteSpace: "nowrap"
    };

    var linkStyle = {
      color: "#000066",
      textDecoration: "none"
    };

    var moreInfo = (
      <div style={contentStyle}>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td>
                Relative Velocity:
              </td>
              <td>
                {wholeNumber(this.props.data.relative_velocity) + " km/h"}
              </td>
            </tr>
            <tr>
              <td>
                Miss Distance:
              </td>
              <td>
                {wholeNumber(this.props.data.miss_distance) + " km"}
              </td>
            </tr>
            <tr>
              <td>
                Hazardous:
              </td>
              <td>
                {this.props.data.shoud_we_call_bruce ? "Yes" : "No"}
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{paddingTop: 5}}><a style={linkStyle} href={this.props.data.jpl_url} target="_blank">More Info</a></div>
      </div>
    );

    var top = this.props.data.name;

    var bottom = wholeNumber(this.props.data.min_diameter) + "-" + wholeNumber(this.props.data.max_diameter) + "m";

    return (
      <ExpandingCircle
        dimensions={{standardRadius: 60, expandedRadius: 100}}
        style={asteroidStyle}
        top = {top}
        bottom = {bottom}
        extraContent={moreInfo}
      />
    );
  }
});

module.exports = Asteroid;