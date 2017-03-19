const request = require('request');
const querystring = require('querystring');
const JSONStream = require('jsonstream');
const camelize = require('camelize');
const secrets = require('../../../secrets.json');
const { map } = require('../../streamUtils/streamUtils');

const nasaNeoApiBase = 'https://api.nasa.gov/neo/rest/v1/feed';

/**
 * Threads a value through any number of operations,
 * sending the next operation the result of the previous.
 * TODO: move to shared function utils directory
 * @param  {*} val Starting value
 * @param  {...Function} operations Operations to apply, in order
 * @return {*} Value returned by the final operation
 */
const thread = (val, ...operations) => operations.reduce(
  (prevVal, operation) => operation(prevVal),
  val
);

/**
 * Maps start and end dates to querystring required by NASA api
 * @param  {Object} query Query object from url
 * @param  {String} [query.start] Start date as 'YYYY-MM-DD'
 * @param  {String} [query.end]   End date as 'YYYY-MM-DD'
 * @return {String} querystring
 */
const buildQueryString = ({ start, end }) => querystring.stringify({
  start_date: start,
  end_date: end,
  api_key: secrets.nasaApiKey,
});

/**
 * Builds full url from query string
 * @param  {String} queryString QueryString
 * @return {String} full url
 */
const buildUrl = queryString => `${nasaNeoApiBase}?${queryString}`;

/**
 * Makes an api request then pipes the result through transforms (more to come)
 * @param  {Object} query Query object from url
 * @param  {String} [query.start] Start date as 'YYYY-MM-DD'
 * @param  {String} [query.end]   End date as 'YYYY-MM-DD'
 * @return {ReadableStream} readable stream of data
 * TODO: error handling, actually do something
 */
const getCalendar = query => thread(query, buildQueryString, buildUrl, request)
  .pipe(JSONStream.parse())
  .pipe(map(camelize))
  .pipe(map(JSON.stringify));

module.exports = getCalendar;
