// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class Companies extends Model {
  static get tableName() {
    return 'companies';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'status'],

      properties: {
        name: {type: 'string'},
        status: {
          type: 'string',
          enum: ['active', 'inactive'],
          default: 'active',
        },
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
    .hasTable('companies')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('companies', (table) => {
            table.increments('id');
            table.string('name');
            table.enum('status', ['active', 'inactive']).defaultTo('active');
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created companies table')) // eslint-disable-line no-console
          .catch((e) => console.error('Error creating companies table', e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error('Error creating companies table', e)); // eslint-disable-line no-console

  return Companies;
};
