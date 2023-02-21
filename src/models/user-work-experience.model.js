// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class UserWorkExperience extends Model {
  static get tableName() {
    return 'user_work_experience';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id'],

      properties: {
        user_id: {type: 'integer'},
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
    .hasTable('user_work_experience')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('user_work_experience', (table) => {
            table.increments('id');
            table
              .integer('user_id')
              .unsigned()
              .references('id')
              .inTable('users')
              .index();
            table.string('company_name').notNullable();
            table.dateTime('date_start').notNullable();
            table.dateTime('date_end').nullable();
            table.string('role_name').notNullable();
            table.text('role_description', 'longText');
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created user_work_experience table')) // eslint-disable-line no-console
          .catch((e) =>
            console.error('Error creating user_work_experience table', e),
          ); // eslint-disable-line no-console
      }
    })
    .catch((e) =>
      console.error('Error creating user_work_experience table', e),
    ); // eslint-disable-line no-console

  return UserWorkExperience;
};
