const assert = require('assert');
const app = require('../../src/app');

describe('\'user education\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-education');

    assert.ok(service, 'Registered the service');
  });
});
