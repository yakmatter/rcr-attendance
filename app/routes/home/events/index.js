import Route from '@ember/routing/route';

export default Route.extend({
  afterModel(events) {
    let activeEvent = events.findBy('isReady');
    if (!activeEvent) {
      activeEvent = events.findBy('isNow');
    }
    if (!activeEvent) {
      activeEvent = events.findBy('isNext');
    }
    if (!activeEvent) {
      activeEvent = events.findBy('isToday');
    }
    if (activeEvent) {
      this.transitionTo('home.events.event', activeEvent);
    }
  }
});
