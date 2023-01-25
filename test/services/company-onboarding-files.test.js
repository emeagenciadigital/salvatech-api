const assert = require('assert');
const app = require('../../src/app');

describe('\'company onboarding files\' service', () => {
  it('registered the service', () => {
    const service = app.service('company-onboarding-files');

    assert.ok(service, 'Registered the service');
  });
});
