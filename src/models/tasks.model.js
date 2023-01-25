/* eslint-disable no-console */

// tasks-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'tasks';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('title');
        table.integer('created_by_user_id')
          .unsigned()
          .references('id')
          .inTable('users')
          .index();
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
        table.dateTime('date_start');
        table.text('description', 'longText');
        table.integer('total_time_in_seconds');
        table.enum('status', ['completed','pending','in_progress']).defaultTo('pending')
        table.integer('priority');
        table.integer('project_id')
          .unsigned()
          .references('id')
          .inTable('projects')
          .index();
        table.dateTime('date_task_pending_date');
        table.dateTime('date_task_completed_date');
        table.dateTime('date_task_in_progress_date');
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
