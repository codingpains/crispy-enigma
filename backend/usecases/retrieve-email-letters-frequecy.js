const retrieveEmailLettersFrequency = async context => {
  let res;
  const client = await context.pool.connect();
  const sql = 'SELECT letter, frequency FROM email_letters ORDER BY frequency DESC';
  try {
    res = await client.query(sql);
  } finally {
    client.release();
  }
  return res.rows;
};

module.exports = retrieveEmailLettersFrequency;
