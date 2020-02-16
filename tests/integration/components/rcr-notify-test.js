import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | rcr-notify', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function() {
    const notifyService = this.owner.lookup('service:notify');
    this.set('notifyService', notifyService);

  });

  test('it renders', async function(assert) {
    await render(hbs`{{rcr-notify}}`);
    assert.dom('p').doesNotExist();

    this.set('notifyService.message', 'foo');
    assert.dom('p').hasText('foo');
  });

  test('it closes', async function(assert) {
    this.set('notifyService.message', 'foo');
    await render(hbs`{{rcr-notify}}`);
    assert.dom('p').hasText('foo');
    await click('.close');
    assert.dom('p').doesNotExist();
  });
});
