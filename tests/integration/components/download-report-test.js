import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | download-report', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{download-report}}`);
    assert.dom('button').hasText('CSV');
  });

  test('it handles action', async function(assert) {
    assert.expect(1);
    this.set('downloadReport', () => {
        assert.ok(true);
    });
    await render(hbs`{{download-report downloadReport=downloadReport}}`);
    await click('button');
  });
});
