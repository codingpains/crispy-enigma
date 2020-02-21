/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.renameColumn('email_letters', 'frecuency', 'frequency');
};

exports.down = pgm => {
  pgm.renameColumn('email_letters', 'frequency', 'frecuency');
};
