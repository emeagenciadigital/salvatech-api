const { Service } = require('feathers-knex');

exports.Skills = class Skills extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'skills'
    });
  }
};
