const express = require('express'); // Loading module
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

let app = express(); // Calling express

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json()); //Converting everything to JSON
app.use(expressValidator());


consign().include('routes').include('utils').into(app); // Using my utils into app

app.listen(3000, '127.0.0.1', () => { // Server listening

    // Callback function will run the console.log
    console.log('Server running!');

})