const retrieveDuplicatedPeople = require('../usecases/retrieve-duplicated-people');

const getDuplicatedPeople = context => async (req, res) => {
  try {
    const result = await retrieveDuplicatedPeople(context);
    res.json(result);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getDuplicatedPeople;
