import Route from '@ember/routing/route';

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
      return events.sortBy('startTime');
    });
  },
  actions:{
    willTransition: function(){
      this.set('refreshing', false);
    }
  }
});
