const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const pool = new Pool();
const app = express();
const port = 3000;
const getPeople = require('./endpoints/get-people');
const getEmailLettersFrequency = require('./endpoints/get-email-letters-frequency');
const getDuplicatedPeople = require('./endpoints/get-duplicated-people');

dotenv.config();

const context = { pool };

app.use(cors());

app.get('/people', getPeople(context));
app.get('/people/email-letters-frequency', getEmailLettersFrequency(context));
app.get('/people/duplicated', getDuplicatedPeople(context));

app.listen(port, () => console.log(`Crispy Backend up and running on port ${port}!`));
