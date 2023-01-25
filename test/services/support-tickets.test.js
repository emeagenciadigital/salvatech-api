const assert = require('assert');
const app = require('../../src/app');

describe('\'support tickets\' service', () => {
  it('registered the service', () => {
    const service = app.service('support-tickets');

    assert.ok(service, 'Registered the service');
  });
});
