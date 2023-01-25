const assert = require('assert');
const app = require('../../src/app');

describe('\'company users wish list\' service', () => {
  it('registered the service', () => {
    const service = app.service('company-users-wish-list');

    assert.ok(service, 'Registered the service');
  });
});
