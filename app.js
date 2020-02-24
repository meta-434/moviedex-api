require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const helmet = require('helmet');
const MOVIES = require('./movies-data');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

console.log(process.env.API_TOKEN);

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    next()
});

app.get('/movie', (req, res) => {
    if(MOVIES) {
        res
            .status(200)
            .send('anyone want some movies?');
    }
    res
        .status(400)
        .send('something went wrong...');
});

module.exports = app;