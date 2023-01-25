/* eslint-disable no-console */

// stand up-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'stand_up';
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
        table.text('today','longText');
        table.text('tomorrow', 'longText');
        table.text('impediments','longText');
        table.dateTime('date');
        table.integer('task_quantity');
        table.string('meta_user_first_name');
        table.string('meta_user_last_name');
        table.string('meta_user_path_avatar');
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
