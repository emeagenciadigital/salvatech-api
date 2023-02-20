const assert = require('assert');
const app = require('../../src/app');

describe('\'user activities logs\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-activities-logs');

    assert.ok(service, 'Registered the service');
  });
});
