var React = require('react');

var Asteroid = React.createClass({
  render: function() {
    console.log(this.props.data);
    return (
      <div className="Asteroid">
        <h4>{this.props.data.name}</h4>
        <p>ID: {this.props.data.id}</p>
        <p>Estimated Diameter: {this.props.data.min_diameter.toFixed(0)} - {this.props.data.max_diameter.toFixed(0)} m</p>
        <p>Miss Distance: {this.props.data.miss_distance} km</p>
        <p>Relative Velocity: {this.props.data.relative_velocity} km/h</p>
        <a href={this.props.data.jpl_url}>More Info</a>
      </div>
    )
  }
});

module.exports = Asteroid;