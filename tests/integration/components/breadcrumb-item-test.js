import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';


// @todo remove this ...not using breadcrumbs

module('Integration | Component | breadcrumb-item', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function() {
    this.set('name', 'foobar');
    this.set('route', 'foo.bar');
  });

  skip('it renders current route', async function(assert) {
    await render(hbs`{{breadcrumb-item route=route name=name isCurrentRoute=true}}`);

    assert.equal(this.element.textContent.trim(), this.get('name'));
  });
});
