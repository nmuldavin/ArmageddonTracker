# Armageddon Tracker

A webapp visualizing data from Nasa's [Near Earth Object](https://cneos.jpl.nasa.gov/) database. The live version of the app can be found [here](http://www.armageddontracker.com).

This is the 2.0 branch, including a complete refactor to use up-to-date practices, and more interactive visualizations. 

## Use

To download and run locally, run

```
git clone https://github.com/nmuldavin/ArmageddonTracker.git
git checkout 2.0
npm install
```

To get data from the nasa NEO API you will need to get an API key [here](https://api.nasa.gov/index.html#apply-for-an-api-key), then create ``.secrets.json`` with the following content:

```
{
    "nasaApiKey": <APIKey>
}
```

Once configured, you can start the application with

```
	npm start
```

## Application Architecture

Build and other configuration options are found in `/config`. Scripts managing build and deploy processes are kept in `/dev`, and all source code is kept in `/src`. This in turn is split between client, sever, and shared code.

### Frontend

The frontend uses [React](https://facebook.github.io/react/) stateless components with [Redux](http://redux.js.org/) to manage state. Async actions and managment of user inputs are handled with [most.js](https://github.com/cujojs/most) streams using [redux-most](https://github.com/joshburgess/redux-most) middleware (this is the same thing as [redux-observable](https://redux-observable.js.org/) but for most.js rather than rxjs). The application is routed using [react-router v4](https://reacttraining.com/react-router/). 

Redux reducers and redux-most 'epics' are kept under `/src/client/store`. Reusable React components are kept under `/src/client/components` and higher-order components and routes under `/src/client/routes`. 

Styling is done with [scss](http://sass-lang.com/) and css-modules. Local styles for each component are kept in individiual components directories, with reusable mixins and variables in `src/client/scss`. 

Testing is set up to run in phantomJS using karma, configured with [mocha](https://mochajs.org/), [chai](http://chaijs.com/), and [enzyme](https://github.com/airbnb/enzyme). To test run

```
	npm run test:client
```

or 

```
	npm run test:client:dev
```

to start a watch. 

All tests in `*.spec.js` in `src/client` or `src/shared` will automatically run.

### Backend

The backend is super simple Node that serves up content and proxies nasa API. Eventually there will be some kind of light DB or at least cache for data from the API. Uses [express]() and leverages [node streams](https://github.com/substack/stream-handbook) as much as possible. 

Tests are set up to run with mocha. To test run

```
	npm run test:server
```

or

```
	npm run test:server:dev
```

to start a watch.

## Other Scripts

* `npm run test` Runs both client and server tests. Generates coverage report in `/coverage`
* `npm run compile` Builds full app bundles.
* `npm run lint` Lints the whole project
* `npm run deploy:dev` Lints, tests, and upon success builds full app bundles in development mode (enabling redux-devtool among other things).
* `npm run deploy:prod` Same as above but for production
* `npm run start:prod` Starts the server in production mode. Will simply serve pre-built bundles, no hot reloading.
