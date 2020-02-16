import Service from '@ember/service';
import { later } from '@ember/runloop';
import moment from 'moment';

export default Service.extend({
  tick: null,
  shouldKeepTicking: null, // so we can stop it in tests
  init() {
    this._super(...arguments);
    this.set('shouldKeepTicking', true),
    this.updateTick();
  },
  updateTick() {
    this.set('tick', moment());
    if (this.get('shouldKeepTicking')) {
      later(() => this.updateTick(), 1000);
    }
  }
});
