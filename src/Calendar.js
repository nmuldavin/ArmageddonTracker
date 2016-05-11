var React = require('react');
var request = require('browser-request');
var dateFormat = require('dateformat');
var isodate = require('isodate');
var Button = require('react-button');
var dateMath = require('date-arithmetic');
var CalendarDay = require('./CalendarDay');
var Header = require('./Header2');


var Calendar = React.createClass({
  getInitialState: function() {

    var start_date = new Date();
    var end_date = dateMath.add(start_date, 6, "day");

    return {
      start_date: start_date,
      end_date: end_date,
      data: []
    }
  },
  componentDidMount: function() {
    this.getEncountersData();
  },
  // constructs cleaner/smaller representation of asteroid data
  saveImportantEncounterData: function(APIEncounterData) {

    var parseAsteroidName = function(apiName) {
      var givenNameRegExp = /([a-z]*) \(/i;
      var idRegExp = /\((.*?)\)/;
      var result = givenNameRegExp.exec(apiName);

      if (result && result[1]) {
        return result[1];
      } else {
        return idRegExp.exec(apiName)[1];
      }
    };

    return {
      name: parseAsteroidName(APIEncounterData.name),
      jpl_url: APIEncounterData.nasa_jpl_url,
      id: parseInt(APIEncounterData.neo_reference_id, 10),
      min_diameter: APIEncounterData.estimated_diameter.meters.estimated_diameter_min, // in meters
      max_diameter: APIEncounterData.estimated_diameter.meters.estimated_diameter_max, // in meters
      miss_distance: parseFloat(APIEncounterData.close_approach_data[0].miss_distance.kilometers), // in kilometers
      relative_velocity: parseFloat(APIEncounterData.close_approach_data[0].relative_velocity.kilometers_per_hour), // km/h
      should_we_call_bruce: APIEncounterData.is_potentially_hazardous_asteroid
    };
  },
  // builds cleaner total dataset
  saveImportantData: function(APIData) {
    var data = [];

    for (var date in APIData.near_earth_objects) {
      var entry = {};
      entry.date = isodate(date);
      entry.encounters = [];

      for (var i = 0; i < APIData.near_earth_objects[date].length; i++) {
        entry.encounters.push(
          this.saveImportantEncounterData(APIData.near_earth_objects[date][i])
        );
      }
      data.push(entry);
    }

    data.sort(function (a, b) {
      if (a.date > b.date) {
        return 1;
      }
      if (a.date < b.date) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

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
          data: that.state.data.concat(that.saveImportantData(JSON.parse(body)))
        });
      }
    };

    request(options, callback);

  },
  loadmore: function(e) {
    this.setState({
      start_date: dateMath.add(this.state.start_date, 7, "day"),
      end_date: dateMath.add(this.state.end_date, 7, "day")
    }, this.getEncountersData);
  },
  render: function() {

    var that = this;

    var days = that.state.data.map(function(entry) {
      return (
        <CalendarDay style={{width: "100%"}} data={entry.encounters} date={entry.date} key={entry.date} />
      );
    });

    var buttonTheme = {
      style: {
        width: "100%",
        border: "none",
        margin: 0,
        fontSize: "1.7em",
        letterSpacing: 6
      },
      overStyle: {
        background: "gray"
      }
    };

    return (
      <div>
        <Header/>
        {days}
        <Button theme={buttonTheme} onClick={this.loadmore} >Load More</Button>
      </div>
    )
  }
});

module.exports = Calendar;