// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class Skills extends Model {
  static get tableName() {
    return 'skills';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        name: {type: 'string'},
      },
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  const db = app.get('knex');

  db.schema
    .hasTable('skills')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('skills', (table) => {
            table.increments('id');
            table.string('name');
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created skills table')) // eslint-disable-line no-console
          .catch((e) => console.error('Error creating skills table', e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error('Error creating skills table', e)); // eslint-disable-line no-console

  return Skills;
};
