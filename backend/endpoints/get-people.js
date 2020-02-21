const SalesLoft = require('../gateways/salesloft-api')

const getPeople = context => (req, res) => {
  const { per_page, page } = req.query;

  SalesLoft.get('/people', {params: { per_page, page }})
    .then(({data}) => res.json(data))
    .catch(err => {
      res.status(500);
    });
};

module.exports = getPeople;
