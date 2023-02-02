// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class StandUp extends Model {
  static get tableName() {
    return 'stand_up';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['company_id', 'company_id'],

      properties: {
        company_id: {type: 'integer'},
        user_id: {type: 'integer'},
        today: {type: ['string', 'null']},
        tomorrow: {type: ['string', 'null']},
        impediments: {type: ['string', 'null']},
        task_quantity: {type: 'integer'},
        meta_user_first_name: {type: ['string', 'null']},
        meta_user_last_name: {type: ['string', 'null']},
        meta_user_path_avatar: {type: ['string', 'null']},
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
  const db = app.get('knexClient');
  const tableName = 'stand_up';
  db.schema
    .hasTable(tableName)
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable(tableName, (table) => {
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
            table.text('today', 'longText');
            table.text('tomorrow', 'longText');
            table.text('impediments', 'longText');
            table.dateTime('date');
            table.integer('task_quantity');
            table.string('meta_user_first_name');
            table.string('meta_user_last_name');
            table.string('meta_user_path_avatar');
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created stand_up table')) // eslint-disable-line no-console
          .catch((e) => console.error('Error creating stand_up table', e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error('Error creating stand_up table', e)); // eslint-disable-line no-console

  return StandUp;
};
