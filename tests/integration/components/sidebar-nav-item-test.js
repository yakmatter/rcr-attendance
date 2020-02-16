import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';

module('Integration | Component | sidebar-nav-item', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function() {
    const RouterService = Service.extend({
      currentURL: '',
    });
    this.owner.register('service:router', RouterService);
  });

  test('it renders', async function(assert) {
    await render(hbs`
      {{#sidebar-nav-item route=""}}
        template block text
      {{/sidebar-nav-item}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
