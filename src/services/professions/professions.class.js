const { Service } = require('feathers-knex');

exports.Professions = class Professions extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'professions'
    });
  }
};
