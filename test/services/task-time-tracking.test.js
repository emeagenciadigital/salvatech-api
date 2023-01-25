const assert = require('assert');
const app = require('../../src/app');

describe('\'task time tracking\' service', () => {
  it('registered the service', () => {
    const service = app.service('task-time-tracking');

    assert.ok(service, 'Registered the service');
  });
});
