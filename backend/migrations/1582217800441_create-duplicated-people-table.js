/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('duplicated_people', {
    id: 'id',
    person_id: { type: 'integer', notNull: true, unique: true, references: 'people'},
    duplicates: { type: 'integer[]' },
  });
};

exports.down = pgm => pgm.dropTable('duplicated_people');
