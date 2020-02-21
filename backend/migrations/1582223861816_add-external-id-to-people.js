/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumns('people', {
    external_id: { type: 'integer', notNull: true },
  });
};

exports.down = pgm => {
  pgm.dropColumns('people', ['external_id'])
};
