/* eslint-disable no-console */

// company onboardings-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'company_onboardings';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.integer('company_id')
          .unsigned()
          .references('id')
          .inTable('companies')
          .index();
        table.dateTime('date_start');
        table.dateTime('date_end');
        table.enum('status',['completed','in_progress','in_review','canceled','rejected']).nullable()
        table.text('rejected_reason');
        table.integer('current_step');
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
