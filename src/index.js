var ReactDOM = require('react-dom');
var React = require('react');
var ExpandingCircle = require('./ExpandingCircle');

var style = {
  backgroundColor: "black",
  height: 200
};

var circleStyle = {
  backgroundColor: "gray",
}
ReactDOM.render(
  <div>
    <div style={style}>
      <ExpandingCircle
        dimensions={{standardRadius: 50, expandedRadius: 100}}
        style={circleStyle}
        extraContent={<div>BUTTS</div>}
      >
          <p style={{margin: 20}}>Sheeeit</p>
      </ExpandingCircle>
    </div>
  </div>
  ,
  document.getElementById('mount-point')
);