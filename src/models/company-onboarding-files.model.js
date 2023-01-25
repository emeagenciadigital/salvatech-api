/* eslint-disable no-console */

// company onboarding files-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'company_onboarding_files';
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
        table.text('download_path','longText');
        table.text('uploaded_path','longText');
        table.enum('status',['waiting','in_review','accepted','rejected']).defaultTo("waiting");
        table.string('rejected_reason');
        table.enum('requires_upload',['true','false']);
        table.text('description');
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
