import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  refreshTime: 60 * 1000,
  model() {
    return this.fetchEvents();
  },
  afterModel(events) {
    events.forEach(event => {
      event.get('teams');
    });
  },
  fetchEvents() {
    return this.store.query('event', { isToday: true }).then(events => {
      return events.filter(event => {
        // only show the last coupld of completed events
        const isOld = moment(event.get('startTime')).isSameOrBefore(moment().subtract(90, 'minutes'));
        return !isOld;
      }).sortBy('startTime');
    });
  },
  actions:{
    willTransition: function(){
      this.set('refreshing', false);
    }
  }
});
