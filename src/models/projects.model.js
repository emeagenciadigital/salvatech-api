// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class Projects extends Model {
  static get tableName() {
    return 'projects';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'created_by_user_id', 'company_id'],

      properties: {
        title: {type: 'string'},
        created_by_user_id: {type: 'integer'},
        company_id: {type: 'integer'},
        status: {type: 'string', enum: ['active', 'inactive']},
        description: {type: ['string', 'null']},
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
    .hasTable('projects')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('projects', (table) => {
            table.increments('id');
            table.string('title');
            table
              .integer('created_by_user_id')
              .unsigned()
              .references('id')
              .inTable('users')
              .index();
            table
              .integer('company_id')
              .unsigned()
              .references('id')
              .inTable('companies')
              .index();
            table.enum('status', ['active', 'inactive']).defaultTo('inactive');
            table.text('description', 'longtext');
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created projects table')) // eslint-disable-line no-console
          .catch((e) => console.error('Error creating projects table', e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error('Error creating projects table', e)); // eslint-disable-line no-console

  return Projects;
};
