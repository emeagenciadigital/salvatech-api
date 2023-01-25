/* eslint-disable no-console */

// company onboarding meetings-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'company_onboarding_meetings';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.integer('company_onboarding_id')
          .unsigned()
          .references('id')
          .inTable('company_onboardings')
          .index();
        table.string('name');
        table.dateTime('date');
        table.text('link','longText');
        table.enum('status',['completed','scheduled','canceled']).defaultTo('scheduled');
        table.text('description', 'longText');
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
