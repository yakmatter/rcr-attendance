import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | nav-item', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function() {
    this.set('model', EmberObject.create({
      name: 'lorem ipsum',
      route: 'boo.bar.baz',
      model: 'model',
      logo: './assets/images/voodoo-dolls.png'
    }));
  });

  test('it renders', async function(assert) {
    await render(hbs`{{nav-item model=model}}`);

    assert.ok(this.element.querySelector('a'));
    assert.equal(this.element.querySelector('img').getAttribute('src'), this.get('model.logo'));
    assert.equal(this.element.querySelector('.middle.aligned.content .header').textContent.trim(), this.get('model.name'));
  });

  test('it renders custom name', async function(assert) {
    this.set('name', 'name');
    await render(hbs`{{nav-item model=model name=name}}`);

    assert.ok(this.element.querySelector('a'));
    assert.equal(this.element.querySelector('img').getAttribute('src'), this.get('model.logo'));
    assert.equal(this.element.querySelector('.middle.aligned.content .header').textContent.trim(), this.get('name'));
  });

  test('it renders custom logo', async function(assert) {
    this.set('logo', './assets/images/wreckers.png');
    await render(hbs`{{nav-item model=model logo=logo}}`);

    assert.ok(this.element.querySelector('a'));
    assert.equal(this.element.querySelector('img').getAttribute('src'), this.get('logo'));
    assert.equal(this.element.querySelector('.middle.aligned.content .header').textContent.trim(), this.get('model.name'));
  });
});
