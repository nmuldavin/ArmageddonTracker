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
      position: "relative",
      top: "50%",
      padding: 0,
      transform: "translateY(-50%)",
      float: "left",
      display: "inlineBlock",
      textAlign: "center",
      width: radius*2,
      height: radius*2,
      borderRadius: radius
    };
    return Object.assign(defaults, this.props.style);
  },
  setMiddleStyle: function(opacity) {
    return {
      opacity: opacity,
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      left: 0,
      right: 0,
      margin: "0 auto"
    }
  },
  defaultContentStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    margin: "0 auto",
    transform: "translateY (-50%)"
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

      var topStyle = {
        position: "absolute",
        top: that.props.dimensions.standardRadius/2,
        left: 0,
        right: 0,
        margin: "0 auto",
        transform: "translateY (-50%)"
      };

      var bottomStyle = {
        position: "absolute",
        bottom: that.props.dimensions.standardRadius/2,
        left: 0,
        right: 0,
        margin: "0 auto",
        transform: "translateY (-50%)"
      };
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