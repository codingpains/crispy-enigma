const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const getPeople = require('./endpoints/get-people');

dotenv.config();

const context = {
  env: process.env,
};

app.use(cors());

app.get('/people', (req, res) => getPeople(req, res));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
