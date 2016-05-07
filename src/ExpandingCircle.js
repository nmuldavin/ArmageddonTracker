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
  setStyle: function(radius) {
    var defaults = {
      position: "relative",
      top: "50%",
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

      var style = that.setStyle(val.r);

      return (
        <div
          style={style}
          onMouseOver={that.expand}
          onMouseOut={that.contract}
        >
          <div>
            {that.props.children}
            <div style={{opacity: val.o}}>
              {that.props.extraContent}
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