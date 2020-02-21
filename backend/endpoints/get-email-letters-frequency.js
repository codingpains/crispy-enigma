const retrieveEmailLettersFrequency = require('../usecases/retrieve-email-letters-frequecy');

const getEmailLettersFrequency = context => async (req, res) => {
  try {
    const result = await retrieveEmailLettersFrequency(context);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getEmailLettersFrequency;
