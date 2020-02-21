require('dotenv').config();
const last = require('lodash/last');
const { Client } = require('pg');

const EMAIL_MATCHER = /^([a-zA-Z0-9_\-\.]+)@[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,5}$/;

const DuplicationFinder = async () => {
  const client = new Client();

  const run = async () => {
    await client.connect();
    const emailIdPairs = await getAllEmails();
    const duplicated = findAllDuplicates(emailIdPairs);
    await storeDuplicated(duplicated);
  };

  const getAllEmails = async () => {
    const sql = 'SELECT id, email_address from people';
    let res;
    try {
       res = await client.query(sql);
    } catch (err) {
      console.log('Error on select', err);
    }
    return res.rows;
  };

  const findAllDuplicates = (emailIdPairs) => {
    const duplicated = {};
    emailIdPairs.forEach(({id, email_address: email}, start) => {
      for (let i = start + 1; i < emailIdPairs.length; i++) {
        const emailB = emailIdPairs[i].email_address;
        if (levenshteinDistance(getAccount(email), getAccount(emailB)) <= 1) {
          if (!duplicated[id]) {
            duplicated[id] = [emailIdPairs[i].id];
          } else {
            duplicated[id].push(emailIdPairs[i].id)
          }
        }
      }
    });
    return duplicated;
  };

  const storeDuplicated = async (duplicated) => {
    const values = Object.keys(duplicated).map(id => `(${id}, '{${duplicated[id]}}')`);
    const sql = `INSERT INTO duplicated_people (person_id, duplicates) VALUES ${values}`;
    try {
      console.log(sql);
      await client.query(sql);
    } catch (err) {
      console.log('Error inserting', err);
    }
  };

  await run();
  process.exit(0);
};

const getAccount = (email) => email.match(EMAIL_MATCHER)[1];

const levenshteinDistance = (wordA, wordB) => {
  const distance = Array(wordB.length + 1).fill(null).map(() => Array(wordA.length + 1).fill(null));

  for (let i = 0; i <= wordA.length; i += 1) {
    distance[0][i] = i;
  }

  for (let j = 0; j <= wordB.length; j += 1) {
    distance[j][0] = j;
  }

  for (let j = 1; j <= wordB.length; j += 1) {
    for (let i = 1; i <= wordA.length; i += 1) {
      const cost = wordA.charAt(i - 1) === wordB.charAt(j - 1) ? 0 : 1;
      const ins = distance[j][i - 1] + 1;
      const del = distance[j - 1][i] + 1;
      const subs = distance[j - 1][i - 1] + cost;
      distance[j][i] = Math.min(ins, del, subs);
    }
  }

  return distance[wordB.length][wordA.length];
}

DuplicationFinder();
