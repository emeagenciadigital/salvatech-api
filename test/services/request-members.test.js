const assert = require('assert');
const app = require('../../src/app');

describe('\'request members\' service', () => {
  it('registered the service', () => {
    const service = app.service('request-members');

    assert.ok(service, 'Registered the service');
  });
});
