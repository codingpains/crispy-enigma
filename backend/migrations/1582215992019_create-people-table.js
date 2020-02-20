/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('people', {
    id: 'id',
    firstName: { type: 'varchar(100)', notNull: true },
    lastName: { type: 'varchar(100)' },
    emailAddress: { type: 'varchar(500)', notNull: true },
    updateOn: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = pgm => pgm.dropTable('people');
