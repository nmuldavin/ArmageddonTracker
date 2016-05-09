var ReactDOM = require('react-dom');
var React = require('react');
var Asteroid = require('./Asteroid');
var Calendar = require('./Calendar');

var style = {
  backgroundColor: "black",
  height: 200
};

var data = {
  name: "2001 BE10",
  id: 3752566,
  jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3752566",
  min_diameter: 14.4728805126,
  max_diameter: 32.3623446563,
  miss_distance: 10153566,
  relative_velocity: 14545.5049068883,
  should_we_call_bruce: false
};

ReactDOM.render(
  <Calendar />
  ,
  document.getElementById('mount-point')
);