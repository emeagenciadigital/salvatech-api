const assert = require('assert');
const app = require('../../src/app');

describe('\'task files\' service', () => {
  it('registered the service', () => {
    const service = app.service('task-files');

    assert.ok(service, 'Registered the service');
  });
});
