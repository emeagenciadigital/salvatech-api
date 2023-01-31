// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class UsersSkills extends Model {
  static get tableName() {
    return 'users_skills';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'skill_id'],

      properties: {
        user_id: {type: 'integer'},
        skill_id: {type: 'integer'},
        skill_name: {type: 'string'},
        level: {type: 'integer'},
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
    .hasTable('users_skills')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('users_skills', (table) => {
            table.increments('id');
            table
              .integer('user_id')
              .unsigned()
              .references('id')
              .inTable('users')
              .index();
            table
              .integer('skill_id')
              .unsigned()
              .references('id')
              .inTable('skills')
              .index();
            table.string('skill_name');
            table.integer('level');
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created users_skills table')) // eslint-disable-line no-console
          .catch((e) => console.error('Error creating users_skills table', e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error('Error creating users_skills table', e)); // eslint-disable-line no-console

  return UsersSkills;
};
