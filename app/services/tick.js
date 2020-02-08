import Service from '@ember/service';
import { later } from '@ember/runloop';
import moment from 'moment';

export default Service.extend({
  tick: null,
  init() {
    this._super(...arguments);
    this.updateTick();
  },
  updateTick() {
    this.set('tick', moment());
    later(() => this.updateTick(), 1000);
  }
});
