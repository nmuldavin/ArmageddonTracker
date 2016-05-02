var React = require('react');
var request = require('browser-request');
var dateFormat = require('dateformat');

var AsteroidBox = React.createClass({
  getInitialState: function() {

    var start_date = new Date();
    var end_date = new Date();
    end_date.setDate(start_date.getDate() + 7);

    return {
      start_date: start_date,
      end_date: end_date,
      data: {}
    }
  },
  componentDidMount: function() {
    this.getEncountersData();
  },
  // constructs cleaner/smaller representation of asteroid data
  saveImportantEncounterData: function(APIEncounterData) {
    return {
      name: APIEncounterData.name,
      id: APIEncounterData.neo_reference_id,
      jpl_url: APIEncounterData.nasa_jpl_url,
      date: Date.parse(APIEncounterData.close_approach_data[0].close_approach_date),
      min_diameter: APIEncounterData.estimated_diameter.meters.estimated_diameter_min, // in meters
      max_diameter: APIEncounterData.estimated_diameter.meters.estimated_diameter_max, // in meters
      miss_distance: APIEncounterData.close_approach_data[0].miss_distance.kilometers, // in kilometers
      relative_velocity: APIEncounterData.close_approach_data[0].relative_velocity.kilometers_per_hour, // km/h
      should_we_call_bruce: APIEncounterData.is_potentially_hazardous_asteroid
    };
  },
  // builds cleaner total dataset
  saveImportantData: function(APIData) {
    var data = {};
    for (date in APIData.near_earth_objects) {

      data[date] = [];

      for (var i = 0; i < APIData.near_earth_objects[date].length; i++) {

        data[date].push(
          this.saveImportantEncounterData(APIData.near_earth_objects[date][i])
        );
      }
    }
    return data;
  },
  //makes API request
  getEncountersData: function() {

    var options = {
      url: "https://api.nasa.gov/neo/rest/v1/feed",
      method: "GET",
      qs: {
        start_date: dateFormat(this.state.start_date, "isoDate", true),
        end_date: dateFormat(this.state.end_date, "isoDate", true),
        api_key: "aIBslm3N2EBbDjD9dD6lBxNwJVtDAhrb2NaR2ARW"
      }
    };

    var that = this;
    var callback = function(error, response, body) {
      if (!error && response.statusCode == 200) {
        that.setState({
          data: that.saveImportantData(JSON.parse(body))
        });
      }
    };

    request(options, callback);

  },
  render: function() {
    return <p>{JSON.stringify(this.state.data)}</p>
  }
});

module.exports = AsteroidBox;