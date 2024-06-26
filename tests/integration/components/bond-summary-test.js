import { module, test } from 'qunit';
import { setupRenderingTest } from 'electoral-bonds-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | bond-summary', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<BondSummary />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <BondSummary>
        template block text
      </BondSummary>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
