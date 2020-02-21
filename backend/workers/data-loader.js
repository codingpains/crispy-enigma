require('dotenv').config();
const snakeobj = require('snakeobj');
const first = require('lodash/first');
const get = require('lodash/get');
const pick = require('lodash/pick');
const { Client } = require('pg');
const SalesLoft = require('../gateways/salesloft-api');

const NEXT_UPDATE_DELTA = 86400000; // 24h

const DataLoader = async () => {
  const client = new Client();

  const run = async () => {
    await client.connect();
    if (!shouldStart()) return;
    return start();
  };

  const shouldStart = async () => {
    res = await client.query('SELECT count(*) from people');
    return first(res.rows.count) < 0;
  }

  const start = async () => {
    let page = 1;

    while (page ) {
      try {
        const params = { per_page: 3, page };
        const res = await SalesLoft.get('/people', { params });
        const people = await storePeople(get(res, 'data.data', []));
        await storeEmailLetters(countEmailLetters(people));
        page = get(res, 'data.metadata.paging.nextPage');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const storePeople = async (people) => {
    const fields = ['firstName', 'lastName', 'emailAddress', 'title'];
    const trimmed = people.map(p => ({ externalId: p.id, ...pick(p, fields) }));
    trimmed.forEach(async person => {
      const sql = insertPersonSQL(snakeobj(person));
      try {
        await client.query(sql);
      } catch (err) {
        console.log('Error inserting', err);
      }
    });
    return trimmed;
  }

  const insertPersonSQL = (person) => {
    const fields = Object.keys(person);
    const values = fields.map(f => typeof person[f] === 'string' ? `'${escp(person[f])}'` : person[f]);
    const updateOn = new Date(Date.now() + NEXT_UPDATE_DELTA).toISOString();
    return `INSERT INTO people (${[...fields, 'update_on']}) VALUES (${values},'${updateOn}')`;
  };

  const escp = (str) => str.replace(/'/g, "''");

  const storeEmailLetters = async (letters) => {
    const iterator = letters.keys();
    let char = iterator.next().value;
    while (char) {
      const count = letters.get(char);
      const sql = upsertLetterSQL(char, count);
      await client.query(sql);
      char = iterator.next().value;
    }
  };

  const upsertLetterSQL = (char, count) => {
    const insert = `INSERT INTO email_letters (letter, frecuency) VALUES ('${char}', ${count})`;
    const conflict = `ON CONFLICT (letter) DO`;
    const update = `UPDATE SET frecuency = email_letters.frecuency + ${count}
      WHERE email_letters.letter = '${char}'`;
    return `${insert} ${conflict} ${update}`;
  };

  const countEmailLetters = (people) => {
    const letters = new Map();
    people.forEach(({ emailAddress }) => {
      for (let i = 0; i < emailAddress.length; i++) {
        const char = emailAddress.charAt(i);
        letters.set(char, (letters.get(char) || 0) + 1);
      }
    });
    return letters;
  };

  await run();
  process.exit(0);
};

DataLoader();
