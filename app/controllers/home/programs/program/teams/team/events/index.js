import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed }  from '@ember/object';
import { reads } from '@ember/object/computed';
import moment from 'moment';

export default Controller.extend({
  store: service(),
  session: service(),
  isAdmin: reads('session.user.isAdmin'),
  events: computed('model.[]', function() {
    return this.get('model').sortBy('startTime').reverse();
  }),
  actions: {
    createEvent(event) {
      this.store.createRecord('event', event).save().then(() => {
        this.get('model').update();
      });
    },
    createDummyEvents() {
      let date = moment().startOf('day').add(7, 'hours');
      while (moment().endOf('day').subtract(5, 'hours').isAfter(date)) {
        const event = {
          name:`TEST - practice - ${date.format('MMM D, h:mm A')}`,
          startTime: date.toDate(),
          endTime: moment(date).add(30, 'minutes').toDate(),
          credits: 1,
          type:'practice',
          teams: [this.get('team')]
        };
        date = moment(date).add(30, 'minutes');
        this.store.createRecord('event', event).save().then(() => {
          this.get('model').update();
        });
      }
    }
  }
});
