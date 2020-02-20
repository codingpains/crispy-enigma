/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('email_letters', {
    id: 'id',
    letter: { type: 'character(1)', notNull: true, unique: true},
    frecuency: { type: 'smallint', notNull: true },
  });
};

exports.down = pgm => pgm.dropTable('email_letters');
