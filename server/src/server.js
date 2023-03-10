/**
* Module dependencies.
*/
const express = require("express")
    , bodyParser = require('body-parser')
    , request = require('request')
    , cors = require('cors');

const app = express();

const mongoose = require('mongoose');

/**
* Connection DB.
*/
require('./models/dbConfig');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false); // Allow elements of DB to be modified
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json()); // Add JSON parser to the app

/**
* Set global var
*/
global.request = request;

/**
* Set all environments
*/
app.set('port', process.env.REACT_APP_SERVER_PORT || 8080);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ credentials: true }));

/**
* Set routes
*/

const routeIndex = require('./routes/routeIndex');
const routeTeams = require('./routes/routeTeams');

// Index
app.use('/', routeIndex);

// Task
app.use('/api/teams', routeTeams);

//Error 404
app.get('*', function (req, res) {
    res.status(404).send('Error 404 : Not found');
});
app.post('*', function (req, res) {
    res.status(404).send('Error 404 : Not found');
});

/**
* Run
*/
app.listen(process.env.REACT_APP_SERVER_PORT || 8080, (err) => {
    if (err) {
        console.error('Error starting  server', err);
    } else {
        console.log('Server listening at port ' + process.env.REACT_APP_SERVER_PORT || 8080);
    }
});

