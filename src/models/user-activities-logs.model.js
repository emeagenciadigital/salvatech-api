// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class UserActivitiesLogs extends Model {

  static get tableName() {
    return 'user_activities_logs';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text'],

      properties: {
        text: { type: 'string' }
      }
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

  db.schema.hasTable('user_activities_logs').then(exists => {
    if (!exists) {
      db.schema.createTable('user_activities_logs', table => {
        table.increments('id');
        table.string('text');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created user_activities_logs table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating user_activities_logs table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating user_activities_logs table', e)); // eslint-disable-line no-console

  return UserActivitiesLogs;
};
