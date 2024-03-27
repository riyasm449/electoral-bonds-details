import { module, test } from 'qunit';
import { setupTest } from 'electoral-bonds-app/tests/helpers';

module('Unit | Route | company-data', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:company-data');
    assert.ok(route);
  });
});
