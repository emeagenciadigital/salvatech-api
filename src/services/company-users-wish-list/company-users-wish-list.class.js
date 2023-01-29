const { Service } = require('feathers-objection');

exports.CompanyUsersWishList = class CompanyUsersWishList extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
