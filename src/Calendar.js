var React = require('react');
var request = require('browser-request');
var moment = require('moment');
var Button = require('react-button');
var spring = require('react-motion').spring;
var Motion = require('react-motion').Motion;
var Modal = require('react-modal');
var DatePicker = require('react-datepicker');
var CalendarDay = require('./CalendarDay');
var Header = require('./Header');


var Calendar = React.createClass({
  getInitialState: function() {

    var start_date = moment().utc();
    var end_date = start_date.clone().add(6, "day");

    return {
      infoOpen: false,
      datePickOpen: false,
      dateError: false,
      start_date: start_date,
      end_date: end_date,
      data: []
    };
  },
  openInfo: function() {
    this.setState({infoOpen: true});
  },
  closeInfo: function() {
    this.setState({infoOpen: false});
  },
  openDatePicker: function() {
    this.setState({datePickOpen: true});
  },
  closeDatePicker: function() {
    this.setState({datePickOpen: false});
  },
  componentDidMount: function() {
    this.getEncountersData();
  },
  handleChangeStart: function(date) {
    this.setState({
      start_date: date,
      end_date: date.clone().add(7, "day")
    })
  },
  handleChangeEnd: function(date) {
    this.setState({
      end_date: date
    })
  },
  handleDateSubmit(e) {
    if (this.state.end_date.isAfter(this.state.start_date.clone().add(7, "day"))) {
      this.setState({
        dateError: "Dates can be no more than seven days apart."
      });
    } else if (this.state.start_date.isAfter(this.state.end_date)) {
      this.setState({
        dateError: "Invalid date range. Make sure the end comes after the start!"
      });
    } else {
      this.setState({
        datePickOpen: false,
        dateError: false,
        data: []
      }, this.getEncountersData);
    }
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
      entry.date = moment.utc(date);
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
        start_date: this.state.start_date.format("YYYY-MM-DD"),
        end_date: this.state.end_date.format("YYYY-MM-DD"),
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
      start_date: this.state.start_date.clone().add(7, "day"),
      end_date: this.state.end_date.clone().add(7, "day")
    }, this.getEncountersData);
  },
  render: function() {

    var that = this;

    var days = that.state.data.map(function(entry) {
      return (
        <CalendarDay style={{width: "100%"}} data={entry.encounters} date={entry.date} key={entry.date} />
      );
    });

    var bottomButtonTheme = {
      style: {
        width: "100%",
        border: "none",
        margin: 0,
        fontSize: "1.7em",
        letterSpacing: 6
      },
      overStyle: {
        color: "white",
        background: "inherit"
      }
    };

    var topButtonTheme = {
      style: {
        width: 200,
        border: "none",
        margin: 0,
        fontSize: "1.0em",
        letterSpacing: 6,
        outline: "none"
      },
      overStyle: {
        color: "white",
        background: "inherit"
      }
    };

    var submitButtonTheme = {
      style: {
        width: 200,
        border: "none",
        margin: 0,
        fontSize: "1.0em",
        outline: "none",
        color: "black"
      },
      overStyle: {
        color: "white",
        background: "inherit"
      }
    };

    var buttonBoxStyle = {
      width: window.innerWidth,
      height: 50,
      display: "block",
      float: "left",
      textAlign: "center"
    }

    var extraStyle = {
      width: "100%",
      minWidth: 2000,
      borderBottom: "1px solid #262626",
      display: "block",
      float: "left"
    };

    var getInfoStyles = function(y) {
      return {
        overlay : {
          position          : 'fixed',
          top               : 0,
          left              : 0,
          right             : 0,
          bottom            : 0,
          backgroundColor   : 'rgba(0, 0, 0, 0.5)'
        },
        content : {
          top                   : y.toString() + '%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          backgroundColor       : "#f2f2f2",
          border: "none",
          borderRadius: 0,
          textAlign: "center",
          color: "gray",
          width: 500
        }
      };
    };

    var info = function(val) {
      var customStyles = getInfoStyles(val.y);

      var imageStyle = {
        height: 300,
        width: 400,
        display: "inline-block"
      };

      var linkStyle = {
        color: "#000066",
        textDecoration: "none"
      };

      return (
        <Modal
          isOpen={that.state.infoOpen}
          onRequestClose={that.closeInfo}
          style={customStyles}>
          <h1 style={{color: "black", letterSpacing: 10}}>Armageddon Tracker</h1>
          <img src="images/bruce.jpg" style={imageStyle}/>
          <div style={{textAlign: "left"}}>
            <p>Armageddon Tracker logs upcoming closest-approaches with known asteroids. Displayed dates are UTC time, displayed dimensions are the maximum and minimum
              estimated diameter. Unnamed asteroids (the vast majority) are labeled with their <a style={linkStyle} href="http://www.minorplanetcenter.net/iau/info/HowNamed.html">provisional designation</a>.
            </p>
            <p>All data is from the NASA Near Earth Object Web Service (NeoWs). The front-end is built entirely in React by <a style={linkStyle} href="http://www.nmuldavin.com">Noah Muldavin</a>
              , you should give him a job.</p>
          </div>
        </Modal>);
    };

    var datePicker = function(val) {
      var customStyles = getInfoStyles(val.y);

      var errorStyle = {
        width: "100%",
        color: "red",
        display: "block"
      };

      return (
        <Modal
          isOpen={that.state.datePickOpen}
          onRequestClose={that.closeDatePicker}
          style={customStyles}>
          <h1 style={{color: "black", letterSpacing: 10}}>Custom Date Range</h1>
          <p> Search any days past, present, or future. Dates must be less than seven days apart.</p>
          <div style={{width: "100%"}}>
            <DatePicker
              selected={that.state.start_date}
              startDate={that.state.start_date}
              endDate={that.state.end_date}
              onChange={that.handleChangeStart}
              className='dateField'
            />
            <span>-</span>
            <DatePicker
              selected={that.state.end_date}
              startDate={that.state.start_date}
              endDate={that.state.end_date}
              onChange={that.handleChangeEnd}
              className='dateField'
            />
          </div>
          <div style={errorStyle}>{that.state.dateError}</div>
          <Button theme={submitButtonTheme} onClick={that.handleDateSubmit} >Submit</Button>
        </Modal>);
    };

    return (
      <div>
        <Header/>
        <div style={extraStyle}>
          <div style={buttonBoxStyle}>
            <Button theme={topButtonTheme} onClick={this.openInfo} >What is this?</Button>
            <Button theme={topButtonTheme} onClick={this.openDatePicker} >Custom Dates</Button>
          </div>
        </div>
        {days}
        <Button theme={bottomButtonTheme} onClick={this.loadmore} >{this.state.data.length === 0 ? "Loading ... ": "Load More"}</Button>
        <Motion defaultStyle={{y: 0}} style={{y: spring(this.state.infoOpen ? 50 : -50, {stiffness: 100})}}>
          {info}
        </Motion>
        <Motion defaultStyle={{y: 0}} style={{y: spring(this.state.datePickOpen ? 50 : -50, {stiffness: 100})}}>
          {datePicker}
        </Motion>
      </div>
    )
  }
});

module.exports = Calendar;