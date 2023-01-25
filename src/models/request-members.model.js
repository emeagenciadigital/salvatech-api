/* eslint-disable no-console */

// request members-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'request_members';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.integer('company_id')
          .unsigned()
          .references('id')
          .inTable('companies')
          .index();
        table.integer('user_id')
          .unsigned()
          .references('id')
          .inTable('users')
          .index();
        table.text('description', 'longText');
        table.string('role_name');
        table.integer('years_of_experience');
        table.timestamp("deletedAt").nullable();
        table.timestamp("createdAt");
        table.timestamp("updatedAt");
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });
  

  return db;
};
