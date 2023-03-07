// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class RequestMembers extends Model {
  static get tableName() {
    return 'request_members';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['company_id', 'user_id'],

      properties: {
        company_id: {type: 'integer'},
        user_id: {type: 'integer'},
        description: {type: 'string'},
        role_name: {type: 'string'},
        years_of_experience: {type: 'integer'},
        skills: {type: 'text'},
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
    .hasTable('request_members')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('request_members', (table) => {
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
            table.string('role_name');
            table.integer('years_of_experience');
            table.text('skills', 'longText');
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created request_members table')) // eslint-disable-line no-console
          .catch((e) =>
            console.error('Error creating request_members table', e),
          ); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error('Error creating request_members table', e)); // eslint-disable-line no-console

  return RequestMembers;
};
