import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';
const delay = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));

module('Unit | Service | tick', async function(hooks) {
  setupTest(hooks);

  test('it ticks', async function(assert) {
    let tick = this.owner.lookup('service:tick');
    assert.ok(tick);
    const now = moment();
    assert.ok(
      now.diff(tick.get('tick')) < 100,
      `${now.format(DATE_FORMAT)} should be roughly the same as ${tick.get('tick').format(DATE_FORMAT)}`
    );
    await delay();
    assert.ok(
      now.isBefore(tick.get('tick')),
      `${now.format(DATE_FORMAT)} should be before ${tick.get('tick').format(DATE_FORMAT)}`
    );
    tick.set('shouldKeepTicking', false);
    await delay();
  });
});
