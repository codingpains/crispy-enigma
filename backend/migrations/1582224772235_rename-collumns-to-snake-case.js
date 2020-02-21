/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.renameColumn('people', 'firstName', 'first_name');
  pgm.renameColumn('people', 'lastName', 'last_name');
  pgm.renameColumn('people', 'emailAddress', 'email_address');
  pgm.renameColumn('people', 'updateOn', 'update_on');
  pgm.renameColumn('people', 'createdAt', 'created_at');
};

exports.down = pgm => {
  pgm.renameColumn('people', 'first_name', 'firstName');
  pgm.renameColumn('people', 'last_name', 'lastName');
  pgm.renameColumn('people', 'email_address', 'emailAddress');
  pgm.renameColumn('people', 'update_on', 'updateOn');
  pgm.renameColumn('people', 'created_at', 'createdAt');
};
