const SalesLoft = require('../gateways/salesloft-api')

const getPeople = (req, res) => {
  const { perPage, page } = req.params;

  SalesLoft.get('/people', {params: { perPage, page }})
    .then(({data}) => res.json(data))
    .catch(err => {
      res.status(500);
    });
};

module.exports = getPeople;
