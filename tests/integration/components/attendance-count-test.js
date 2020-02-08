import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | attendance-count', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function() {
    this.set('attendances', [
      EmberObject.create({
        current: true,
        attended: true
      }),
      EmberObject.create({
        current: true,
        attended: false
      }),
      EmberObject.create({
        current: false,
        attended: false
      }),
      EmberObject.create({
        current: false,
        attended: false
      })
    ]);
  });

  test('it renders', async function(assert) {
    await render(hbs`{{attendance-count attendances=attendances}}`);
    assert.equal(this.element.querySelector('.label').textContent.trim(), 'Attended practices');
    assert.equal(this.element.querySelector('.value').textContent.trim(), '1 of 2 (50%)');
  });

  test('it hides label', async function(assert) {
    await render(hbs`{{attendance-count attendances=attendances showLabel=false}}`);
    assert.notOk(this.element.querySelector('.label'));
    assert.equal(this.element.querySelector('.value').textContent.trim(), '1 of 2 (50%)');
  });
});
