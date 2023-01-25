/* eslint-disable no-console */

// task time tracking-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'task_time_tracking';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.integer('task_id')
          .unsigned()
          .references('id')
          .inTable('tasks')
          .index();
        table.integer('project_id')
          .unsigned()
          .references('id')
          .inTable('projects')
          .index();
        table.integer('user_id')
          .unsigned()
          .references('id')
          .inTable('users')
          .index();
        table.integer('seconds');
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
