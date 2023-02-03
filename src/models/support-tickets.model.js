// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class SupportTickets extends Model {
  static get tableName() {
    return 'support_tickets';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['company_id', 'user_id'],

      properties: {
        company_id: {type: 'integer'},
        user_id: {type: 'integer'},
        description: {type: 'string'},
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
    .hasTable('support_tickets')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('support_tickets', (table) => {
            table.increments('id');
            table
              .integer('company_id')
              .unsigned()
              .references('id')
              .inTable('companies')
              .index();
            table
              .integer('user_id')
              .unsigned()
              .references('id')
              .inTable('users')
              .index();
            table.text('description', 'longText');
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created support_tickets table')) // eslint-disable-line no-console
          .catch((e) =>
            console.error('Error creating support_tickets table', e),
          ); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error('Error creating support_tickets table', e)); // eslint-disable-line no-console

  return SupportTickets;
};
