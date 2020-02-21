const camelobj = require('camelobj');

const retrieveDuplicatedPeople = async context => {
  let groups;
  const client = await context.pool.connect();
  try {
    const duplicated = await getDuplicatedFromDB(client);
    groups = await getDuplicatedGroups(duplicated, client);
  } finally {
    client.release();
  }

  return groups;
};

const getDuplicatedFromDB = async client => {
  const sql = 'SELECT person_id, duplicates from duplicated_people';
  const res = await client.query(sql);
  return res.rows.map(row => camelobj(row));
};

const getDuplicatedGroups = async (duplicated, client) => {
  const groups = [];
  const promises = duplicated.map(relation => getGroupFromDB(relation, client));
  return await Promise.all(promises);
};

const getGroupFromDB = async (relation, client) => {
  const conditions = [relation.personId, ...relation.duplicates]
    .map(id => `id = ${id}`).join(' OR ');
  const sql = `SELECT first_name, last_name, email_address FROM people WHERE ${conditions}`;
  const res = await client.query(sql);
  return res.rows;
}

module.exports = retrieveDuplicatedPeople;
