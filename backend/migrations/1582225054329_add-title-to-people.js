/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumns('people', {
    title: { type: 'varchar(500)' },
  });
};

exports.down = pgm => {
  pgm.dropColumns('people', ['title'])
};
