// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class CompanyUsersWishList extends Model {
  static get tableName() {
    return 'company_users_wish_list';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['company_id', 'user_id'],

      properties: {
        company_id: {type: 'integer'},
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
    .hasTable('company_users_wish_list')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('company_users_wish_list', (table) => {
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
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created company_users_wish_list table')) // eslint-disable-line no-console
          .catch((e) =>
            console.error('Error creating company_users_wish_list table', e),
          ); // eslint-disable-line no-console
      }
    })
    .catch((e) =>
      console.error('Error creating company_users_wish_list table', e),
    ); // eslint-disable-line no-console

  return CompanyUsersWishList;
};
