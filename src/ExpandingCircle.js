var React = require('react');
var spring = require('react-motion').spring;
var Motion = require('react-motion').Motion;

var ExpandingCircle = React.createClass({
  getInitialState: function() {
    return {
      expanded: false
    };
  },
  expand: function(e) {
    this.setState({expanded: true});
  },
  contract: function(e) {
    this.setState({expanded: false});
  },
  setCircleStyle: function(radius) {
    var defaults = {
      padding: 0,
      textAlign: "center",
      overflow: "hidden",
      width: radius*2,
      height: radius*2,
      borderRadius: radius
    };
    return Object.assign(defaults, this.props.style);
  },
  defaultContentStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    transform: "translateY (-50%)",
    margin: "0 auto"
  },
  setMiddleStyle: function(opacity) {
    var extras = {
      top: "50%",
      transform: "translateY(-50%)",
      opacity: opacity,
      width: this.props.dimensions.standardRadius*2
    };
    return Object.assign({}, this.defaultContentStyle, extras);
  },
  topStyle: function() {
    var extras = {
      top: this.props.dimensions.standardRadius/2
    };
    return Object.assign({}, this.defaultContentStyle, extras);
  },
  bottomStyle: function() {
    var extras = {
      bottom: this.props.dimensions.standardRadius/2
    };
    return Object.assign({}, this.defaultContentStyle, extras);
  },
  render: function() {
    var targetRadius = this.state.expanded ?
      this.props.dimensions.expandedRadius:
      this.props.dimensions.standardRadius;

    var targets = {
      r: spring(targetRadius),
      o: spring(this.state.expanded ? 1 : 0)
    };
    var initial = {
      r: this.props.dimensions.standardRadius,
      o: 0
    };

    var that = this;

    var circle = function(val) {

      var circleStyle = that.setCircleStyle(val.r);
      var middleStyle = that.setMiddleStyle(val.o);

      return (
        <div
          style={circleStyle}
          onMouseOver={that.expand}
          onMouseOut={that.contract}
        >
          <div>
            <div style={that.topStyle()}>
              {that.props.top}
            </div>
            <div style={middleStyle}>
              {that.props.extraContent}
            </div>
            <div style={that.bottomStyle()}>
              {that.props.bottom}
            </div>
          </div>
        </div>
      );
    };

    return (
      <Motion defaultStyle={initial} style={targets}>
        {circle}
      </Motion>
    )
  }
});

module.exports = ExpandingCircle;