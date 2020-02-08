import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  header: service(),
  model(params) {
    return this.store.findRecord('event', params.event_id);
  },
  afterModel(event) {
    this.set('header.event', event);
    let promises = {};

    /*
      fetch skaters then add `sortName` to attendance
      if skater is not on one of the event teams,
      prepend `_sortName` to force guest skaters to the top
     */
    return event.get('attendances').then(attendances => {
      attendances = attendances.toArray();
      attendances.forEach(attendance => {
        promises[attendance.id] = attendance.get('skater');
      });
      return hash(promises).then(results => {
        const eventTeamIds = event.hasMany('teams').ids();
        attendances.forEach(attendance => {
          const skater = results[attendance.id];
          let sortName = skater.get('displayName');
          const skaterTeamIds = skater.hasMany('teams').ids();
          if (skaterTeamIds.every(skaterTeamId => !eventTeamIds.includes(skaterTeamId))) {
            sortName = `_${sortName}`;
            attendance.set('isGuestSkater', true);
          }
          attendance.set('sortName', sortName);
        });
        return this.set('attendances', attendances);
      });
    });
  },
  setupController(controller) {
    this._super(...arguments);
    controller.set('_attendances', this.get('attendances'));
    controller.loadContent();
  },
  actions: {
    willTransition() {
      this.set('header.event', null);
      return true;
    }
  }
});
